let myLibrary = [];

function Book(title, author, pages, read, comment) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.comment = comment;
}

function addBookToLibrary(title, author, pages, read, comment) {
  let book = new Book(title, author, pages, read, comment);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const books = document.querySelector(".books");
  const removeDivs = document.querySelectorAll(".card");
  for (let i = 0; i < removeDivs.length; i++) {
    removeDivs[i].remove();
  }

  let index = 0;
  myLibrary.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");
    books.appendChild(card);

    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("remove-book-button");
    removeBookButton.textContent = "Remove book";

    removeBookButton.dataset.linkedArray = index;
    card.appendChild(removeBookButton);

    removeBookButton.addEventListener("click", removeBook);

    function removeBook() {
      let bookToRemove = removeBookButton.dataset.linkedArray;
      myLibrary.splice(parseInt(bookToRemove), 1);
      card.remove();
      displayBooks();
    }

    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("read-status-button");
    readStatusButton.textContent = "Toggle Read Status";

    readStatusButton.dataset.linkedArray = index;
    card.appendChild(readStatusButton);

    readStatusButton.addEventListener("click", toggleReadStatus);

    function toggleReadStatus() {
      let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
      Book.prototype = Object.create(Book.prototype);
      const toggleBook = new Book();

      if (myLibrary[parseInt(retrieveBookToToggle)].read == "Yes") {
        toggleBook.read = "No";
        myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
      } else if (myLibrary[parseInt(retrieveBookToToggle)].read == "No") {
        toggleBook.read = "Yes";
        myLibrary[parseInt(retrieveBookToToggle)].read = toggleBook.read;
      }
      displayBooks();
    }

    for (let key in item) {
      const para = document.createElement("p");
      para.textContent = `${key}: ${item[key]}`;
      card.appendChild(para);
    }
    index++;
  });
}

const addNewBook = document.querySelector(".add-new-book");
addNewBook.addEventListener("click", displayTheForm);

function displayTheForm() {
  document.querySelector(".add-form").style.display = "";
}

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", enterFormData);

function enterFormData() {
  let title = document.getElementById("Title").value;
  let author = document.getElementById("Author").value;
  let pages = document.getElementById("Pages").value;
  let read = document.getElementById("Read").value;
  let comment = document.getElementById("Comment").value;

  if (title == "" || author == "" || pages == "" || read == "") {
    return;
  }
  addBookToLibrary(title, author, pages, read, comment);
  document.getElementById("add-book").reset();
  document.querySelector(".add-form").style.display = "none";
}

const clearButton = document.querySelector(".reset-button");
clearButton.addEventListener("click", clearForm);

function clearForm() {
  document.getElementById("add-book").reset();
}

displayBooks();
