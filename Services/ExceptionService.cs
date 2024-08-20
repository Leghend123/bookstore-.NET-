using innorik.Interfaces;
using System;

namespace innorik.Services
{
    public class ExceptionService : IExceptionService
    {
        private readonly ILoggerService _logger;

        public ExceptionService(ILoggerService logger)
        {
            _logger = logger;
        }

        public void LogException(Exception exception)
        {
            _logger.Log($"Exception: {exception.Message}");
        }
    }
}
