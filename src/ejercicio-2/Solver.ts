import { MenuInstance, Dish } from './MenuInstance';
import { MenuSolution } from './MenuSolution';

/**
 * Representa un Solver que encuentra una solución para el menú dado utilizando una estrategia específica.
 */
export class Solver {
  /**
   * Crea una instancia de Solver.
   * @param menu - Instancia del menú para la que se busca la solución.
   * @param strategy - Estrategia utilizada para resolver el menú.
   */
  constructor(private menu: MenuInstance, private strategy: Strategy) {}

  /**
   * Resuelve el menú utilizando la estrategia especificada y devuelve la solución.
   * @returns Una instancia de MenuSolution que representa la solución encontrada.
   */
  solve(): MenuSolution {
    // Ejecutar la estrategia para obtener los platos ordenados
    const sortedDishes = this.strategy.execute(this.menu);

    // Variables para realizar un seguimiento del puntaje no saludable actual y la solución
    let currentUnhealthyScore: number = 0;
    const solution: Dish[] = [];

    // Iterar sobre los platos ordenados y agregarlos a la solución hasta que se alcance el puntaje máximo no saludable
    for (let index = 0; index < sortedDishes.length; index++) {
      const dish = sortedDishes[index];

      if (currentUnhealthyScore + dish.unhealthyScore <= this.menu.maxUnhealthyScore) {
        solution.push(dish);
        currentUnhealthyScore += dish.unhealthyScore;
      } else {
        break; // Salir del bucle si se supera el puntaje máximo no saludable
      }
    }

    // Crear y devolver una instancia de MenuSolution con la solución encontrada
    return new MenuSolution(solution);
  }
}

/**
 * Interfaz que define el método para ejecutar una estrategia en un menú.
 */
export interface Strategy {
  /**
   * Ejecuta la estrategia en el menú dado y devuelve los platos resultantes.
   * @param menu - Instancia del menú en la que se aplicará la estrategia.
   * @returns Un array de platos que representa el resultado de aplicar la estrategia.
   */
  execute(menu: MenuInstance): Dish[];
}

/**
 * Implementación de la estrategia para ordenar los platos por puntaje nutricional descendente.
 */
export class NutriScoreDescending implements Strategy {
  /**
   * Ejecuta la estrategia de ordenar los platos por puntaje nutricional descendente.
   * @param menu - Instancia del menú que se ordenará.
   * @returns Un array de platos ordenados por puntaje nutricional descendente.
   */
  execute(menu: MenuInstance): Dish[] {
    return menu.dishes.sort((a, b) => b.nutriScore - a.nutriScore);
  }
}

/**
 * Implementación de la estrategia para ordenar los platos por puntaje no saludable ascendente.
 */
export class UnhealthyScoreAscending implements Strategy {
  /**
   * Ejecuta la estrategia de ordenar los platos por puntaje no saludable ascendente.
   * @param menu - Instancia del menú que se ordenará.
   * @returns Un array de platos ordenados por puntaje no saludable ascendente.
   */
  execute(menu: MenuInstance): Dish[] {
    return menu.dishes.sort((a, b) => a.unhealthyScore - b.unhealthyScore);
  }
}

/**
 * Implementación de la estrategia para ordenar los platos por la relación de puntaje nutricional/puntaje no saludable descendente.
 */
export class RatioDescending implements Strategy {
  /**
   * Ejecuta la estrategia de ordenar los platos por la relación de puntaje nutricional/puntaje no saludable descendente.
   * @param menu - Instancia del menú que se ordenará.
   * @returns Un array de platos ordenados por la relación de puntaje nutricional/puntaje no saludable descendente.
   */
  execute(menu: MenuInstance): Dish[] {
    return menu.dishes.sort((a, b) => (b.nutriScore / b.unhealthyScore) - (a.nutriScore / a.unhealthyScore));
  }
}
