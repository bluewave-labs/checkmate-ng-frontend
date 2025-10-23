export interface INotificationChannelConfig {
  url?: string; // For webhook, slack, discord
  emailAddress?: string; // For email
}

export interface INotificationChannel {
  _id: string;
  orgId: string;
  teamId: string;
  name: string;
  type: string;
  config: INotificationChannelConfig;
  isActive: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
