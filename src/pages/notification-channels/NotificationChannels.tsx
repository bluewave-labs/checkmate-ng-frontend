import { HeaderCreate } from "@/components/notification-channels/HeaderCreate";
import Typography from "@mui/material/Typography";
import { BasePageWithStates } from "@/components/design-elements";
import { Table } from "@/components/design-elements";
import { ActionsMenu } from "@/components/actions-menu";

import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router";
import type { ActionMenuItem } from "@/components/actions-menu";
import type { Header } from "@/components/design-elements/Table";
import type { INotificationChannel } from "@/types/notification-channel";
import { useGet } from "@/hooks/UseApi";
import type { ApiResponse } from "@/hooks/UseApi";
import { useTranslation } from "react-i18next";

const GLOBAL_REFRESH = import.meta.env.VITE_APP_GLOBAL_REFRESH;

const NotificationChannelsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();

  const { response, isValidating, error } = useGet<ApiResponse>(
    "/notification-channels",
    {},
    { refreshInterval: GLOBAL_REFRESH }
  );

  const notificationChannels = response?.data || [];

  const getActions = (channel: INotificationChannel): ActionMenuItem[] => {
    return [
      {
        id: 1,
        label: "Configure",
        action: () => {},
        closeMenu: true,
      },
      {
        id: 2,
        label: channel.isActive ? "Disable" : "Enable",
        action: () => {},
      },
      {
        id: 7,
        label: <Typography color={theme.palette.error.main}>Remove</Typography>,
        action: () => {},
        closeMenu: true,
      },
    ];
  };

  const getHeaders = () => {
    const headers: Header<INotificationChannel>[] = [
      {
        id: "name",
        content: "Name",
        render: (row) => {
          return <Typography>{row?.name}</Typography>;
        },
      },
      {
        id: "active",
        content: "Active",
        render: (row) => {
          const active = row.isActive ? "Yes" : "No";
          return <Typography>{active}</Typography>;
        },
      },
      {
        id: "type",
        content: "Type",
        render: (row) => {
          return (
            <Typography textTransform={"capitalize"}>{row?.type}</Typography>
          );
        },
      },
      {
        id: "actions",
        content: t("actions"),
        render: (row) => {
          return <ActionsMenu items={getActions(row)} />;
        },
      },
    ];
    return headers;
  };

  const headers = getHeaders();

  return (
    <BasePageWithStates
      page="Notification Channels"
      bullets={
        t("notifications.fallback.checks", { returnObjects: true }) as string[]
      }
      loading={isValidating}
      error={error}
      items={notificationChannels}
      actionButtonText="Create a new notification channel"
      actionLink="/notification-channels/create"
    >
      <HeaderCreate
        label={"Create a new notification channel"}
        isLoading={isValidating}
        path="/notification-channels/create"
      />
      <Table headers={headers} data={notificationChannels} />
    </BasePageWithStates>
  );
};

export default NotificationChannelsPage;
