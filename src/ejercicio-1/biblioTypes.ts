/**
 * Representa un artículo de revista académica.
 */
export class MagArticle {
  /**
   * @param title - Título del artículo.
   * @param authors - Autores del artículo.
   * @param keywords - Palabras clave del artículo.
   * @param abstract - Resumen del artículo.
   * @param publishDate - Fecha de publicación del artículo.
   * @param pageNum - Número de páginas del artículo.
   * @param publisher - Editorial de la revista.
   * @param magNum - Número de la revista.
   * @param volNum - Volumen de la revista.
   */
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

  /**
   * Imprime la referencia del artículo en formato IEEE.
   */
  public printRef() {
      console.log(`${this.authors}, "${this.title}", ${this.publisher}, vol. ${this.volNum}, no. ${this.magNum}, pp. ${this.pageNum}, ${this.publishDate}.`);
  }
}

/**
* Representa un libro.
*/
export class Book {
  /**
   * @param title - Título del libro.
   * @param authors - Autores del libro.
   * @param keywords - Palabras clave del libro.
   * @param abstract - Resumen del libro.
   * @param publishDate - Fecha de publicación del libro.
   * @param pageNum - Número de páginas del libro.
   * @param publisher - Editorial del libro.
   * @param chapter - Capítulo del libro.
   * @param city - Ciudad de publicación del libro.
   * @param edition - Edición del libro.
   * @param country - País de publicación del libro.
   */
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

  /**
   * Imprime la referencia del libro en formato IEEE.
   */
  public printRef() {
      console.log(`${this.authors}, ${this.chapter} in ${this.title}, ${this.edition}th ed. ${this.city}, ${this.country}: ${this.publisher}, ${this.publishDate}, ${this.pageNum}`);
  }
}

/**
* Representa un capítulo de libro.
*/
export class BookChapt extends Book {
  /**
   * @param chapterNum - Número del capítulo.
   */
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

  /**
   * Imprime la referencia del capítulo de libro en formato IEEE.
   */
  public printRef() {
      console.log(`${this.authors}, ${this.chapter} in ${this.title}, ${this.edition}th ed. ${this.city}, ${this.country}: ${this.publisher}, ${this.publishDate}, ${this.chapterNum}, ${this.pageNum}`);
  }
}

/**
* Representa una contribución a una conferencia.
*/
export class Conference {
  /**
   * @param title - Título de la contribución.
   * @param authors - Autores de la contribución.
   * @param keywords - Palabras clave de la contribución.
   * @param abstract - Resumen de la contribución.
   * @param publishDate - Fecha de publicación de la contribución.
   * @param pageNum - Número de páginas de la contribución.
   * @param publisher - Editorial de la conferencia.
   * @param confName - Nombre de la conferencia.
   * @param country - País donde se celebró la conferencia.
   * @param city - Ciudad donde se celebró la conferencia.
   */
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

  /**
   * Imprime la referencia de la contribución a la conferencia en formato IEEE.
   */
  public printRef() {
      console.log(`${this.authors}, "${this.title}" presented at the ${this.confName}, ${this.city}, ${this.country}, ${this.publishDate}.`);
  }
}

/**
* Representa un trabajo de fin de grado o máster.
*/
export class TFGM {
  /**
   * @param title - Título del trabajo.
   * @param authors - Autores del trabajo.
   * @param keywords - Palabras clave del trabajo.
   * @param abstract - Resumen del trabajo.
   * @param publishDate - Fecha de publicación del trabajo.
   * @param pageNum - Número de páginas del trabajo.
   * @param publisher - Editorial del trabajo.
   * @param dept - Departamento de la universidad.
   * @param university - Nombre de la universidad.
   * @param uniCity - Ciudad de la universidad.
   */
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

  /**
   * Imprime la referencia del trabajo de fin de grado o máster en formato IEEE.
   */
  public printRef() {
      console.log(`${this.authors}, "${this.title}" M.S. thesis, ${this.dept}, ${this.university}, ${this.publishDate}`);
  }
}
