import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorNotFound from "./Components/ErrorNotFound";
import Dashboard from "./pages/Dashboard";
import Layout from "./containers/Layout";

const App = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route path="*" element={<Navigate replace to="/dashboard" />} />

          <Route element={<ErrorNotFound />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default App;
