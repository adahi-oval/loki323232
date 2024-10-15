import 'mocha';
import { expect } from 'chai';
import { Dish, MenuInstance } from '../src/ejercicio-2/MenuInstance';
import { MenuSolution } from '../src/ejercicio-2/MenuSolution';
import { Solver, Strategy, NutriScoreDescending, UnhealthyScoreAscending, RatioDescending } from '../src/ejercicio-2/Solver';

describe('Ejercicio 2', () =>{

  describe('MenuInstance', () => {
    describe('constructor', () => {
      it('deberia crear un objeto MenuInstance adecuadamente.', () => {

        const dishes: Dish[] = [
          { nutriScore: 3, unhealthyScore: 7 },
          { nutriScore: 2, unhealthyScore: 5 }
        ];
        const maxUnhealthyScore: number = 10;
  
        const menuInstance: MenuInstance = new MenuInstance(dishes, maxUnhealthyScore);
  
        expect(menuInstance.dishes).to.deep.equal(dishes);
        expect(menuInstance.maxUnhealthyScore).to.equal(maxUnhealthyScore);
      });
    });
  });

  describe('MenuSolution', () => {
    describe('constructor', () => {
      it('deberia crear un objeto MenuSolution adecuadamente.', () => {
        const dishes: Dish[] = [
          { nutriScore: 3, unhealthyScore: 7 },
          { nutriScore: 2, unhealthyScore: 5 }
        ];
        const menuSolution: MenuSolution = new MenuSolution(dishes);
  
        expect(menuSolution.dishes).to.deep.equal(dishes);
      });
    });
  });

  describe('Solver', () => {
    describe('solve', () => {

      const dishes: Dish[] = [
        { nutriScore: 3, unhealthyScore: 7 },
        { nutriScore: 2, unhealthyScore: 5 },
        { nutriScore: 1, unhealthyScore: 4 }
      ];
      const maxUnhealthyScore: number = 10;
      const menuInstance: MenuInstance = new MenuInstance(dishes, maxUnhealthyScore);

      it('deberia devolver un objeto MenuSolution con un menu saludable segun la heuristica NutriScoreDescending.', () => {
        const strategy: Strategy = new NutriScoreDescending();
  
        const solver: Solver = new Solver(menuInstance, strategy);
        const menuSolution: MenuSolution = solver.solve();
  
        expect(menuSolution instanceof MenuSolution).to.be.true;
        expect(menuSolution.dishes).to.deep.equal([dishes[0]]);
      });

      it('deberia devolver un objeto MenuSolution con un menu saludable segun la heuristica UnhealthyScoreAscending.', () => {
        const strategy: Strategy = new UnhealthyScoreAscending();
        const expectedMenu: Dish[] = [
          { nutriScore: 1, unhealthyScore: 4 },
          { nutriScore: 2, unhealthyScore: 5 }
        ];

        const solver: Solver = new Solver(menuInstance, strategy);
        const menuSolution: MenuSolution = solver.solve();
  
        expect(menuSolution instanceof MenuSolution).to.be.true;
        expect(menuSolution.dishes).to.deep.equal(expectedMenu);
      });

      it('deberia devolver un objeto MenuSolution con un menu saludable segun la heuristica RatioDescending.', () => {
        const strategy: Strategy = new RatioDescending();
        const expectedMenu: Dish[] = [
          { nutriScore: 3, unhealthyScore: 7 }
        ];

        const solver: Solver = new Solver(menuInstance, strategy);
        const menuSolution: MenuSolution = solver.solve();
  
        expect(menuSolution instanceof MenuSolution).to.be.true;
        expect(menuSolution.dishes).to.deep.equal(expectedMenu);
      });

    });
  });

});
