using innorik.Interfaces;
using System;
using System.IO;

namespace innorik.Services
{
    // LoggerService class implements the ILoggerService interface
    public class LoggerService : ILoggerService
    {
        // Private field to hold the log file path
        private readonly string _logFilePath;

        // Constructor to initialize the log file path and ensure the logs directory exists
        public LoggerService()
        {
            // Set the log file path to a "logs" directory in the application's base directory
            _logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "log.txt");

            // Get the directory name from the log file path
            var logDirectory = Path.GetDirectoryName(_logFilePath);

            // Check if the directory exists, if not, create it
            if (!Directory.Exists(logDirectory))
            {
                Directory.CreateDirectory(logDirectory);
            }
        }

        // Method to log a message to the log file
        public void Log(string message)
        {
            try
            {
                // Format the log message with a timestamp
                var logMessage = $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} - {message}";

                // Append the log message to the log file
                File.AppendAllText(_logFilePath, logMessage + Environment.NewLine);
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occur during logging (optional)
                // Log the exception message to the console
                Console.WriteLine($"Logging failed: {ex.Message}");
            }
        }
    }
}
