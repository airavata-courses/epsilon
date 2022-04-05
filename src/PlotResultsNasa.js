import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

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

const delay = ms => new Promise(res => setTimeout(res, ms));

const PlotResults = () => {
    const navigate = useNavigate();

    const FetchPlot = async () => {
        const location = useLocation();
        const requestBody = location.state.state || location.state;
        let res = await axiosApiCall(
            `${process.env.REACT_APP_API_GTW}/api/gtw/v1/ms3/createImageNasa/`,
            "POST",
            requestBody
        );

        let uid = res["data"]["data"]["UniqueID"]
        let flag = true

        while (flag) {
            let resPolling = await axiosApiCall(
                `${process.env.REACT_APP_API_GTW}/api/gtw/v1/ms3/getImageNasa/`,
                "POST",
                { "UID": uid }
            );

            if (resPolling["data"]["data"]["Action"] === "Wait") {
                await delay(10000);
            }
            else if (resPolling["data"]["data"]["Action"] === "Display") {
                flag = false;
                document.getElementById("textMsg").style.display = "none";
                ReactDOM.render(
                    <img src={`data:image/png;base64,${resPolling["data"]["data"]["File"]}`} alt="Plot Results" />,
                    document.getElementById("test")
                );
            }
            else if (resPolling["data"]["data"]["Action"] === "Error") {
                flag = false;
                navigate("../error");
            }
            else {
                flag = false;
                navigate("../error");
            }
        }
    };

    FetchPlot();

    return (
        <main>
            <Header />
            <Typography variant="h5" id="textMsg">
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
