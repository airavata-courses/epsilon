import React from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@material-ui/core';
import map from "./radar.gif"

const Maphome = () => {
    return (
        <main>
            <Typography variant="h6" align="center" color="textPrimary" gutterBottom >
                Please select a Station by Clicking on the Map
            </Typography>
            <Box
                component="img"
                sx={{
                    padding: "25px 450px",
                    paddingTop: 15
                }}
                src={map}
            />
        </main>
    );
}

export default Maphome;