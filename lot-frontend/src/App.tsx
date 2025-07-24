import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Login from "./pages/login";
import Lists from "./pages/lists";
import Items from "./pages/Items";
import Create from "./pages/Create";
import Tags from "./pages/tags";
import Listpage from "./pages/list";
import Tagpage from "./pages/tag";
import Itempage from "./pages/Item";

const App: React.FC = () => {
  return (
    <div className="cursor-default select-none">
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/items" element={<Items />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lists/:userid/:slug" element={<Listpage />} />
          <Route path="/items/:userid/:slug" element={<Itempage />} />
          <Route path="/tags/:userid/:slug" element={<Tagpage />} />
          <Route path="/create" element={<Create />} />

          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
