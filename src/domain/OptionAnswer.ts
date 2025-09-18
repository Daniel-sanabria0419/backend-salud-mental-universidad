export class OptionAnswer {
  constructor(
    public optionId: number,
    public questionId: number,
    public text: string,
    public value: number
  ) {}
}