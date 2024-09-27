import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IBook } from '../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  books: IBook[]=[];  
  bookId: number =Date.now();
  bookTitle: string='';
  bookAuthor:string='';
  bookPublicationDate: Date=new Date();

  // Track editing book ID (null means adding a new book)
  editingBookId: number | null = null;

  ngOnInit(): void {
    this.showBookDetails()
  }
  showBookDetails() {
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
  }
  
  // Method to add a new book or update an existing one
  addOrEditBook(): void {
    if(!this.bookTitle ||!this.bookAuthor ||!this.bookPublicationDate) {alert('Please fill all required fields'); return;}

    if (this.editingBookId === null) {
      // Adding a new book     
      this.books.push({
        id: this.bookId,
        title: this.bookTitle,
        author: this.bookAuthor,
        publicationDate: new Date(this.bookPublicationDate),
      });
      localStorage.setItem('books', JSON.stringify(this.books));
    } else {
      // Updating an existing book
      const bookIndex = this.books.findIndex(book => book.id === this.editingBookId);
      if (bookIndex !== -1) {
        this.books[bookIndex].title = this.bookTitle;
        this.books[bookIndex].author = this.bookAuthor;
        this.books[bookIndex].publicationDate =this.bookPublicationDate;
        localStorage.setItem('books', JSON.stringify(this.books));
      }
    }

    // Clear the form fields and reset editing state
    this.clearForm();
  }

  // Method to set the form fields with the book details for editing
  editBook({ id, title, author, publicationDate }: IBook): void {
    // Set editing book ID
    this.editingBookId = id;
    
    // Set form fields with book details
    this.bookId = id;
    this.bookTitle = title;
    this.bookAuthor = author;
    debugger;
    this.bookPublicationDate = new Date(publicationDate);
  }

  // Method to delete a book
  deleteBook(bookId: number): void {
    this.books = this.books.filter(book => book.id !== bookId);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Clear the form fields and reset editing state
  clearForm(): void {
    this.bookTitle = '';
    this.bookAuthor = '';
    this.bookPublicationDate = new Date();
    this.editingBookId = null;
  }
  
}
