/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    dataSource: {
      data: dataSource.books,
      detailsAdults: 'adults',
      nonFiction: 'nonFiction',
    },

    templateOf: {
      books: '#template-book',
    },

    containerOf: {
      booksList: '.books-list',
      book: '.book a',
      filters: '.filters',
    },

    className: {
      bookImage: '.book_image',
    },

    classActive: {
      favorite: 'favorite',
      hidde: 'hidden',
    }
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  function renderBooks(){
    for(let book of dataSource.books){
      const generatedHTML = templates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const menuContainer = document.querySelector(select.containerOf.booksList);
      menuContainer.appendChild(generatedDOM);
      
    }
  }

}