import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

export const BookmarksList = () => {
  const [bookMarks, setBookMarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/bookmarks", {
      headers: {
        "Content-Type": "application/json",
        token: window.localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setBookMarks(data));
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <header className="App-header">
        <h1>Bookmarks</h1>
      </header>
      <div className={classes.root}>
        <Grid item xs={12} md={6}>
          <div className={classes.demo}>
            <List>
              {bookMarks.map((el) => (
                <ListItem key={el.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={el.city} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </div>
      <footer className="App-footer">
        <p>Page created by James McCarron</p>
        <p>Copyright &copy; 2021 by Weather Down Under. All rights reserved.</p>
      </footer>
    </div>
  );
};
