import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import Lists from "./pages/lists";
import List from "./pages/list";
import Item from "./pages/Item";
import Items from "./pages/Items";
import Create from "./pages/Create";

const App: React.FC = () => {
  return (
    <div className="cursor-default select-none">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/items" element={<Items />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lists/:userid/:slug" element={<List />} />
          <Route path="/items/:userid/:slug" element={<Item />} />
          <Route path="/create" element={<Create />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
