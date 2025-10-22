import { z } from "zod";
import humanInterval from "human-interval";

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

const urlRegex =
  /^(?:https?:\/\/)?([a-zA-Z0-9.-]+|\d{1,3}(\.\d{1,3}){3}|\[[0-9a-fA-F:]+\])(:\d{1,5})?$/;

const durationSchema = z
  .string()
  .optional()
  .superRefine((val, ctx) => {
    if (!val || val.trim() === "") return;
    const ms = humanInterval(val);

    if (!ms || isNaN(ms)) {
      ctx.addIssue({
        code: "custom",
        message: "Invalid duration format",
      });
    } else if (ms < 10000) {
      ctx.addIssue({
        code: "custom",
        message: "Minimum duration is 10 seconds",
      });
    }
  });

export const monitorSchema = z.object({
  type: z.string().min(1, "You must select an option"),
  url: z.string().min(1, "URL is required").regex(urlRegex, "Invalid URL"),
  n: z.coerce
    .number({ message: "Number required" })
    .min(1, "Minimum value is 1")
    .max(25, "Maximum value is 25"),
  notificationChannels: z.array(z.string()).optional().default([]),
  name: z.string().min(1, "Display name is required"),
  interval: durationSchema,
});

export const teamSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  roleId: z.string().min(1, "Role is required"),
  description: z.string().optional(),
});

export const teamMemberSchema = z.object({
  userId: z.string().min(1, "User is required"),
  roleId: z.string().min(1, "Role is required"),
  teamId: z.string().min(1, "Team is required"),
});

export const inviteSchema = z.object({
  email: z.email("Invalid email address"),
  teamId: z.string().min(1, "Team is required"),
  teamRoleId: z.string().min(1, "Role is required"),
  orgRoleId: z.string().optional(),
});
