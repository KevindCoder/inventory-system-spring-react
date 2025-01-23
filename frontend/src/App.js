import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage"; // Import the login page component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} /> {/* Set LoginPage as the default route */}
            </Routes>
        </Router>
    );
}

export default App;
