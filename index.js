let myLibrary = []; // array to store all my books

// ? Function to create new elements with contents init
function createHTMLElement(type, ...contents) {
  let el = document.createElement(type);
  contents.map((content) => (el.innerHTML += content));
  return el;
}

// ? Book constructor function
function Book(name, author, description, summery) {
  this.name = name;
  this.author = author;
  this.description = description;
}

// ? Function to add new book to the library array
function addTOLibrary(book) {
  myLibrary.push(book);
}

// ? Function to remove any book from library array using title of the book (assuming each of the title are unique)
function removeFromLibrary(title) {
  myLibrary = myLibrary.find((book) => book.title === title);
}

// ? Function to display all books in a dashboard
function displayBooks(myLibrary, container) {
  myLibrary.map((book) => {
    const h2 = createHTMLElement("h2", book.title); // title of book
    h2.classList = "book_title";
    const h3 = createHTMLElement("h3", book.author); // author of book
    h3.classList = "book_author";
    const p = createHTMLElement("p", book.summery); // summery of book
    p.classList = "book_summery";
    const div = createHTMLElement("div", h2, h3, p);
    div.classList = "book_card";
    container.appendChild(div);
  });
}

document.getElementById("book_add").addEventListener("click", () => {
  console.log("visible");
  document.getElementById("modal").classList.toggle("visible");
  // addTOLibrary();
});

document.getElementById("submit_book").addEventListener("click", () => {
  console.log("hidden");
  document.getElementById("modal").classList.toggle("visible");
});
