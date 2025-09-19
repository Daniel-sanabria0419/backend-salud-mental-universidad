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

        

            
            console.log(studentAnswers)
           const groupedBySurvey: Record<number, any> = {};

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
        questions: []  // aquí guardaremos las preguntas y sus respuestas
      };
    }

    // Agregar la pregunta y la respuesta al array de esa encuesta
    groupedBySurvey[surveyId].questions.push({
      questionId: question?.id ?? 0,
      questionText: question?.texto ?? 'Sin texto',
      questionType: question?.idTipoPregunta ?? 0,
      optionValue: optionAnswer?.value ?? 0,
      optionText: optionAnswer?.text ?? 'N/A'
    });

  } catch (error) {
    console.error('Error processing answer:', answer.id, error);
  }
}


       

            

            console.log('Puntajes calculated successfully for student:', studentId);
            return groupedBySurvey;

        } catch (error) {
            console.error('Error in calculatePuntajesDashboard:', error);
            throw new Error(`Failed to calculate puntajes dashboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }


}