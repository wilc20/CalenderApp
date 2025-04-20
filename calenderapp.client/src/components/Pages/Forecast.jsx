import { useEffect, useState } from 'react';
import '../../App.css';

function Forecast() {
    const [forecasts, setForecasts] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        populateWeatherData();
        retrieveDateData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                    <th>daysInFeb</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                        <td>{forecast.daysInFeb}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
            <p>{date}</p>
            <p>Something</p>
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');

        if (response.ok) {
            const data = await response.json();
            console.log("weatherresponse", data);
            setForecasts(data);
        }
    }

    async function retrieveDateData() {
        try {
            const response = await fetch('/Calender')

            console.log("Status:", response.status);
            const contentType = response.headers.get("content-type");
            console.log("Content-Type:", contentType);

            const raw = await response.text(); // force raw view
            console.log("Raw response:", raw);

            if (!response.ok) {
                console.error("HTTP error:", response.status);
                return;
            }

            if (!contentType || !contentType.includes("application/json")) {
                console.error("Expected JSON but got:", contentType);
                return;
            }

            const data = JSON.parse(raw);
            console.log("Parsed JSON:", data);
            setDate(data.serverTime);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    }
}

export default Forecast;