import React from "react";
import "./App.css";
import Layout from "./component/Layout/Layout";
import Home from "./pages/Home/Home";
import { ContextProvider } from "./Context";

function App() {
  return (
    <ContextProvider>
      <Layout>
        <Home />
      </Layout>
    </ContextProvider>
  );
}

export default App;
