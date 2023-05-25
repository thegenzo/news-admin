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

// import roles view
const RolesIndex = lazy(() => import("../views/Roles/Index"));
const RolesCreate = lazy(() => import("../views/Roles/Create"));
const RolesEdit = lazy(() => import('../views/Roles/Edit'));

// import users view
const UsersIndex = lazy(() => import("../views/Users/Index"));
const UsersCreate = lazy(() => import("../views/Users/Create"));
const UsersEdit = lazy(() => import("../views/Users/Edit"));

// import categories view
const CategoriesIndex = lazy(() => import("../views/Categories/Index"));
const CategoriesCreate = lazy(() => import("../views/Categories/Create"));
const CategoriesEdit = lazy(() => import("../views/Categories/Edit"));

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

      {/** private route users */}
      <Route
        path="/users"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/** private route users/create */}
      <Route
        path="/users/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/** private route users/create */}
      <Route
        path="/users/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <UsersEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />

      {/** private route categories */}
      <Route 
        path="/categories"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesIndex />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/** private route categories/create */}
      <Route 
        path="/categories/create"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesCreate />
            </PrivateRoutes>
          </Suspense>
        }
      />
      {/** private route categories/create */}
      <Route 
        path="/categories/edit/:id"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoutes>
              <CategoriesEdit />
            </PrivateRoutes>
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesIndex;
