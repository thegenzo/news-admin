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

// import roles view index
const RolesIndex = lazy(() => import("../views/Roles/Index"));
const RolesCreate = lazy(() => import("../views/Roles/Create"));
const RolesEdit = lazy(() => import('../views/Roles/Edit'));

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

      {/* private route roles */}
      <Route
        path="/roles"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <RolesIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/* private route roles/create */}
      <Route
        path="/roles/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <RolesCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/* private route roles/edit/:id */}
      <Route
        path="/roles/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <RolesEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesIndex;
