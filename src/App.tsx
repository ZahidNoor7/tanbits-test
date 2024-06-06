import React from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import TodoAll from "./pages/TodoAll";
import GetStarted from "./pages/GetStarted";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<GetStarted />} path="/" />
        <Route element={<TodoAll />} path="/todo/all" />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
