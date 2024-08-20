using System.Collections.Generic; 
using System.Threading.Tasks;     
using innorik.Models;         

namespace innorik.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<Book>> GetAllBooks();  
        Task<Book> GetBookById(int id);         
        Task<Book> CreateBook(Book book);      
        Task UpdateBook(Book book);           
        Task DeleteBook(int id);   
        Task<int> GetTotalBooksCount();  
        Task<IEnumerable<Book>> SearchBooks(string query);       
    }
}
