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
function removeBookFromLibrary(e) {
  const parentNode = e.target.parentNode;
  const bookTitle = parentNode.querySelector(".book_title").textContent;

  myLibrary = myLibrary.filter(
    (book) => book.name.toLowerCase() !== bookTitle.toLowerCase()
  );

  displayBooks(myLibrary);
}

// ? Function to display all books in a dashboard
function displayBooks(library) {
  const booksContainer = document.getElementById("books_container");
  // Clear existing content in booksContainer
  booksContainer.innerHTML = "";

  // * If there is no items
  if (!library.length) {
    const h2 = createHTMLElement("h2", "There is no book");
    h2.style.color = "rgb(126, 125, 125)";
    const div = createHTMLElement("div", h2);
    booksContainer.appendChild(div);
    return;
  }

  library.map((book) => {
    const deleteBtn = createHTMLElement("button", "Delete");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", removeBookFromLibrary);
    const h2 = createHTMLElement("h2", book.name); // title of book
    h2.classList.add("book_title");
    const h3 = createHTMLElement("h3", book.author); // author of book
    h3.classList.add("book_author");
    const p = createHTMLElement("p", book.summary); // summary of book
    p.classList.add("book_summary");
    const div = createHTMLElement("div", h2, h3, p, deleteBtn);
    div.classList.add("book_card");
    booksContainer.appendChild(div);
  });
}

// remove modal from display
document.getElementById("book_add").addEventListener("click", () => {
  document.getElementById("modal").classList.toggle("visible");
});

// Adding items to library array
document.getElementById("submit_book").addEventListener("click", () => {
  const title = document.getElementById("add_book_title");
  const author = document.getElementById("add_book_author");
  const summary = document.getElementById("add_book_summary");

  if (title.value && author.value && summary.value) {
    let book = new Book(title.value, author.value, summary.value);
    addTOLibrary(book);
    displayBooks(myLibrary);

    // Clear input fields
    title.value = "";
    author.value = "";
    summary.value = "";

    // Toggle modal visibility
    document.getElementById("modal").classList.toggle("visible");
  }
});

// Filter items
document.getElementById("book_search").addEventListener("input", (e) => {
  let searchedItems = e.target.value;

  const filteredItems = searchedItems.length
    ? myLibrary.filter(
        (book) =>
          book.name.toLowerCase().includes(searchedItems.toLowerCase()) ||
          book.author.toLowerCase().includes(searchedItems.toLowerCase())
      )
    : myLibrary;

  displayBooks(filteredItems);
});

// // Delete button
// document.querySelectorAll(".deleteBtn").forEach((deleteBtn) => {
//   deleteBtn.addEventListener("click", (e) => {
//     console.log("hi");
//     console.log(e);
//     const parentNode = e.target.parentNode;
//     const bookTitle = parentNode.querySelector(".book_title").textContent;

//     const restOfBooks = myLibrary.find(
//       (book) => book.name.toLowerCase() !== bookTitle.toLowerCase()
//     );

//     displayBooks(restOfBooks);
//   });
// });
