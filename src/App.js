import React from "react";
import Maphome from "./Maphome";
import MaphomeNasa from "./MaphomeNasa";
import PlotResults from "./PlotResults";
import DateTimeFilter from "./DateTimeFilter";
import DateTimeFilterNasa from "./DateTimeFilterNasa";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import NotFound from "./notfound";
import Select from "./Select";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/select" element={<Select />}></Route>
                <Route path="/maphome" element={<Maphome />}></Route>
                <Route path="/maphomeNasa" element={<MaphomeNasa />}></Route>
                <Route path="/datetimefilter" element={<DateTimeFilter />}></Route>
                <Route path="/datetimefilterNasa" element={<DateTimeFilterNasa />}></Route>
                <Route path="/plotresults" element={<PlotResults />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default App;