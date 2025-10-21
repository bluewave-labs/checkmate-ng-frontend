import { Routes, Route } from "react-router";
import AuthLogin from "@/pages/auth/Login";
import AuthRegister from "@/pages/auth/Register";
import UptimeMonitorsPage from "@/pages/uptime/UptimeMonitors";
import UptimeCreatePage from "@/pages/uptime/Create";
import UptimeDetailsPage from "@/pages/uptime/UptimeDetails";
import UptimeConfigurePage from "@/pages/uptime/UptimeConfigure";
import SettingsPage from "@/pages/settings/Settings";
import TeamsPage from "@/pages/teams/Teams";
import TeamsCreatePage from "@/pages/teams/TeamsCreate";
import TeamsConfigPage from "@/pages/teams/TeamsConfig";
import TeamDetailsPage from "@/pages/teams/TeamDetails";
import TeamMemberConfigPage from "@/pages/teams/TeamMemberConfig";
import TeamMemberCreatePage from "@/pages/teams/TeamMemberCreate";
import InvitePage from "@/pages/auth/Invite";
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
        <Route path="uptime/create" element={<UptimeCreatePage />} />
        <Route path="uptime/:id/configure" element={<UptimeConfigurePage />} />
        <Route path="uptime/:id" element={<UptimeDetailsPage />} />
        <Route path="uptime" element={<UptimeMonitorsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="teams/create" element={<TeamsCreatePage />} />
        <Route path="teams/:id/configure" element={<TeamsConfigPage />} />
        <Route path="teams/:id" element={<TeamDetailsPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route
          path="team-members/:id/create"
          element={<TeamMemberCreatePage />}
        />
        <Route
          path="team-members/:id/configure"
          element={<TeamMemberConfigPage />}
        />
        <Route path="invite" element={<InvitePage />} />
      </Route>
    </Routes>
  );
};

export default Router;
