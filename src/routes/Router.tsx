import { Routes, Route } from "react-router";
import AuthLogin from "@/pages/auth/Login";
import AuthRegister from "@/pages/auth/Register";
import UptimeMonitorsPage from "@/pages/uptime/UptimeMonitors";
import UptimeCreatePage from "@/pages/uptime/Create";
import UptimeDetailsPage from "@/pages/uptime/Details";
import RootLayout from "@/components/layouts/RootLayout";
import { ProtectedRoute } from "@/components/protected-route";

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<AuthLogin />} />
      <Route path="register" element={<AuthRegister />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <RootLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UptimeMonitorsPage />} />
        <Route path="uptime" element={<UptimeMonitorsPage />} />
        <Route path="uptime/:id" element={<UptimeDetailsPage />} />
        <Route path="uptime/create" element={<UptimeCreatePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
