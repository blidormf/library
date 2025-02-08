const library = [];

function Book(title, author, pages, isRead = false, domElement) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.domElement = domElement;
}

function getRandomLightColor() {
    const minLightValue = 128;

    const r = Math.floor(Math.random() * (256 - minLightValue) + minLightValue);
    const g = Math.floor(Math.random() * (256 - minLightValue) + minLightValue);
    const b = Math.floor(Math.random() * (256 - minLightValue) + minLightValue);

    return `rgb(${r}, ${g}, ${b})`;
}

function addBook(book) {
    // Main container
    const booksContainer = document.querySelector('.books-container');

    // Book card
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.style.backgroundColor = getRandomLightColor();

    // Children of the book card
    const bookCardLeft = document.createElement('div');
    bookCardLeft.className = 'book-card-left';

    const bookCardRight = document.createElement('div');
    bookCardRight.className = 'book-card-right';

    // Children of the left part of the book card
    const bookIcon = document.createElement('object');
    bookIcon.type = 'image/svg+xml';
    bookIcon.data = 'assets/book-icon.svg';

    // Children of the right part of the book card
    const bookInfo = document.createElement('div');
    bookInfo.className = 'book-info';

    const bookActions = document.createElement('book-actions');
    bookActions.className = 'book-actions';

    // Children of book info
    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = book.title;

    const author = document.createElement('p');
    author.className = 'author';
    author.textContent = book.author;

    const pages = document.createElement('p');
    pages.className = 'pages';
    pages.textContent = book.pages + ' ' + (book.pages > 1 ? 'pages' : 'page');

    const readStatus = document.createElement('p');
    readStatus.className = 'read';
    readStatus.textContent = book.isRead ? 'Read' : 'Not read yet';

    // Append the book info elements to the book info section
    bookInfo.appendChild(title);
    bookInfo.appendChild(author);
    bookInfo.appendChild(pages);
    bookInfo.appendChild(readStatus);

    // Children of book actions
    const readButton = document.createElement('button');
    readButton.className = 'read';
    readButton.textContent = 'Read';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'Delete';

    // Create element hierarchy
    booksContainer.appendChild(bookCard);
    bookCard.appendChild(bookCardLeft);
    bookCardLeft.appendChild(bookIcon);
    bookCard.appendChild(bookCardRight);
    bookCardRight.appendChild(bookInfo);
    bookCardRight.appendChild(bookActions);
    bookActions.appendChild(readButton);
    bookActions.appendChild(deleteButton);

    // Add DOM element
    book.domElement = bookCard;

    deleteButton.addEventListener('click', () => {
        bookCard.classList.add('fade-out');
        library.splice(library.indexOf(book), 1);
        bookCard.addEventListener('transitionend', function () {
            bookCard.remove();
        });

        // booksContainer.removeChild(bookCard);
    });

    readButton.addEventListener('click', () => {
        if (!book.isRead) {
            book.isRead = true;
            readStatus.textContent = 'Read';
            readButton.textContent = 'Unread';
        } else {
            book.isRead = false;
            readStatus.textContent = 'Not read yet';
            readButton.textContent = 'Read';
        }
    });
}

const addButton = document.querySelector('.actions .add-button');
const addBookDialog = document.querySelector('dialog.add-book-dialog');
const form = document.querySelector('dialog form');
const addDialogButton = document.querySelector('dialog #add-book-dialog-button');
const cancelDialogButton = document.querySelector('dialog #cancel-dialog-button');
const title = document.querySelector('input#title');
const author = document.querySelector('input#author');
const pages = document.querySelector('input#pages');
const isRead = document.querySelector('input#is-read');

addButton.addEventListener('click', () => {
    addBookDialog.showModal();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();

    addBook(new Book(title.value, author.value, pages.value, isRead.checked));

    title.value = author.value = pages.value = "";
    isRead.checked = false;

    addBookDialog.close();
})

cancelDialogButton.addEventListener('click', (e) => {
    e.preventDefault();

    title.value = author.value = pages.value = "";
    isRead.checked = false;

    addBookDialog.close();
});