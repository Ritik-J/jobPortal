import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import AppLayout from "./layout/AppLayout";
import HomePage from "./Pages/HomePage";
import OnboardingPage from "./Pages/OnboardingPage";
import JobListingPage from "./Pages/JobListingPage";
import JobPage from "./Pages/JobPage";
import PostJobPage from "./Pages/PostJobPage";
import SavedJobPage from "./Pages/SavedJobPage";
import MyJobsPage from "./Pages/MyJobsPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoutes>
            <OnboardingPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/jobs-listing",
        element: (
          <ProtectedRoutes>
            <JobListingPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/post-jobs",
        element: (
          <ProtectedRoutes>
            <PostJobPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoutes>
            <SavedJobPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
            <MyJobsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoutes>
            <JobPage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);
const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
