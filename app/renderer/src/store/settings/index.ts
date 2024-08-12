import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "utils";
import { defaultSettings } from "./defaultSettings";
import { SettingTypes, SettingsPayload } from "./types";

export type { SettingTypes };

const settings =
  (getFromStorage("state") && getFromStorage("state").settings) ||
  defaultSettings;

const initialState: SettingTypes = settings;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIgnoreUpdate(state, action: SettingsPayload<"ignoreUpdate">) {
      state.ignoreUpdate = action.payload;
    },

    setAlwaysOnTop(state, action: SettingsPayload<"alwaysOnTop">) {
      state.alwaysOnTop = action.payload;
    },

    toggleNotificationSounds(state) {
      state.notificationSoundOn = !state.notificationSoundOn;
    },

    setEnableDarkTheme(
      state,
      action: SettingsPayload<"enableDarkTheme">
    ) {
      state.enableDarkTheme = action.payload;
    },

    setEnableCompactMode(
      state,
      action: SettingsPayload<"compactMode">
    ) {
      state.compactMode = action.payload;
    },

    setEnableFullscreenBreak(
      state,
      action: SettingsPayload<"enableFullscreenBreak">
    ) {
      state.enableFullscreenBreak = action.payload;
    },

    setEnableStrictMode(
      state,
      action: SettingsPayload<"enableStrictMode">
    ) {
      state.enableStrictMode = action.payload;
    },

    setEnableProgressAnimation(
      state,
      action: SettingsPayload<"enableProgressAnimation">
    ) {
      state.enableProgressAnimation = action.payload;
    },

    setEnableVoiceAssistance(
      state,
      action: SettingsPayload<"enableVoiceAssistance">
    ) {
      state.enableVoiceAssistance = action.payload;
    },

    setUseNativeTitlebar(
      state,
      action: SettingsPayload<"useNativeTitlebar">
    ) {
      state.useNativeTitlebar = action.payload;
    },

    setNotificationType(
      state,
      action: SettingsPayload<"notificationType">
    ) {
      state.notificationType = action.payload;
    },

    setNotificationSounds(
      state,
      action: SettingsPayload<"notificationSounds">
    ) {
      state.notificationSounds = action.payload;
    },

    setCloseToTray(state, action: SettingsPayload<"closeToTray">) {
      state.closeToTray = action.payload;
    },

    setMinimizeToTray(
      state,
      action: SettingsPayload<"minimizeToTray">
    ) {
      state.minimizeToTray = action.payload;
    },

    setAutoStartWorkTime(
      state,
      action: SettingsPayload<"autoStartWorkTime">
    ) {
      state.autoStartWorkTime = action.payload;
    },

    setOpenAtLogin(state, action: SettingsPayload<"openAtLogin">) {
      state.openAtLogin = action.payload;
    },

    restoreDefaultSettings() {
      return defaultSettings;
    },
  },
});

export const {
  restoreDefaultSettings,
  setAlwaysOnTop,
  setAutoStartWorkTime,
  setCloseToTray,
  setEnableCompactMode,
  setEnableDarkTheme,
  setEnableFullscreenBreak,
  setEnableProgressAnimation,
  setEnableStrictMode,
  setEnableVoiceAssistance,
  setIgnoreUpdate,
  setMinimizeToTray,
  setNotificationType,
  setNotificationSounds,
  setOpenAtLogin,
  setUseNativeTitlebar,
  toggleNotificationSounds,
} = settingsSlice.actions;

export default settingsSlice.reducer;
