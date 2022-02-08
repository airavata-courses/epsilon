import React from "react";
import Maphome from "./Maphome";
import PlotResults from "./PlotResults";
import DateTimeFilter from "./DateTimeFilter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./notfound";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/maphome" element={<Maphome />}></Route>
                <Route path="/datetimefilter" element={<DateTimeFilter />}></Route>
                <Route path="/plotresults" element={<PlotResults />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default App;