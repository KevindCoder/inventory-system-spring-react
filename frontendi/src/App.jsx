import React from "react";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./components/LoginPage"; // Adjust path as necessary

const App = () => {
  return (
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
};

export default App;
