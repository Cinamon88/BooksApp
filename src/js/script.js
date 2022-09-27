
{
  const select = {
    templateOf: {
      book: '#template-book',
    },
    containerOf: {
      bookList: '.books-list',
    },
    all: {
      filterForm: '.filters',
      filtersInputs: '.filters input',
    },
  };

  class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];

      this.initData();
      this.renderBooks();
      this.getElements();
      this.initActions();
    }

    initData() {
      this.data = dataSource.books;
    }

    renderBooks() {
      const bookTemplates = {
        books: Handlebars.compile(
          document.querySelector(select.templateOf.book).innerHTML
        ),
      };

      for (const book of this.data) {
        book.ratingBgc = this.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;

        const generatedHTML = bookTemplates.books(book);
        const bookHTML = utils.createDOMFromHTML(generatedHTML);
        const booksContainer = document.querySelector(
          select.containerOf.bookList
        );
        booksContainer.appendChild(bookHTML);
      }
    }

    getElements() {
      this.dom = {};
      this.dom.books = document.querySelector(select.containerOf.bookList);
      this.dom.filterForm = document.querySelector(select.all.filterForm);
      this.dom.filterInputs = document.querySelectorAll(
        select.all.filtersInputs
      );
    }

    initActions() {
      this.dom.books.addEventListener('click', (event) => {
        event.preventDefault();
      });

      this.dom.books.addEventListener('dblclick', (event) => {
        if (event.target.offsetParent.classList.contains('book__image')) {
          event.preventDefault();
          const bookId = event.target.offsetParent.getAttribute('data-id');
          if (!this.favoriteBooks.includes(bookId)) {
            event.target.offsetParent.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          } else {
            event.target.offsetParent.classList.remove('favorite');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });

      this.dom.filterForm.addEventListener('click', (event) => {
        if (
          event.target.tagName == 'INPUT' &&
          event.target.type == 'checkbox' &&
          event.target.name == 'filter'
        ) {
          if (event.target.checked) {
            this.filters.push(event.target.value);
          } else {
            this.filters.splice(this.filters.indexOf(event.target.value), 1);
          }
        }
        for (let input of this.dom.filterInputs) {
          input.addEventListener('change', this.filterBooks());
        }
      });
    }

    filterBooks() {
      for (const book of this.data) {
        let shouldBeHidden = false;
        for (const filter of this.filters) {
          if (!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if (shouldBeHidden) {
          document.querySelector(`[data-id="${book.id}"]`).classList.add('hidden');
        } else {
          document.querySelector(`[data-id="${book.id}"]`).classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating) {
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
