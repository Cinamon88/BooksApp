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

  const favoriteBooks = [];

  function initActions(){
    const imageBooks = document.querySelectorAll(('.book a'));
    const book = document.querySelector(select.containerOf.booksList);
    console.log(book);

    book.addEventListener('click', function (event){
      event.preventDefault(); 

      if(event.target.offsetParent.classList.contains('book__image')){
        for(let imageBook of imageBooks){
          imageBook.addEventListener('click', function(event){
            const getID = event.target.offsetParent.getAttribute('data-id');

            if(!favoriteBooks.includes(getID)){
              imageBook.classList.add(select.classActive.favorite);
              favoriteBooks.push(getID);
            } else {
              imageBook.classList.remove(select.classActive.favorite);
              const index = favoriteBooks.indexOf(getID);
              favoriteBooks.splice(index, 1);
            }
          });
        }
      }
    });
  }
  
  console.log('favoriteBooks:', favoriteBooks);

  renderBooks();
  initActions();
}