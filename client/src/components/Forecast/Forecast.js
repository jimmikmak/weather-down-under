import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import Button from "@material-ui/core/Button";

const Forecast = () => {
  let [city, setCity] = useState("Sydney");
  let [unit, setUnit] = useState("imperial");
  let [responseObj, setResponseObj] = useState({});
  function getForecast(e) {
    e.preventDefault();

    const uriEncodedCity = encodeURIComponent(city);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "18b0b2afc4mshc736424a2c7d6c3p16c6d8jsnd3bf40f8cfd9",
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      // after the data is received from the API (*asynchronous)
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <Button variant="contained" color="primary" onClick={getForecast}>
        Get Forecast
      </Button>
      <Conditions responseObj={responseObj} />
    </div>
  );
};

export default Forecast;
