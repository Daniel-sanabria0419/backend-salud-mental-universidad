import { Request, Response } from 'express';
import { LogicApplicationService } from '../../application/logicApplicationService';

export class LogicController {
    constructor(
        private readonly logicApplicationService: LogicApplicationService
    ) {}

     async getPuntajesDashboard(req: Request, res: Response): Promise<void> {
        try {
            const { studentId } = req.params;
            
            if (!studentId) {
                res.status(400).json({
                    success: false,
                    message: 'Student ID is required'
                });
                return;
            }

            const studentIdNumber = parseInt(studentId, 10);


            const puntajes = await this.logicApplicationService.getPuntajesDashboard(studentIdNumber);
            
            res.status(200).json({
                success: true,
                message: 'Puntajes retrieved successfully',
                data: puntajes
            });
        } catch (error) {
            console.error('Error getting puntajes dashboard:', error);
            res.status(500).json({
                success: false,
                message: 'Error retrieving puntajes dashboard',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }


    // Puedes agregar más métodos según necesites
    // async anotherMethod(req: Request, res: Response): Promise<void> {
    //     try {
    //         // Lógica del método
    //     } catch (error) {
    //         // Manejo de errores
    //     }
    // }
}