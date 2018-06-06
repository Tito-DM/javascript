//book class
class Book{
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


//UI class

class UI{

  addBookToList(book) {
    const list = document.getElementById('book-list');
    //create a tr element
    const row = document.createElement('tr');
    //insert col
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href = "#" class="delete">x</td>
  `;
    list.appendChild(row);
  }

  //clear Field
  clearFields() {
    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('isbn').value = "";
  }

  //delete books
  deleteBook(e) {
    e.target.parentElement.parentElement.remove();
  }
  //message
  custamizeMessage(message, bgColor){
    
  }
   //message
   static customizeMessage(message, bgColor){
     //create a div element
     const div = document.createElement('div');
     div.className = 'alert';
     //append text
     div.appendChild(document.createTextNode(message));
     div.style.height = '5vh';
     div.style.borderBottomRightRadius = '5px'
     div.style.borderBottomLeftRadius = '5px'
     div.style.backgroundColor = bgColor;
     div.style.color = 'whiteSmoke';
     div.style.textAlign = 'center';
     //get parent
     const container = document.querySelector('.container');
     container.insertBefore(div, document.getElementById('header'));
   }
  //show alert
  showAlert(message, status) {

    if (status === 'fail') {
      UI.customizeMessage(message, '#ea454b' );
    } else if (status === 'exist'){
      UI.customizeMessage(message, '#f57f17');
    }else{
      UI.customizeMessage(message, '#9ccc65');
    }

  }

}

//local Store Class
class Store{

  static getFromLocalStorage() {
    let books;

    if (localStorage.getItem('books') === null) {
       books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;

  }

   static displayBooks(){
     let books = Store.getFromLocalStorage();
      books.forEach(function(book) {
        const ui = new UI;
        //add book to UI
        ui.addBookToList(book);
      })
  
   }

  static  addtoLocalStorage(book){
      let books = Store.getFromLocalStorage();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
   }

  static checkIfBookExist(title,isbn){
     let output;
     let books = Store.getFromLocalStorage();

     books.forEach(function (book) {
       if(book.isbn === isbn ){
         output = true;
    
       }else{
         output = false; 
       }
     });
     return output;
   }

  

   static removeFromLocalStorage(isbn) {
     let books = Store.getFromLocalStorage();

     books.forEach(function(book, index){
     if(book.isbn === isbn){
       books.splice(index, 1);
     }
     });
     localStorage.setItem('books', JSON.stringify(books));
   }
}

//DOM load event

document.addEventListener('DOMContentLoaded', Store.displayBooks);



//delete book
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();
  if (e.target.classList.contains('delete')){
   ui.deleteBook(e);

   //remove from local storage
   Store.removeFromLocalStorage(e.target.parentElement.previousElementSibling.textContent);
  }
});

//setTimeOurt function
function timeout(time){
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, time);
}

//Event Listerners
document.getElementById('book-form').addEventListener('submit',function(e) {
//get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  // instatiate UI
  const ui = new UI();

 if(title === '' || author === '' || isbn === ''){
   ui.showAlert("Please check your fields", "fail");
   //call timeout
   timeout(2000);
   //clear the fields
   ui.clearFields();
 }else{
   
   if(Store.checkIfBookExist(title,isbn) === true){
     ui.showAlert("this book is already Added", "exist");
     //call timeout
     timeout(2000);
   }else{
     ui.showAlert("Book Add successfully", "succsess");
     //call timeout
     timeout(1500);
          
    // instatiate Book   
    const book = new Book(title, author, isbn);
    //validate
    //add book to list
    ui.addBookToList(book);

    //add to local storage
    Store.addtoLocalStorage(book);

    ui.clearFields();
  
   }
   
 }
  e.preventDefault();
})