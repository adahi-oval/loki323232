export class MenuInstance {
  /**
   * Crea una instancia de MenuInstance.
   * @param dishes - Un array de platos.
   * @param maxUnhealthyScore - La puntuación máxima de no saludable permitida para la instancia del menú.
   */
  constructor(public readonly dishes: Dish[], public readonly maxUnhealthyScore: number) {}
}

export interface Dish {
  nutriScore: number;
  unhealthyScore: number;
}
