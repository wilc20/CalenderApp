using Microsoft.AspNetCore.Mvc;

namespace CalenderApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    { 
        private DateTimeOffset _date = DateTimeOffset.Now;
        private int _feb = DateTime.DaysInMonth(2025, 2);


        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                //Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Date = DateOnly.FromDateTime(DateTimeOffset.Now.Date),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)],
                DaysInFeb = _feb
            })
            .ToArray();
        }
    }
}
