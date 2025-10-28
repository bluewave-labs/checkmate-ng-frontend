import type { ICheck } from "@/types/check";
export type MonitorStatus = "up" | "down" | "initializing";

export interface IMonitor {
  checks: ICheck[];
  createdAt: string;
  createdBy: string;
  interval: number;
  isActive: boolean;
  latestChecks: ICheck[];
  n: number;
  name: string;
  status: MonitorStatus;
  type: string;
  updatedAt: string;
  updatedBy: string;
  url: string;
  __v: number;
  _id: string;
}
