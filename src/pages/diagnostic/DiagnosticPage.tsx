import { BasePage, Tab, Tabs } from "@/components/design-elements";
import { DiagnosticsLogTab } from "@/pages/diagnostic/DiagnosticsLogTab";
import { DiagnosticsQueueTab } from "@/pages/diagnostic/DiagnosticsQueueTab";
import { useState } from "react";

const DiagnosticPage = () => {
  const [tabValue, setTabValue] = useState("logs");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <BasePage>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Logs" value="logs" />
        <Tab label="Jobs" value="jobs" />
      </Tabs>
      {tabValue === "logs" && <DiagnosticsLogTab />}
      {tabValue === "jobs" && <DiagnosticsQueueTab />}
    </BasePage>
  );
};

export default DiagnosticPage;
