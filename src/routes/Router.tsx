import { Routes, Route } from "react-router";

import AuthLogin from "@/pages/auth/Login";
import AuthRegister from "@/pages/auth/Register";
// import UptimeMonitorsPage from "@/Pages/v2/Uptime/UptimeMonitors";
// import UptimeCreatePage from "@/Pages/v2/Uptime/Create";
// import UptimeDetailsPage from "@/Pages/v2/Uptime/Details";
// import RootLayout from "@/Components/v2/Layouts/RootLayout";

const Router = () => {
  return (
    <Routes>
      <Route path="login" element={<AuthLogin />} />
      <Route path="register" element={<AuthRegister />} />
      {/* <Route path="/" element={<RootLayout />}>
          <Route index element={<UptimeMonitorsPage />} />
          <Route path="uptime" element={<UptimeMonitorsPage />} />
          <Route path="uptime/:id" element={<UptimeDetailsPage />} />
          <Route path="uptime/create" element={<UptimeCreatePage />} />
        </Route> */}
    </Routes>
  );
};

export default Router;
