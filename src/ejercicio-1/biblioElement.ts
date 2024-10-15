/**
 * Interfaz que restringe el tipo de la coleccion.
 */
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

/**
* Interfaz que representa los filtros para la búsqueda de elementos bibliográficos.
*/
export interface Filters {
  keywords: string[];   
  title?: string;       
  authors?: string;       
  publishDate?: string;   
  publisher?: string;     
}

export type Action = 'Exportar' | 'Imprimir';

/**
* Colección de referencias bibliográficas.
* @template T - Tipo de los elementos en la colección, debe extender de `biblioElement`.
*/
export class ReferenceCollection<T extends biblioElement> {
  /**
   * Constructor de la clase ReferenceCollection.
   * @param elements - Elementos de la colección.
   */
  constructor(private elements: T[]) {}
  
  /**
   * Imprime las referencias de todos los elementos en la colección.
   */
  printRef() {
      this.elements.forEach(element => {
          element.printRef();
      });
  }

  /**
   * Imprime los elementos de la colección en formato de tabla.
   */
  printTable() {
      this.elements.forEach(element => {
          console.table([element]);
      });
  }

  /**
   * Busca elementos en la colección basándose en los filtros especificados y realiza una acción sobre los resultados.
   * @param filters - Filtros para la búsqueda.
   * @param action - Acción a realizar sobre los resultados (Imprimir o Exportar).
   */
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
}
