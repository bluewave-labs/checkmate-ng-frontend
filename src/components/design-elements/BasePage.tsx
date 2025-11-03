import Stack from "@mui/material/Stack";
import { ErrorFallback, EmptyFallback, EmptyMonitorFallback } from "./Fallback";

import type { StackProps } from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
interface BasePageProps extends StackProps {
  children: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme();
  return (
    <Stack spacing={theme.spacing(10)} {...props}>
      {children}
    </Stack>
  );
};

interface BasePageWithStatesProps extends StackProps {
  loading: boolean;
  error: any;
  items: any[];
  bullets: string[] | unknown;

  page: string;
  actionButtonText: string;
  actionLink: string;
  children: React.ReactNode;
}

export const BasePageWithStates: React.FC<BasePageWithStatesProps> = ({
  loading,
  error,
  items,
  page,
  bullets,
  actionButtonText,
  actionLink,
  children,
  ...props
}: BasePageWithStatesProps) => {
  const showLoading = loading && (!items || items.length === 0);

  if (showLoading) {
    return null;
  }

  if (error) {
    return (
      <ErrorFallback
        title="Something went wrong..."
        subtitle="Please try again later"
      />
    );
  }

  if (isEmpty(items)) {
    return (
      <EmptyFallback
        bullets={bullets}
        title={page}
        actionButtonText={actionButtonText}
        actionLink={actionLink}
      />
    );
  }

  return <BasePage {...props}>{children}</BasePage>;
};

interface MonitorBasePageWithStatesProps extends StackProps {
  loading: boolean;
  error: any;
  items: any[];
  page: string;
  actionLink?: string;
  children: React.ReactNode;
}

const isEmpty = (items: any[]) => {
  if (!items) return true;
  if (Array.isArray(items) && items.length === 0) return true;
  return false;
};

export const MonitorBasePageWithStates: React.FC<
  MonitorBasePageWithStatesProps
> = ({
  loading,
  error,
  items,
  page,
  actionLink,
  children,
  ...props
}: MonitorBasePageWithStatesProps) => {
  const { t } = useTranslation();

  const showLoading = loading && (!items || items.length === 0);

  if (showLoading) {
    return null;
  }

  if (error) {
    return (
      <ErrorFallback
        title="Something went wrong..."
        subtitle="Please try again later"
      />
    );
  }

  if (isEmpty(items)) {
    return (
      <EmptyMonitorFallback
        page={page}
        title={t(`${page}Monitor.fallback.title`)}
        bullets={t(`${page}Monitor.fallback.checks`, { returnObjects: true })}
        actionButtonText={t(`${page}Monitor.fallback.actionButton`)}
        actionLink={actionLink || ""}
      />
    );
  }

  return <BasePage {...props}>{children}</BasePage>;
};
