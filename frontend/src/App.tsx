import React from "react";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/channels/:channelId" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
