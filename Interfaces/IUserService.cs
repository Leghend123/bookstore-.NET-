using innorik.Models;
using System.Threading.Tasks;

namespace innorik.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUserByUsername(string username);
        Task RegisterUser(User user, string password);
        Task<bool> ValidateUser(string username, string password);
        Task<User> Login(LoginDto loginDto);  
        Task<bool> UserExists(string username); 
       
    }
}
