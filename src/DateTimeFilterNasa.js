import React from "react";
import { Typography, Box, CssBaseline, Container } from '@material-ui/core';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

const DateTimeFilter = () => {

    const [startDatevalue, setStartDateValue] = React.useState(null);
    const [endDatevalue, setEndDateValue] = React.useState(null);
    const search = useLocation().search;
    const stid = search ? new URLSearchParams(search).get('id') : "";
    const navigate = useNavigate();

    {/* const RequestImageData = () => {
        const generateRequestImageRequest = {

            "year": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[2],
            "month": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[0],
            "day": document.getElementById("dateTimePicker").value.split(" ")[0].split("/")[1],
            "station": document.getElementById("stationSelectedSelect").innerHTML,
            "time": document.getElementById("dateTimePicker").value.split(" ")[1]
        }
        navigate("../plotresults", { state: generateRequestImageRequest });
    };
*/}

    const RequestImageData = () => {
        const generateRequestImageRequest = {
            // Start Date
            "startDate": document.getElementById("startDateId").value.split(" ")[0].split("/")[2] + "-" +
                document.getElementById("startDateId").value.split(" ")[0].split("/")[0] + "-" +
                document.getElementById("startDateId").value.split(" ")[0].split("/")[1],

            // End Date
            "endDate": document.getElementById("endDateId").value.split(" ")[0].split("/")[2] + "-" +
                document.getElementById("endDateId").value.split(" ")[0].split("/")[0] + "-" +
                document.getElementById("endDateId").value.split(" ")[0].split("/")[1],
        }

        if(startDatevalue === null || endDatevalue === null)
        {
            alert('Start Date and End Date cannot be empty');
        }

        else if(Math.abs(startDatevalue) > Math.abs(endDatevalue))
        {
            alert('Start Date should be less than End Date');
        }
        else
        {
            let differenceOfDays = (startDatevalue - endDatevalue) / ((1000 * 3600 * 24));
            differenceOfDays = Math.floor(Math.abs(differenceOfDays));
    
            if (differenceOfDays === 1 || differenceOfDays === 0 || differenceOfDays === -1) {
                navigate("../plotresultsNasa", { state: generateRequestImageRequest });
            }
            else 
            {
                alert('The difference between start and end date should not be greater than 2 days')
            } 
        }
    };

    return (
        <>
            <Header />
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="md" >
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 23,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: 4,
                        }}
                    >
                        <Typography sx={{ mt: 2, mb: 2 }} variant="h5" align="center" color="textPrimary" gutterBottom >
                            Please select Start and End Date
                        </Typography>

                        {/* <FormControl style={{ minWidth: 230 }}>
                            <InputLabel sx={{ marginTop: 2 }}>
                                Select Station
                            </InputLabel>
                            <Select
                                id="stationSelectedSelect"
                                defaultValue={stid.toUpperCase()}
                                sx={{
                                    marginTop: 3,
                                    marginBottom: 2
                                }}

                            >
                                {constants["station_names"].map(item => (
                                    <MenuItem key={item} value={item}>{item}</MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}

                        {/*Start Date*/}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Enter Start Date"
                                value={startDatevalue}
                                onChange={(newValue) => {
                                    setStartDateValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} id='startDateId' />}
                            />
                        </LocalizationProvider>

                        {/*End Date*/}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Enter End Date"
                                value={endDatevalue}
                                onChange={(newValue) => {
                                    setEndDateValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} id='endDateId' />}
                            />
                        </LocalizationProvider>

                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Button
                                id='generatePlotButton'
                                style={{ marginTop: '10px', background: '#990000' }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => RequestImageData()}
                            >
                                Generate Plot
                            </Button>
                        </Box>
                        <Box component="form" noValidate sx={{ mt: 1 }}>
                            <Button
                                id='generatePlotButton'
                                style={{ marginTop: '10px', background: '#990000' }}
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => navigate("../nasahistory")}
                            >
                                User History (Nasa)
                            </Button>
                        </Box>
                    </Box>
                </Container >
            </ThemeProvider >
        </>
    );

}

export default DateTimeFilter;