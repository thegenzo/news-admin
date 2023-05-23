// import react
import React, { Suspense, lazy } from "react";
// import react-router-dom
import { Routes, Route } from "react-router-dom";
// private routes
import PrivateRoutes from "./PrivateRoutes";
// dashboard views
import Dashboard from "../views/Dashboard/Index";
// import loader component
const Loader = lazy(() => import("../components/Loader"));
// import view login
const Login = lazy(() => import("../views/Auth/Login"));
// import permission view index
const PermissionIndex = lazy(() => import("../views/Permissions/Index"));

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

      {/* private route dashboard */}
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/* private route permissions */}
      <Route
        path="/permissions"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <PermissionIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesIndex;
