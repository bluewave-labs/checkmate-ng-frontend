import { Routes, Route, Navigate } from "react-router";
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
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Navigate to="/uptime" replace />} />
        <Route
          path="uptime"
          element={
            <ProtectedRoute>
              <UptimeMonitorsPage />
            </ProtectedRoute>
          }
        />
        <Route path="uptime/:id" element={<UptimeDetailsPage />} />
        <Route path="uptime/create" element={<UptimeCreatePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
