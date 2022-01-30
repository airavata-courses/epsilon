import React from "react";
import { Typography, Box, CssBaseline, Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import plot from "./testPlot.png"

const theme = createTheme();

const PlotResults = () => {
    return (
        <main>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="lg" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: 4
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                paddingLeft: 8
                            }}
                            src={plot}
                        />
                    </Box>
                </Container>
            </ThemeProvider>
        </main>
    );
}

export default PlotResults;