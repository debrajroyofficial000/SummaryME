let myLibrary = []; // array to store all my books

// ? Function to create new elements with contents init
function createHTMLElement(type, ...contents) {
  let el = document.createElement(type);
  contents.forEach((content) => {
    if (typeof content === "string") {
      el.innerHTML += content;
    } else {
      el.appendChild(content);
    }
  });
  return el;
}

// ? Book constructor function
function Book(name, author, summary) {
  this.name = name;
  this.author = author;
  this.summary = summary;
}

// ? Function to add new book to the library array
function addTOLibrary(book) {
  myLibrary.push(book);
}

// ? Function to remove any book from library array using title of the book (assuming each of the title are unique)
function removeFromLibrary(title) {
  myLibrary = myLibrary.filter((book) => book.title !== title);
}

// ? Function to display all books in a dashboard
function displayBooks() {
  const booksContainer = document.getElementById("books_container");
  // Clear existing content in booksContainer
  booksContainer.innerHTML = "";
  myLibrary.map((book) => {
    const h2 = createHTMLElement("h2", book.name); // title of book
    h2.classList.add("book_title");
    const h3 = createHTMLElement("h3", book.author); // author of book
    h3.classList.add("book_author");
    const p = createHTMLElement("p", book.summary); // summary of book
    p.classList.add("book_summary");
    const div = createHTMLElement("div", h2, h3, p);
    div.classList.add("book_card");
    booksContainer.appendChild(div);
  });
}

document.getElementById("book_add").addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("visible");
});

document.getElementById("submit_book").addEventListener("click", () => {
  const title = document.getElementById("add_book_title");
  const author = document.getElementById("add_book_author");
  const summary = document.getElementById("add_book_summary");

  if (title.value && author.value && summary.value) {
    let book = new Book(title.value, author.value, summary.value);
    addTOLibrary(book);
    displayBooks();

    // Clear input fields
    title.value = "";
    author.value = "";
    summary.value = "";

    // Toggle modal visibility
    document.getElementById("modal").classList.toggle("visible");
  }
});
