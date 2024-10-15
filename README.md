## Ejercicio 1 - Gestor de Referencias Bibliográficas

Para este ejercicio se ha desarrollado una estructura de clases e interfaces para represetnar un gestor de referencias bibliográficas. Teniendo en cuenta que cada referencia bibliográfica tiene elementos comunes a todas ellas, pero algunas tienen más elementos que otras. Por ello se han desarrollado las siguientes clases:

#### Interfaz `biblioElement`

Esta interfaz representa la estructura básica mínima de un elemento bilbiográfico. Se compone de los elementos mínimos que debe tener un elemento bibliográfico: `title`, `authors`, `keywords`, `abstract`, `publishDate`, `pageNum`, `publisher` y el método **`printRef`**.

```typescript
  export interface biblioElement {
    title: string;        
    authors: string;       
    keywords: string[];    
    abstract: string;     
    publishDate: string;   
    pageNum: number;       
    publisher: string;     
    printRef: () => void; 
  }
```

#### Interfaz `Filters`

Esta interfaz representa los filtros para el método **`search()`** definido posteriormente. Se compone de el atributo principal `keywords`, ya que la búsqueda debe ser siempre por palabras clave, y por los atributos opcionales: `title`, `authors`, `publishDate` y `publisher`.

```typescript
  export interface Filters {
    keywords: string[];   
    title?: string;       
    authors?: string;       
    publishDate?: string;   
    publisher?: string;     
  }
```

##### Tipo `Action`

Este es un pequeño tipo, muy sencillo, con el que se determina la acción del método **`search()`**, sus dos posibles valores son ***"Exportar"*** e ***"Imprimir"***. Esto es, exportar como referencias IEEE o imprimir por pantalla los resultados de la búsqueda en forma de tabla.

```typescript
  export type Action = 'Exportar' | 'Imprimir';
```

### Clase **`ReferenceCollection`**

Esta es la clase principal del programa. Es una clase genérica cuya cabecera es **`ReferenceCollection<T extends biblioElement>`**, usamos la interfaz `biblioElement`para restringir el tipo `T` y que se ajuste a la forma de un elemento bibliográfico.

###### `constructor`

Al ser una clase que representa una colección de objetos de un tipo genérico pero de forma concreta, el constructor es simplemente:

```typescript
  constructor(private elements: T[]) {}
```

###### `search()`

El método `search` es lo principal de esta clase. En él podemos pasarle un objeto tipo `Filters` y otro objeto tipo `Action` para decidir el comportamiento de este método. En primer lugar, crea un nuevo array llamado `filteredElements` mediante el método `filter()` del array `elements` de la clase y luego, una vez tiene los elementos filtrados según el objeto tipo `Filters` decide lo que debe hacer en base al objeto tipo `Action`.

```typescript
  search(filters: Filters, action: Action): void {
    const filteredElements = this.elements.filter(element => {
    if (filters.keywords && !filters.keywords.some(keyword => element.title.includes(keyword))) {
      return false;
    }
    if (filters.title && !element.title.includes(filters.title)) {
      return false;
    }
    if (filters.authors && !filters.authors.includes(filters.authors)) {
      return false;
    }
    if (filters.publishDate && element.publishDate !== filters.publishDate) {
      return false;
    }
    if (filters.publisher && element.publisher !== filters.publisher) {
      return false;
    }
    return true;
    });

    if (action == 'Imprimir') {
      filteredElements.forEach(element => {
          console.table([element]);
      });
    } else if (action == 'Exportar') {
      filteredElements.forEach(element => {
          element.printRef();
      });
    }
  }
```

### Clases de Elementos Bibliográficos.

A continuación se detallan, brevemente, las diferentes clases creadas para los diferentes tipos de elementos bibliográficos. Todas tienen una serie de atributos comunes, pero difieren en el método `printRef()` de cada clase y en la adición de algunos atributos particulares de cada elemento, como es el caso del número de volumen en los artículos de revista.

##### Clase `MagArticle`

Esta clase representa un artículo de una revista. Los elementos adicionales son `magNum`, que representa el número de la revista y `volNum` que representa el número del volumen. Su método `printRef()` sigue el formato básico de las referencias a *periodicals* según el IEEE.

```typescript
export class MagArticle {
  constructor(
      public title: string,
      public authors: string,
      public keywords: string[],
      public abstract: string,
      public publishDate: string,
      public pageNum: number,
      public publisher: string,
      public magNum: number,
      public volNum: number
  ) {}

  public printRef() {
      console.log(`${this.authors}, "${this.title}", ${this.publisher}, vol. ${this.volNum}, no. ${this.magNum}, pp. ${this.pageNum}, ${this.publishDate}.`);
  }
}
```

##### Clase `Book`

Esta clase representa un libro. Los elementos adicionales son `chapter`, `city`, `edition` y `country`; que representan el capítulo del libro, la ciudad de la editorial, la edición del libro y el país de la editorial.

```typescript
export class Book {
  constructor(
      public title: string,
      public authors: string,
      public keywords: string[],
      public abstract: string,
      public publishDate: string,
      public pageNum: number,
      public publisher: string,
      public chapter: string,
      public city: string,
      public edition: number,
      public country: string
  ) {}

  public printRef() {
      console.log(`${this.authors}, ${this.chapter} in ${this.title}, ${this.edition}th ed. ${this.city}, ${this.country}: ${this.publisher}, ${this.publishDate}, ${this.pageNum}`);
  }
}
```

##### Clase `BookChapt`

Esta clase es hija de la anterior clase `Book` y solo le añade el atributo `chapterNum`, ya que es la diferencia en la referencia según el formato del IEEE.

```typescript
export class BookChapt extends Book {
  constructor(
      public title: string,
      public authors: string,
      public keywords: string[],
      public abstract: string,
      public publishDate: string,
      public pageNum: number,
      public publisher: string,
      public chapter: string,
      public city: string,
      public edition: number,
      public country: string,
      public chapterNum: number
  ) {
      super(title, authors, keywords, abstract, publishDate, pageNum, publisher, chapter, city, edition, country);
  }

  public printRef() {
      console.log(`${this.authors}, ${this.chapter} in ${this.title}, ${this.edition}th ed. ${this.city}, ${this.country}: ${this.publisher}, ${this.publishDate}, ${this.chapterNum}, ${this.pageNum}`);
  }
}
```

##### Clase `Conference`

Esta clase representa una contribución a una conferencia. Los atributos adicionales son `confName`, el nombre de la conferencia; `country`, el país de la conferencia y `city`, la ciudad de la conferencia.

```typescript
export class Conference {
  constructor(
      public title: string,
      public authors: string,
      public keywords: string[],
      public abstract: string,
      public publishDate: string,
      public pageNum: number,
      public publisher: string,
      public confName: string,
      public country: string,
      public city: string
  ) {}

  public printRef() {
      console.log(`${this.authors}, "${this.title}" presented at the ${this.confName}, ${this.city}, ${this.country}, ${this.publishDate}.`);
  }
}
```

##### Clase `TFGM`

Esta clase representa un trabajo de fin de grado/máster. Se agrupan juntos ya que en la guía de formato para referencias del IEEE, se agrupan bajo el término ***MS thesis***, de forma que su formato de referencia es el mismo. Por ello tienen el mismo método `printRef()` y los mismos atributos adicionales, que son: `dept`, que representa el departamento de la universidad al que pertenece el autor; `university`, que representa la universidad de la que se origina el trabajo y `uniCity`, que representa la ciudad de la universidad.

```typescript
export class TFGM {
  constructor(
      public title: string,
      public authors: string,
      public keywords: string[],
      public abstract: string,
      public publishDate: string,
      public pageNum: number,
      public publisher: string,
      public dept: string,
      public university: string,
      public uniCity: string
  ) {}

  public printRef() {
      console.log(`${this.authors}, "${this.title}" M.S. thesis, ${this.dept}, ${this.university}, ${this.publishDate}`);
  }
}
```

#### Decisiones de diseño.

Se ha optado por una clase colección de tipo genérico restringido ya que necesitabamos una forma de almacenar diferentes tipos de elementos bibliográficos, que tenían una estructura mínima común pero que diferían en el formato de referencia y los parámetros adicionales que necesitaban esas referencias particulares. También se ha optado por representar los filtros de búsqueda con una interfaz debido a su capacidad de añadir parámetros opcionales, como el título o los autores en este caso, de esta manera podemos buscar por palabras clave siempre y filtrar esos resultados a posteriori.

## Ejercicio 2 - Menús saludables orientados a objetos

Este ejercicio se basa en el enunciado del ejercicio 10 de la práctica 4. En él se describía la problemática de crear menús saludables a partir de una serie de platos, cada uno conformado por un valor nutricional y un índice de insalubridad. Se debían generar menús que no sobrepasaran el índice de insalubridad total máximo designado para cada menú, y se debía resolver por 3 heurísticas diferentes: 

1. Valor nutricional en orden descendiente 
2. Índice de insalubridad en orden ascendente 
3. Ratio entre valor nutricional e índice de insalubridad en orden descendiente

Para ello se han diseñado las clases principales `MenuInstance`, que representa una instancia del problema; `MenuSolution` que representa una solución al problema y `Solver`, la clase encargada de solucionar el problema.

Por ello, en este ejercicio se ha utilizado el patrón de diseño de comportamiento **`Strategy`**. Utilizando este patrón de diseño, podemos diseñar nuestra lógica de manera genérica para las tres heurísticas y decidir la estrategia que utilizaremos en cada instancia de la clase `Solver`.

#### Interface `Dish`

Esta interfaz representa cada plato particular, es muy simple ya que solo se conforma de dos atributos: `nutriScore`, que representa el valor nutricional del plato y `unhealthyScore` que representa el índice de insalubridad del plato.

```typescript
export interface Dish {
  nutriScore: number,
  unhealthyScore: number
}
```

### Clase `MenuInstance`

Esta clase representa una instancia del problema. Al `constructor` se le pasa una colección de platos(`Dish[]`) y un índice de insalubridad máximo(`number`).

```typescript
export class MenuInstance {
  constructor(public readonly dishes: Dish[], public readonly maxUnhealthyScore: number){
  }
}
```

### Clase `MenuSolution`

Esta clase representa la solución a una instancia del problema dada. La conforman el `constructor` al que solo se le pasa una colección de platos(`Dish[]`), un sencillo getter para acceder a la colección de platos y el método `printSolution` que imprime la colección de platos por consola.

```typescript
export class MenuSolution {
  constructor(private dishes_: Dish[]){}

  get dishes(){ return this.dishes_; }

  printSolution(){
    console.log(this.dishes);
  }
}
```

#### Interfaz `Strategy`

Esta interfaz representa la estrategia que vamos a tomar en cada instancia del problema dada, la compone simplemente un método `execute` al que se le pasa una instancia del problema(`MenuInstance`) y devuelve una colección de platos(`Dish[]`).

```typescript
export interface Strategy {
  execute(menu: MenuInstance): Dish[];
}
```

#### Clases de Estrategia

Se han creado 3 clases diferentes que implementan la interfaz `Strategy`, estas clases representan cada una de las heurísticas diferentes con las que se puede solucionar el problema. Todas son similares entre ellas y solo difieren en la lógica interna del método `sort` de cada una. 

##### Clase `NutriScoreDescending`

Esta clase representa la heurística de ***Valor nutricional descendiente***.

```typescript
export class NutriScoreDescending implements Strategy {
  execute(menu: MenuInstance): Dish[] {
    return menu.dishes.sort((a,b) => b.nutriScore - a.nutriScore);
  }
}
```

##### Clase `UnhealthyScoreAscending`

Esta clase representa la heurística de ***Índice de insalubridad ascendiente***.

```typescript
export class UnhealthyScoreAscending implements Strategy {
  execute(menu: MenuInstance): Dish[] {
    return menu.dishes.sort((a,b) => a.unhealthyScore - b.unhealthyScore);
  }
}
```

##### Clase `RatioDescending`

Esta clase representa la heurística de ***Ratio descendiente***.

```typescript
export class RatioDescending implements Strategy {
  execute(menu: MenuInstance): Dish[] {
    return menu.dishes.sort((a,b) => a.nutriScore / a.unhealthyScore - b.nutriScore - b.unhealthyScore);
  }
}
```

### Clase `Solver`

Habiendo entendido lo anterior podemos ver la clase **`Solver`**. El `constructor` de esta clase se compone de una instancia del problema `MenuInstance` y una estrategia `Strategy`.

```typescript
constructor(private menu: MenuInstance, private strategy: Strategy){}
```

El único método de la clase `Solver` es el método **`solve()`** que implementa la lógica general del problema, independiente de cada heurística. Debido a que las diferentes heurísticas solo afectan al orden de los platos en el menú, se ha optado por una lógica que recorre una colección de platos de izquierda a derecha y añade al menú hasta que se pueda, manteniéndose por debajo del índice de insalubridad máximo dado por la instancia particular del problema.

La diferencia entre las diferentes heurísticas se puede ver al principio del método, donde la colección de platos que recorrerá el método está dada por la estrategia usada en esa instancia particular de la clase `Solver`. Por último, crea un objeto de la clase `MenuSolution` con la colección de platos que conforman el menú final según la heurística especificada con el objeto `Strategy`.

```typescript
export class Solver {
  constructor(private menu: MenuInstance, private strategy: Strategy){}

  solve(): MenuSolution {

    const sortedDishes = this.strategy.execute(this.menu);

    let currentUnhealthyScore: number = 0;
    const solution: Dish[] = [];

    for (let index = 0; index < sortedDishes.length; index++) {
      const dish = sortedDishes[index];

      if(currentUnhealthyScore + dish.unhealthyScore <= this.menu.maxUnhealthyScore){
        solution.push(dish);
        currentUnhealthyScore += dish.unhealthyScore;
      }else{
        break;
      }

    }

    return new MenuSolution(solution);
  }
}
```
