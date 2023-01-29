import React, { lazy, Suspense } from "react";
import "./App.css";
import Layout from "./component/Layout/Layout";
import { RoutingAppContextProvider } from "./context/RoutingAppContext";
import { Route, Routes } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";

const Home = lazy(() => import("./pages/RoutingApp/RoutingApp"));
const Loader = lazy(() => import("./component/Loader/Loader"));

function App() {
  return (
    <GlobalContextProvider>
      <Layout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Loader />} />
            <Route
              path="/routing-app"
              caseSensitive
              element={
                <RoutingAppContextProvider>
                  <Home />
                </RoutingAppContextProvider>
              }
            ></Route>
          </Routes>
        </Suspense>
      </Layout>
    </GlobalContextProvider>
  );
}

export default App;
