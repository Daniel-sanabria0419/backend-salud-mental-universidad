import { IntegerType } from 'typeorm';
import { AnswerRepository } from '../domain/AnswerPorts';
import { OptionAnswerRepository } from '../domain/OptionAnswerPorts';
import { SurveyRepository } from '../domain/SurveyPorts';
import { Survey } from './Survey';
import { QuestionRepository } from '../domain/QuestionPorts';

export class Logic {
  constructor(
    private readonly answerRepository: AnswerRepository,
    private readonly optionAnswerRepository: OptionAnswerRepository,
    private readonly surveyRepository: SurveyRepository,
    private readonly questionRepository: QuestionRepository
  ) {}

  async calculatePuntajesDashboard(studentId: number): Promise<any> {
    try {
      console.log('Calculating puntajes dashboard for student:', studentId);
      
      // 1. Obtener todas las respuestas del estudiante
      const studentAnswers = await this.answerRepository.findByStudent(studentId);
      if (!studentAnswers || studentAnswers.length === 0) {
        return {
          studentId,
          totalAnswers: 0,
          totalScore: 0,
          averageScore: 0,
          surveyScores: [],
          message: 'No answers found for this student'
        };
      }


      // Agrupar respuestas por encuesta
      const groupedBySurvey: Record<number, any> = {};
      const dailySurveyAnswers: any[] = [];

      for (const answer of studentAnswers) {
        try {
          const optionAnswer = await this.optionAnswerRepository.findById(answer.idOpcion);
          const question = await this.questionRepository.findById(answer.idPregunta);
          const survey = question ? await this.surveyRepository.findById(question.idEncuesta) : null;
          
          const surveyId = survey?.id ?? 0;

          // Si no existe la encuesta en el objeto temporal, la inicializamos
          if (!groupedBySurvey[surveyId]) {
            groupedBySurvey[surveyId] = {
              surveyId,
              surveyText: survey?.titulo ?? "Sin título",
              surveyDescription: survey?.descripcion ?? "",
              questions: []
            };
          }

          // Agregar la pregunta y la respuesta al array de esa encuesta
          const questionData = {
            questionId: question?.id ?? 0,
            questionText: question?.texto ?? 'Sin texto',
            questionType: question?.idTipoPregunta ?? 0,
            optionValue: optionAnswer?.value ?? 0,
            optionText: optionAnswer?.text ?? 'N/A',
            answerId: answer.id,
            createdAt: answer.fechaRespuesta || new Date()
          };

          groupedBySurvey[surveyId].questions.push(questionData);

          // Si es una encuesta diaria, guardarla para el cálculo del dashboard
          if (survey?.titulo === "Encuesta Diaria") {
            dailySurveyAnswers.push({
              ...questionData,
              surveyId,
              surveyTitle: survey.titulo
            });
          }

        } catch (error) {
          console.error('Error processing answer:', answer.id, error);
        }
      }

      // Calcular métricas del dashboard si hay respuestas de encuesta diaria
      if (dailySurveyAnswers.length > 0) {
        const dashboardMetrics = this.calculateDashboardMetrics(dailySurveyAnswers);
        
        console.log('Puntajes calculated successfully for student:', studentId);
        
        return {
          ...groupedBySurvey,
          dashboardMetrics
        };
      }

      console.log('Puntajes calculated successfully for student:', studentId);
      return groupedBySurvey;

    } catch (error) {
      console.error('Error in calculatePuntajesDashboard:', error);
      throw new Error(`Failed to calculate puntajes dashboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private calculateDashboardMetrics(dailyAnswers: any[]): any {
    // Agrupar respuestas por fecha y pregunta
    const answersByDate: Record<string, Record<string, any>> = {};
    const notes: any[] = [];
    console.log("AQUI-----------------------------------")

    dailyAnswers.forEach(answer => {
      console.log(answer)

      const dateKey = this.getDateKey(answer.createdAt);
            console.log(answer)

      if (!answersByDate[dateKey]) {
        answersByDate[dateKey] = {};
      }

      // Identificar el tipo de pregunta basado en el texto
      const questionType = this.identifyQuestionType(answer.questionText);
      
      if (questionType === '1') {
        // Para notas, guardamos el texto de la opción
        if (answer.optionText && answer.optionText !== 'N/A') {
          notes.push({
            text: answer.optionText,
            date: this.formatDateForDisplay(answer.createdAt)
          });
        }
      } else {
        answersByDate[dateKey][questionType] = answer.optionValue;
      }
    });

    // Calcular métricas
    const allMoodValues = this.getAllValuesForType(answersByDate, 'mood');
    const allEnergyValues = this.getAllValuesForType(answersByDate, 'energy');
    const allSleepValues = this.getAllValuesForType(answersByDate, 'sleep');
    const allStressValues = this.getAllValuesForType(answersByDate, 'stress');

    // Promedios actuales y conversiones (escala 1-5)
    const currentMood = this.calculateAverage(allMoodValues); // 1-5 se mantiene igual
    const currentEnergy = this.calculateAverage(allEnergyValues); // 1-5 se mantiene igual
    const currentSleep = this.convertSleepToHours(this.calculateAverage(allSleepValues)); // 1-5 convertir a horas
    const currentStress = this.convertStressToPercentage(this.calculateAverage(allStressValues)); // 1-5 convertir a porcentaje

    // Calcular cambio en estrés (comparar última semana con semana anterior)
    const stressChange = this.calculateStressChange(answersByDate);

    // Calcular progreso semanal (últimos 7 días)
    const weeklyProgress = this.calculateWeeklyProgress(answersByDate);

    return {
      sleepHours: parseFloat(currentSleep.toFixed(1)),
      energyLevel: Math.round(currentEnergy),
      stressLevel: Math.round(currentStress),
      stressChange: Math.round(stressChange),
      emotionalState: Math.round(currentMood),
      weeklyProgress,
      notes: notes.slice(0, 10) // Limitar a las 10 notas más recientes
    };
  }

  private identifyQuestionType(questionText: string): string {
    const text = questionText.toLowerCase();
    
    if (text.includes('ánimo') || text.includes('animo')) {
      return 'mood';
    } else if (text.includes('energía') || text.includes('energia')) {
      return 'energy';
    } else if (text.includes('dormiste') || text.includes('sueño') || text.includes('dormir')) {
      return 'sleep';
    } else if (text.includes('estrés') || text.includes('estres')) {
      return 'stress';
    } else if (text.includes('notas') || text.includes('comentario')) {
      return 'notes';
    }
    
    return 'other';
  }

  private getAllValuesForType(answersByDate: Record<string, Record<string, any>>, type: string): number[] {
    const values: number[] = [];
    
    Object.values(answersByDate).forEach(dayAnswers => {
      if (dayAnswers[type] !== undefined && dayAnswers[type] !== null) {
        values.push(dayAnswers[type]);
      }
    });
    
    return values;
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  private calculateStressChange(answersByDate: Record<string, Record<string, any>>): number {
    const dates = Object.keys(answersByDate).sort().reverse();
    
    if (dates.length < 7) return 0;

    // Obtener valores de estrés de la última semana
    const lastWeekStress: number[] = [];
    const previousWeekStress: number[] = [];

    dates.forEach((date, index) => {
      const stressValue = answersByDate[date].stress;
      if (stressValue !== undefined) {
        if (index < 7) {
          lastWeekStress.push(stressValue);
        } else if (index < 14) {
          previousWeekStress.push(stressValue);
        }
      }
    });

    if (lastWeekStress.length === 0 || previousWeekStress.length === 0) {
      return 0;
    }

    const lastWeekAvg = this.calculateAverage(lastWeekStress);
    const previousWeekAvg = this.calculateAverage(previousWeekStress);

    // Convertir a porcentaje y calcular el cambio
    const lastWeekStressPercentage = this.convertStressToPercentage(lastWeekAvg);
    const previousWeekStressPercentage = this.convertStressToPercentage(previousWeekAvg);

    return lastWeekStressPercentage - previousWeekStressPercentage;
  }

  // Funciones de conversión para escala 1-5
  private convertSleepToHours(value: number): number {
    // Mapear escala 1-5 a horas de sueño realistas
    // 1 = 4 horas (muy poco), 2 = 5.5 horas (poco), 3 = 7 horas (normal), 4 = 8.5 horas (bueno), 5 = 10 horas (excelente)
    const sleepMapping = {
      1: 4.0,
      2: 5.5,
      3: 7.0,
      4: 8.5,
      5: 10.0
    };
    
    // Interpolación lineal para valores intermedios
    const lowerBound = Math.floor(value);
    const upperBound = Math.ceil(value);
    
    if (lowerBound === upperBound) {
      return sleepMapping[lowerBound as keyof typeof sleepMapping] || 7.0;
    }
    
    const lowerValue = sleepMapping[lowerBound as keyof typeof sleepMapping] || 7.0;
    const upperValue = sleepMapping[upperBound as keyof typeof sleepMapping] || 7.0;
    const fraction = value - lowerBound;
    
    return lowerValue + (upperValue - lowerValue) * fraction;
  }

  private convertStressToPercentage(value: number): number {
    // Mapear escala 1-5 a porcentaje de estrés
    // 1 = 10% (muy bajo), 2 = 25% (bajo), 3 = 50% (moderado), 4 = 75% (alto), 5 = 90% (muy alto)
    const stressMapping = {
      1: 10,
      2: 25,
      3: 50,
      4: 75,
      5: 90
    };
    
    // Interpolación lineal para valores intermedios
    const lowerBound = Math.floor(value);
    const upperBound = Math.ceil(value);
    
    if (lowerBound === upperBound) {
      return stressMapping[lowerBound as keyof typeof stressMapping] || 50;
    }
    
    const lowerValue = stressMapping[lowerBound as keyof typeof stressMapping] || 50;
    const upperValue = stressMapping[upperBound as keyof typeof stressMapping] || 50;
    const fraction = value - lowerBound;
    
    return lowerValue + (upperValue - lowerValue) * fraction;
  }

  private calculateWeeklyProgress(answersByDate: Record<string, Record<string, any>>): any[] {
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dates = Object.keys(answersByDate).sort().reverse().slice(0, 7).reverse();
    
    return dates.map(dateKey => {
      const date = new Date(dateKey);
      const dayName = dayNames[date.getDay()];
      const dayAnswers = answersByDate[dateKey];
      
      // Calcular un score general del día basado en ánimo y energía
      const mood = dayAnswers.mood || 0;
      const energy = dayAnswers.energy || 0;
      const score = Math.round((mood + energy) / 2);
      
      return {
        day: dayName,
        score: score
      };
    });
  }

  private getDateKey(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  private formatDateForDisplay(date: Date): string {
    const now = new Date();
    const answerDate = new Date(date);
    const diffTime = now.getTime() - answerDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return `Hoy, ${answerDate.getHours()}:${answerDate.getMinutes().toString().padStart(2, '0')}`;
    } else if (diffDays === 1) {
      return `Ayer, ${answerDate.getHours()}:${answerDate.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `Hace ${diffDays} días`;
    }
  }
}