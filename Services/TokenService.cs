using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using innorik.Interfaces;

namespace innorik.Services
{
    // TokenService class implements the ITokenService interface
    public class TokenService : ITokenService
    {
        // Private field to hold the configuration
        private readonly IConfiguration _configuration;

        // Constructor to initialize the configuration
        public TokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Method to generate a JWT token for a given username
        public string GenerateJwtToken(string username)
        {
            // Create a new instance of JwtSecurityTokenHandler
            var tokenHandler = new JwtSecurityTokenHandler();

            // Get the key from the configuration and encode it
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            // Create a SecurityTokenDescriptor with the token properties
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, username)  // Add the username claim
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),  // Set token expiration time
                Issuer = _configuration["Jwt:Issuer"],    // Set token issuer
                Audience = _configuration["Jwt:Audience"],  // Set token audience
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)  // Set the signing credentials
            };

            // Create the token
            var token = tokenHandler.CreateToken(tokenDescriptor);

            // Return the serialized token
            return tokenHandler.WriteToken(token);
        }

        // Method to validate a given JWT token
        public bool ValidateToken(string token)
        {
            try
            {
                // Create a new instance of JwtSecurityTokenHandler
                var tokenHandler = new JwtSecurityTokenHandler();

                // Get the key from the configuration and encode it
                var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

                // Define the token validation parameters
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidAudience = _configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };

                // Validate the token
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out var validatedToken);

                // Return true if the token is validated successfully
                return validatedToken != null;
            }
            catch
            {
                // Return false if validation fails
                return false;
            }
        }

    }
}
