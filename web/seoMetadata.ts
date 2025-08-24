import { Metadata } from "next";
import { appDescription, appName } from "./env/STATIC_NAMES";

export const appMetadata: Record<string, Metadata> = {
  defaultMetadata: {
    title: appName,
    description: appDescription,
    applicationName: appName,
    keywords: ["managment system", "persona", "task manager", "calendar", "chat", "agent ai"]
  },
  dashboard: {
    title: "Dashboard - " + appName,
    description: "Dashboard page with summary",
    keywords: ["dashboard", "summary"]
  },
  organizer: {
    title: "Organizer - " + appName,
    description: "Unified view for tasks and calendar",
    keywords: ["organizer", "tasks", "calendar", "events", "planning"]
  },
  profile: {
    title: "Your profile - " + appName,
    description: "Your profile, add your details, experience, skills and create a new CV",
    keywords: ["CV", "profile", "experince", "stack", "work"]
  },
  finance: {
    title: "Finance - " + appName,
    description: "Manage your transactions, track your balance, and spend wisely",
    keywords: ["finance", "transactions", "economy"]
  },
  chat: {
    title: "Chat - " + appName,
    description: "Talk to other users and share your achievements",
    keywords: ["chat", "talk", "conversation"]
  },
  aiAgent: {
    title: "AI Agent - " + appName,
    description: "Ask your personal assistant and save yourself time searching for information",
    keywords: ["chat", "AI", "assistant"]
  },
}