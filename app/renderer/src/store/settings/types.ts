import { PayloadAction } from "@reduxjs/toolkit";

export type SettingTypes = {
  ignoreUpdate: string;
  alwaysOnTop: boolean;
  compactMode: boolean;
  enableFullscreenBreak: boolean;
  enableDarkTheme: boolean;
  enableStrictMode: boolean;
  enableProgressAnimation: boolean;
  enableVoiceAssistance: boolean;
  useNativeTitlebar: boolean;
  notificationSoundOn: boolean;
  closeToTray: boolean;
  minimizeToTray: boolean;
  autoStartWorkTime: boolean;
  notificationType: NotificationTypes;
  notificationSounds: NotificationSounds;
  openAtLogin: boolean;
};

export const enum NotificationSounds {
  DEFAULT = "default", // Windows sound....
  MULTI = "multi",
  CUSTOM = "custom",
}

export const enum NotificationTypes {
  NONE = "none",
  NORMAL = "normal",
  EXTRA = "extra",
}

export type SettingsPayload<T extends keyof SettingTypes> =
  PayloadAction<SettingTypes[T]>;
