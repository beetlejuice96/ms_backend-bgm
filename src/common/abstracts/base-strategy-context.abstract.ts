export abstract class BaseStrategyContextAbstract<TStrategy> {
  constructor(protected strategy: TStrategy) {}

  setStrategy(strategy: TStrategy) {
    this.strategy = strategy;
  }

  abstract execute(...params: any[]): Promise<any> | any;
}
