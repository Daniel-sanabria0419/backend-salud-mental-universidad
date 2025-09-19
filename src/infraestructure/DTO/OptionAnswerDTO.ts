export interface CreateOptionAnswerDTO {
  questionId: number;
  text: string;
  value: number;
}

export interface UpdateOptionAnswerDTO {
  text?: string;
  value?: number;
}