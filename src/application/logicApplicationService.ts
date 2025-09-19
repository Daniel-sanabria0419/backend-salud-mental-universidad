import { Logic } from '../domain/logic';
import { AnswerRepository } from '../domain/AnswerPorts';
import { OptionAnswerRepository } from '../domain/OptionAnswerPorts';
import { SurveyRepository } from '../domain/SurveyPorts';
import { QuestionRepository } from '../domain/QuestionPorts';

export class LogicApplicationService {
    private readonly logic: Logic;

    constructor(
         private readonly answerRepository: AnswerRepository,
        private readonly optionAnswerRepository: OptionAnswerRepository,
     private readonly surveyRepository: SurveyRepository,
     private readonly qiestionRepository: QuestionRepository

        
    ) {
        this.logic = new Logic(
             this.answerRepository,
            this.optionAnswerRepository,
            this.surveyRepository,
            this.qiestionRepository

        );
    }

   
 async getPuntajesDashboard(studentId: number): Promise<any> {
        try {
            // Validar el ID del estudiante
            if (!studentId ) {
                throw new Error('Student ID is required and cannot be empty');
            }

            // Ejecutar la lógica de negocio para obtener los puntajes
            const puntajes = await this.logic.calculatePuntajesDashboard(studentId);

            return puntajes;
        } catch (error) {
            console.error('Error in LogicApplicationService.getPuntajesDashboard:', error);
            throw error;
        }
    }
    
}