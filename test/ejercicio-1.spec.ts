import 'mocha';
import {expect} from 'chai';
import {MagArticle, Book, BookChapt, Conference, TFGM} from '../src/ejercicio-1/biblioTypes';
import {Action, Filters, ReferenceCollection} from '../src/ejercicio-1/biblioElement';

describe('Elementos bibliográficos', () => {
  it('Debería imprimir la referencia de un artículo de revista', () => {
    const article = new MagArticle('Título del artículo', 'Autor del artículo', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen del artículo', '2024-02-20', 10, 'Editorial de la revista', 123, 456);
    expect(article.printRef()).to.not.throw;
  });

  it('Debería imprimir la referencia de un libro', () => {
    const book = new Book('Título del libro', 'Autor del libro', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen del libro', '2024-02-20', 200, 'Editorial del libro', 'Capítulo 1', 'Ciudad', 1, 'País');
    expect(book.printRef()).to.not.throw;
  });

  it('Debería imprimir la referencia de un capítulo de libro', () => {
    const bookChapt = new BookChapt('Título del libro', 'Autor del libro', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen del libro', '2024-02-20', 50, 'Editorial del libro', 'Capítulo 1', 'Ciudad', 1, 'País', 2);
    expect(bookChapt.printRef()).to.not.throw;
  });

  it('Debería imprimir la referencia de una contribución a una conferencia', () => {
    const conference = new Conference('Título de la contribución', 'Autor de la contribución', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen de la contribución', '2024-02-20', 5, 'Editorial de la conferencia', 'Nombre de la conferencia', 'País', 'Ciudad');
    expect(conference.printRef()).to.not.throw;
  });

  it('Debería imprimir la referencia de un trabajo de fin de grado o máster', () => {
    const tfgm = new TFGM('Título del trabajo', 'Autor del trabajo', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen del trabajo', '2024-02-20', 100, 'Editorial del trabajo', 'Departamento', 'Universidad', 'Ciudad universidad');
    expect(tfgm.printRef()).to.not.throw;
  });
});

describe('Colección de referencias bibliográficas', () => {

  const article = new MagArticle('Título del artículo', 'Autor del artículo', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen del artículo', '2024-02-20', 10, 'Editorial de la revista', 123, 456);

  const book = new Book('Título del libro', 'Autor del libro', ['Palabra clave 1', 'Palabra clave 2'], 'Resumen del libro', '2024-02-20', 200, 'Editorial del libro', 'Capítulo 1', 'Ciudad', 1, 'País');

  const collection = new ReferenceCollection([article, book]);

  const filter1: Filters = {
    keywords: ['Palabra clave 1'],
    title: 'Título del artículo'
  }
  const filter2: Filters = {
    keywords: ['Palabra clave 1']
  }
  const action1: Action = 'Exportar';
  const action2: Action = 'Imprimir';

  it('Debería imprimir las referencias en formato de tabla', () => {
    expect(collection.printTable()).to.deep.equal(console.table([article, book]));
  });

  it('Debería imprimir la busqueda en formato de tabla.', () => {
    expect(collection.search(filter1, action2)).to.deep.equal(console.table([article]));
    expect(collection.search(filter2, action2)).to.deep.equal(console.table([article, book]));
  });

  it('Debería exportar la busqueda en referencias IEEE.', () => {
    expect(collection.search(filter1, action1)).to.deep.equal(article.printRef());
  });

});