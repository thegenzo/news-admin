// import react
import React, { Suspense, lazy } from "react";

// import react-router-dom
import { Routes, Route } from "react-router-dom";

// import loader component
const Loader = lazy(() => import("../components/Loader"));

// import view login
const Login = lazy(() => import("../views/Auth/Login"));

const RoutesIndex = () => {
  return (
    <Routes>
      {/* route "/" */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesIndex;
