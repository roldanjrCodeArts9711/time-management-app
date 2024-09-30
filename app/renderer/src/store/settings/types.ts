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
  notificationSound: NotificationSounds;
  openAtLogin: boolean;
};

export const enum NotificationSounds {
  DEFAULT = "default", // Windows sound....
  TREASURE = "treasure", // https://pixabay.com/sound-effects/short-success-sound-glockenspiel-treasure-video-game-6346/
  TRUMPETS = "trumpets", //https://pixabay.com/sound-effects/success-fanfare-trumpets-6185/
  POMODORO = "pomodoro", // https://pixabay.com/sound-effects/tomato-squishwet-103934/
}

export const enum NotificationTypes {
  NONE = "none",
  NORMAL = "normal",
  EXTRA = "extra",
}

export type SettingsPayload<T extends keyof SettingTypes> =
  PayloadAction<SettingTypes[T]>;
