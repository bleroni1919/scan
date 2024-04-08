
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Scanner from "./Scanner";
import VisitorInput from "./VisitorInput";
import Insurance from "./Insurance";
import Submit from "./Submit"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/visitorinput/:result" element={<VisitorInput />} />
        <Route path="/insurance" element={<Insurance />} /> 
        <Route path="/submit" element={<Submit />} /> 
      </Routes>
    </Router>
  );
}

export default App;
