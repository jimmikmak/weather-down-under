import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Find Current Weather Conditions</h2>
      <form onSubmit={getForecast}>
        <TextField
          id="outlined-basic"
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Measurement</FormLabel>
          <RadioGroup aria-label="measurement" name="units">
            <FormControlLabel
              control={<Radio />}
              label="Fahrenheit"
              checked={unit === "imperial"}
              value="imperial"
              onChange={(e) => setUnit(e.target.value)}
            />
            <FormControlLabel
              control={<Radio />}
              label="Celsius"
              checked={unit === "metric"}
              value="metric"
              onChange={(e) => setUnit(e.target.value)}
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Get Forecast
        </Button>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>Conditions</Paper>
          </Grid>
          <Grid container spacing={7}>
            <Grid item xs>
              <Paper className={classes.paper}>MON</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>TUES</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>WED</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>THURS</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>FRI</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>SAT</Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>SUN</Paper>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Conditions responseObj={responseObj} error={error} loading={loading} />
    </div>
  );
};

export default Forecast;
