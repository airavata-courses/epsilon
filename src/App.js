import React from "react";
import Maphome from "./Maphome";
import PlotResults from "./PlotResults";
import PlotResultsNasa from "./PlotResultsNasa";
import DateTimeFilter from "./DateTimeFilter";
import DateTimeFilterNasa from "./DateTimeFilterNasa";
import Nasahistory from "./Nasahistory";
import Nexradhistory from "./Nexradhistory";
import Error from "./error";
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
        <Route path="/nasahistory" element={<Nasahistory />}></Route>
        <Route path="/nexradhistory" element={<Nexradhistory />}></Route>
        <Route path="/datetimefilter" element={<DateTimeFilter />}></Route>
        <Route
          path="/datetimefilterNasa"
          element={<DateTimeFilterNasa />}
        ></Route>
        <Route path="/plotresults" element={<PlotResults />}></Route>
        <Route path="/plotresultsNasa" element={<PlotResultsNasa />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
