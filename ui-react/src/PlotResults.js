import React from "react";
import { Box, CssBaseline, Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import plot from "./testPlot.png"
import Header from "./Header";

const theme = createTheme();

const PlotResults = () => {
    return (
        <main>
            <Header />
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