using innorik.Interfaces; 
using innorik.Models; 
using innorik.Data;  
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic; 
using System.Threading.Tasks; 
using System.Linq; 

namespace innorik.Services
{
    // The BookService class implements the IBookService interface
    public class BookService : IBookService
    {
        // Private field to hold the DbContext instance
        private readonly BookStoreDbContext _context;
        
        // Constructor to initialize the DbContext instance
        public BookService(BookStoreDbContext context)
        {
            _context = context;
        }

        // Method to get all books from the database
        public async Task<IEnumerable<Book>> GetAllBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // Method to get a specific book by its ID
        public async Task<Book> GetBookById(int id)
        {
            return await _context.Books.FindAsync(id);
        }

        // Method to create a new book in the database
        public async Task<Book> CreateBook(Book book)
        {
            _context.Books.Add(book); 
            await _context.SaveChangesAsync(); 
            return book; 
        }

        // Method to update an existing book in the database
        public async Task UpdateBook(Book book)
        {
            var existingBook = await _context.Books.FindAsync(book.Id); 
            if (existingBook == null) 
            {
                throw new KeyNotFoundException("Book not found.");
            }

            _context.Entry(existingBook).CurrentValues.SetValues(book); 
            await _context.SaveChangesAsync();
        }

        // Method to delete a book by its ID
        public async Task DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id); 
            if (book == null)
            {
                throw new KeyNotFoundException("Book not found."); 
            }

            _context.Books.Remove(book); 
            await _context.SaveChangesAsync(); 
        }

        // Method to get the total count of books in the database
        public async Task<int> GetTotalBooksCount()
        {
            return await _context.Books.CountAsync(); 
        }

        // Method to search for books by a query (name, description, or category)
        public async Task<IEnumerable<Book>> SearchBooks(string query)
        {
            return await _context.Books
                .Where(b => b.Book_name.Contains(query) || b.Description.Contains(query) || b.Category.Contains(query))
                .ToListAsync();
        }
    }
}
