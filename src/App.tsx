import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CandidatePage from "./pages/CandidatePage";
import UploadCSV from "./components/UploadCSV";

const App: React.FC = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/candidate" element={<CandidatePage />} />
                <Route path="/upload-csv" element={<UploadCSV />} />
            </Routes>
        </Router>
    );
};

export default App;
