import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";

const axiosApiCall = (url, method, body = {}) =>
  axios({
    method,
    url: `${url}`,
    data: body,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });

const PlotResults = () => {
  const FetchPlot = async () => {
    const location = useLocation();
    const requestBody = location.state.state || location.state;
    let res = await axiosApiCall(
      `${process.env.REACT_APP_API_GTW}/api/gtw/v1/ms2/getNewImage`,
      "POST",
      requestBody
    );
    ReactDOM.render(
      <img src={`data:image/png;base64,${res.data}`} alt="Plot Results" />,
      document.getElementById("test")
    );
  };
  FetchPlot();
  return (
    <main>
      <Header />
      <Typography variant="h5">
        Please wait until the plot is generated......
      </Typography>
      <br></br>
      <div
        id="test"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      ></div>
    </main>
  );
};

export default PlotResults;
