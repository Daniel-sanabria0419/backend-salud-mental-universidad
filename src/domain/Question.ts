<<<<<<< HEAD
export interface Question {
  id: number;
  idEncuesta: number;
  texto: string;
  idTipoPregunta: number;
=======
export class Question {
  constructor(
  public id: number,
  public idEncuesta: number,
  public texto: string,
  public idTipoPregunta: number
){}
  
>>>>>>> 2b14ab01396e9883608d676b6e1ff018bea2a53f
}