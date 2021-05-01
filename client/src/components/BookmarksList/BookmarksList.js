import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

export const BookmarksList = () => {
  const [bookMarksList, setBookMarksList] = useState([]);
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);

  function getForecast(city) {
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

  useEffect(() => {
    fetch(`http://localhost:3000/api/bookmarks`, {
      method: "GET",
    })
      // after the data is received from the API (*asynchronous)
      .then((response) => response.json())
      .then((response) => {
        if (response.cod !== 200) {
          throw new Error();
        }
        setBookMarksList(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
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
      <header className="App-header">
        <h1>Weather Down Under</h1>
      </header>
      {bookMarksList.map((bookmark) => (
        <div>
          <div>{bookmark.city}</div>
          <div>{getForecast(bookmark.city)}</div>
        </div>
      ))}
      <footer>Page created by James McCarron</footer>
    </div>
  );
};
