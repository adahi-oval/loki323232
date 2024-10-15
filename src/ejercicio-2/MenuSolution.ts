import { Dish } from './MenuInstance';

/**
 * Representa una solución de menú.
 */
export class MenuSolution {
  /**
   * Crea una instancia de MenuSolution.
   * @param dishes_ - Un array de platos.
   */
  constructor(private dishes_: Dish[]) {}

  /**
   * Obtiene los platos de la solución de menú.
   * @returns Un array de platos.
   */
  get dishes() { return this.dishes_; }

  /**
   * Imprime la solución del menú en la consola.
   */
  printSolution() {
    console.log(this.dishes);
  }
}
