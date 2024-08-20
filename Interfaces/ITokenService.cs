using System.Threading.Tasks;

namespace innorik.Interfaces
{
    public interface ITokenService
{
    string GenerateJwtToken(string username);
    bool ValidateToken(string token);
    string GetUsernameFromToken(string token);
}

}

