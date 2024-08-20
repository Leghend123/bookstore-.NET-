using innorik.Interfaces;
using innorik.Models;
using innorik.Data;  
using BCrypt.Net;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;

namespace innorik.Services
{
    // UserService class implements the IUserService interface
    public class UserService : IUserService
    {
        // Private field to hold the database context
        private readonly BookStoreDbContext _context;

        // Constructor to initialize the database context
        public UserService(BookStoreDbContext context)
        {
            _context = context;
        }

        // Method to get a user by username
        public async Task<User> GetUserByUsername(string username)
        {
            // Asynchronously fetch the user with the specified username
            return await _context.Users.SingleOrDefaultAsync(u => u.Username == username);
        }

        // Method to register a new user with a hashed password
        public async Task RegisterUser(User user, string password)
        {
            // Check if the user already exists
            if (await UserExists(user.Username))
            {
                // Throw an exception if the user already exists
                throw new InvalidOperationException("User already exists.");
            }

            // Hash the user's password using BCrypt
            user.Password = BCrypt.Net.BCrypt.HashPassword(password);

            // Add the new user to the context and save changes asynchronously
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        // Method to validate the user's credentials
        public async Task<bool> ValidateUser(string username, string password)
        {
            // Fetch the user with the specified username
            var user = await GetUserByUsername(username);

            // If the user is not found, return false
            if (user == null) return false;

            // Verify the password using BCrypt and return the result
            return BCrypt.Net.BCrypt.Verify(password, user.Password);
        }

        // Method to log in a user using their login details
        public async Task<User> Login(LoginDto loginDto)
        {
            // Fetch the user with the specified username
            var user = await GetUserByUsername(loginDto.Username);

            // If the user is found and the credentials are valid, return the user
            if (user != null && await ValidateUser(loginDto.Username, loginDto.Password))
            {
                return user;
            }

            // Throw an exception if the credentials are invalid
            throw new UnauthorizedAccessException("Invalid username or password.");
        }

        // Method to check if a user exists by username
        public async Task<bool> UserExists(string username)
        {
            // Check if any user with the specified username exists and return the result
            return await _context.Users.AnyAsync(u => u.Username == username);
        }
    }
}
