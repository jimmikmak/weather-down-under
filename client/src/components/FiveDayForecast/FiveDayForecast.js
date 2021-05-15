import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";

export const FiveDayForecast = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("imperial");
  const [responseObj, setResponseObj] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function getFiveDayForecast(e) {
    e.preventDefault();
    if (city.length === 0) {
      return setError(true);
    }

    setError(false);
    setResponseObj({});
    setLoading(true);

    const uriEncodedCity = encodeURIComponent(city);
    fetch(
      `https://community-open-weather-map.p.rapidapi.com/forecast?units=${unit}&q=${uriEncodedCity}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "18b0b2afc4mshc736424a2c7d6c3p16c6d8jsnd3bf40f8cfd9",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.cod !== 200) {
          throw new Error();
        }
        setResponseObj(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }

  return (
    <div>
      <h1>Five Day Weather Forecast</h1>
    </div>
  );
};
