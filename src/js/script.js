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
      hidden: 'hidden',
    },

    classActive: {
      favorite: 'favorite',
      hidden: 'hidden',
    }
  };

  const templates = {
    books: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };

  const favoriteBooks = [];
  const filters = [];

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElement();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();


    }

    initData() {
      const thisBooksList = this;
      this.data = dataSource.books;

      for (let book of dataSource.books) {
        book.ratingWidth = book.rating * 10;
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);

        const generatedHTML = templates.books(book);
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        const menuContainer = document.querySelector(select.containerOf.booksList);
        menuContainer.appendChild(generatedDOM);
      }
    }

    getElement() {
      const thisBooksList = this;
      console.log(thisBooksList);
    }

    initActions() {
      const imageBooks = document.querySelectorAll(('.book a'));
      const book = document.querySelector(select.containerOf.booksList);
      console.log(book);

      book.addEventListener('click', function(event) {
        event.preventDefault();

        if (event.target.offsetParent.classList.contains('book__image')) {
          for (let imageBook of imageBooks) {
            imageBook.addEventListener('click', function(event) {
              const getID = event.target.offsetParent.getAttribute('data-id');

              if (!favoriteBooks.includes(getID)) {
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

      const form = document.querySelector(select.containerOf.filters);
      form.addEventListener('click', function(event) {
        const filter = event.target;
        if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
          if (filter.checked == true) {
            const value = filter.value;
            filters.push(value);
          } else {
            const value = filter.value;
            const removeValue = filters.indexOf(value);
            filters.splice(removeValue, 1);
          }
        }
      });
    }

    filterBooks() {
      const thisBooksList = this;
      const dataBooks = dataSource.books;
      const bookArray = [];
      console.log(thisBooksList);

      for (let dataBook of dataBooks) {
        let shouldBeHidden = false;

        for (const filter of filters) {
          if (!dataBook.details[filter]) {
            shouldBeHidden = true;
            bookArray.push(dataBook.id);
            break;
          }
        }

        if (shouldBeHidden == true) {
          const bookImage = document.querySelector('.book__image[data-id="' + dataBook.id + '"]');
          bookImage.classList.add(select.className.hidden);

        } else if (shouldBeHidden == false) {
          const bookImage = document.querySelector('.book__image[data-id="' + dataBook.id + '"]');
          bookImage.classList.remove(select.className.hidden);
        }
      }
    }

    determineRatingBgc(rating) {
      const thisBooksList = this;
      console.log(thisBooksList);

      let ratingBgc = '';
      if (rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      } else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      } else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }

      return ratingBgc;
    }
  }

  const app = new BooksList();
  console.log(app);

}
