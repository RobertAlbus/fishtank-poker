export class StateMachine {
  private rounds: string[];

  constructor() {
    this.rounds = []
  }

  save(data: string[]) {
    this.rounds = data;
  }
  get():string[] {
    return this.rounds
  }

}