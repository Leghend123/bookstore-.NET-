using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using innorik.Interfaces;
using innorik.Models;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace innorik.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly ILoggerService _loggerService;

        public BooksController(IBookService bookService, ILoggerService loggerService)
        {
            _bookService = bookService;
            _loggerService = loggerService;
        }

        // Fetch all books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetAllBooks()
        {
            _loggerService.Log("Fetching all books.");
            var books = await _bookService.GetAllBooks();
            return Ok(books);
        }

        // Fetch book by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBookById(int id)
        {
            _loggerService.Log($"Fetching book with ID {id}.");
            var book = await _bookService.GetBookById(id);
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        // Create a new book
        [HttpPost("addbook")]
        public async Task<ActionResult<Book>> CreateBook(Book book)
        {
            _loggerService.Log("Creating a new book.");
            var createdBook = await _bookService.CreateBook(book);
            return CreatedAtAction(nameof(GetBookById), new { id = createdBook.Id }, createdBook);
        }

        // Update an existing book
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(Book book)
        {
            _loggerService.Log($"Updating book with ID {book.Id}.");
            await _bookService.UpdateBook(book);
            return NoContent();
        }

        // Delete a book by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            _loggerService.Log($"Deleting book with ID {id}.");
            await _bookService.DeleteBook(id);
            return NoContent();
        }

        // Get the total count of books
        [HttpGet("count")]
        public async Task<IActionResult> GetTotalBooksCount()
        {
            var count = await _bookService.GetTotalBooksCount();
            return Ok(new { Count = count });
        }  

        // Search for books by query
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Book>>> SearchBooks([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Search query cannot be empty.");
            }

            var books = await _bookService.SearchBooks(query);
            if (books == null || !books.Any())
            {
                return NotFound(new { Message = "No books found matching your search criteria." });
            }

            return Ok(books);
        }
    }
}
