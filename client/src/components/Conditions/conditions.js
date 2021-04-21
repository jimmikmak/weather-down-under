import React from "react";
// current temp -> city name -> conditions
const conditions = (props) => {
  return (
    <div>
      {props.responseObj.cod === 200 ? (
        <div>
          <p>
            <strong>{props.responseObj.name}</strong>
          </p>
          <p>
            It is currently {Math.round(props.responseObj.main.temp)} degrees
            with {props.responseObj.weather[0].description}.
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default conditions;
