import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <header className="App-header">
        <h1>Bookmarks</h1>
      </header>
      <ul>
        {bookMarks.map((el) => (
          <li key={el.id}>{el.city}</li>
        ))}
      </ul>
      <footer className="App-footer">
        <p>Page created by James McCarron</p>
        <p>Copyright &copy; 2021 by Weather Down Under. All rights reserved.</p>
      </footer>
    </div>
  );
};
