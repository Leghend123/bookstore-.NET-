
using Microsoft.EntityFrameworkCore;
using innorik.Models;

namespace innorik.Data
{
    public class BookStoreDbContext : DbContext
    {
        public BookStoreDbContext(DbContextOptions<BookStoreDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }  
        public DbSet<Book> Books { get; set; } 
    }
}
