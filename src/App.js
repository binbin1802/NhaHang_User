import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./components/Home";
import Restaurant from "./components/Restaurant";
import BookRestaurant from "./components/BookRestaurant";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/restaurant">Restaurant</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/restaurant/:id" element={<Restaurant />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/book-restaurant/:id" element={<BookRestaurant />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}