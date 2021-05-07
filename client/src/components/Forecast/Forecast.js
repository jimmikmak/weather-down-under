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
import { Link } from "react-router-dom";

export const Forecast = () => {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("imperial");
  const [responseObj, setResponseObj] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveBookmark = () => {
    fetch("http://localhost:3000/api/bookmarks", {
      method: "POST",
      body: JSON.stringify({ city: city }),
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    });
  };

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
      margin: "auto",
      maxWidth: 700,
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className="App-header">
        <h1>Weather Down Under</h1>
      </header>
      <h2>Find Current Weather Conditions</h2>
      <form class="main__form" onSubmit={getForecast}>
        <TextField
          id="outlined-basic"
          label="Enter City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Unit of Temperature</FormLabel>
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
        <Button
          className="btn-1"
          type="submit"
          variant="contained"
          // color="primary"
        >
          Get Forecast
        </Button>
        <Button variant="contained" color="primary" onClick={saveBookmark}>
          Bookmark City
        </Button>
        <Button variant="contained" color="secondary">
          <Link to="/bookmarks">View Bookmarks</Link>
        </Button>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Conditions
                responseObj={responseObj}
                error={error}
                loading={loading}
              />
            </Paper>
          </Grid>
          <Grid class="stubborn__grid">
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
      <footer className="App-footer">
        <p>Page created by James McCarron</p>
        <p>Copyright &copy; 2021 by Weather Down Under. All rights reserved.</p>
      </footer>
    </div>
  );
};
