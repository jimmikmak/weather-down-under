import React, { useState } from "react";

export const FiveDayForecast = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("imperial");
  const [responseObj, setResponseObj] = useState({});

  function getFiveDayForecast(e) {
    e.preventDefault();

    const uriEncodedCity = encodeURIComponent(city);
    fetch(
      "https://community-open-weather-map.p.rapidapi.com/forecast?q=Sydney",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "18b0b2afc4mshc736424a2c7d6c3p16c6d8jsnd3bf40f8cfd9",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div>
      <h1>Five Day Weather Forecast</h1>
    </div>
  );
};
