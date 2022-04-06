import React, { Component } from "react";
import {
  Typography,
  Box,
  CssBaseline,
  Container,
  Button,
} from "@material-ui/core";
import map from "./radar.gif";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import { Link } from "react-router-dom";
import Header from "./Header";
import HeaderBack from "./HeaderBack";
import axios from "axios";

const theme = createTheme();

class Nexradhistory extends Component {
  constructor() {
    super();
    this.state = {
      userHistory: [],
      DataisLoaded: true,
    };
    this.FetchHistory = this.FetchHistory.bind(this);
  }

  componentDidMount() {
    this.FetchHistory();
    console.log(this);
  }

  async FetchHistory() {
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
    try {
      let res = await axiosApiCall(
        `${process.env.REACT_APP_API_GTW}/api/gtw/v1/ms2/getUserHistory/NEXRAD`,
        "GET"
      );
      this.setState({ userHistory: res.data.data, DataisLoaded: true });
    } catch (err) {
      console.log("In Error");
    }
  }

  render() {
    const { DataisLoaded, userHistory } = this.state;
    function renderRow(props) {
      const { index, style } = props;
      return (
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton sx={{ boxShadow: 1 }}>
            <Link
              to="/plotresults"
              state={{ state: userHistory[index].value }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItemText primary={userHistory[index].key} />
            </Link>
          </ListItemButton>
        </ListItem>
      );
    }
    if (DataisLoaded)
      return (
        <>
          <main>
            <Header />
            <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="md">
                <CssBaseline />
                <div style={{ display: "flex" }}></div>
                <Box
                  sx={{
                    marginTop: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxShadow: 4,
                  }}
                >
                  <Typography
                    sx={{ mt: 2 }}
                    variant="h5"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                  >
                    User History Nexrad
                  </Typography>

                  <Box sx={{ bgcolor: "background.paper", boxShadow: 4 }}>
                    <FixedSizeList
                      height={400}
                      width={750}
                      itemSize={46}
                      itemCount={userHistory.length}
                      overscanCount={5}
                    >
                      {renderRow}
                    </FixedSizeList>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </main>
        </>
      );
  }
}

export default Nexradhistory;
