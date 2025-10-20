import { Routes, Route } from "react-router";
import AuthLogin from "@/pages/auth/Login";
import AuthRegister from "@/pages/auth/Register";
import UptimeMonitorsPage from "@/pages/uptime/UptimeMonitors";
import UptimeCreatePage from "@/pages/uptime/Create";
import UptimeDetailsPage from "@/pages/uptime/Details";
import UptimeConfigurePage from "@/pages/uptime/UptimeConfigure";
import SettingsPage from "@/pages/settings/Settings";
import TeamsPage from "@/pages/teams/Teams";
import TeamsCreatePage from "@/pages/teams/TeamsCreate";
import TeamsConfigPage from "@/pages/teams/TeamsConfig";
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
        <Route path="uptime/:id/configure" element={<UptimeConfigurePage />} />
        <Route path="uptime/create" element={<UptimeCreatePage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="teams/create" element={<TeamsCreatePage />} />
        <Route path="teams/:id/configure" element={<TeamsConfigPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
