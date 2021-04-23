import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

const Forecast = () => {
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  function getForecast(e) {
    e.preventDefault();
    if (city.length === 0) {
      return setError(true);
    }

    setError(false);
    setResponseObj({});
    setLoading(true);

    const uriEncodedCity = encodeURIComponent(city);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
        },
      }
    )
      // after the data is received from the API (*asynchronous)
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

  const useStyles = makeStyles({
    root: {
      padding: ".5rem",
      margin: "10px auto",
      borderRadius: "5px",
    },
  });
  const classes = useStyles();

  return (
    <div>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <TextField
          id="outlined-basic"
          maxLength="50"
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormControl component="fieldset">
          <FormControlLabel
            control={<Radio />}
            label="Fahrenheit"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormControlLabel
            control={<Radio />}
            label="Celsius"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
        </FormControl>
        <Button
          className={classes.root}
          type="submit"
          variant="contained"
          color="primary"
        >
          Get Forecast
        </Button>
      </form>
      <Conditions responseObj={responseObj} error={error} loading={loading} />
    </div>
  );
};

export default Forecast;
