import { Collapse, Radio, Toggler, TogglerProps } from "components";
import { ThemeContext } from "contexts";
import { useAppDispatch, useAppSelector } from "hooks/storeHooks";
import React, { useCallback, useContext } from "react";
import {
  setAlwaysOnTop,
  setAutoStartWorkTime,
  setCloseToTray,
  setEnableCompactMode,
  setEnableFullscreenBreak,
  setEnableProgressAnimation,
  setEnableStrictMode,
  setEnableVoiceAssistance,
  setMinimizeToTray,
  setNotificationSounds,
  setNotificationType,
  setOpenAtLogin,
  setUseNativeTitlebar,
} from "store";

import {
  NotificationSounds,
  NotificationTypes,
} from "store/settings/types";
import { detectOS } from "utils";
import SettingSection from "./SettingSection";
import NotificationSoundsSetting from "./notficationSounds/NotificationSoundsSetting";

const FeatureSection: React.FC = () => {
  const settings = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();

  const { isDarkMode, toggleThemeAction } = useContext(ThemeContext);

  const featureList: TogglerProps[] = [
    {
      id: "always-on-top",
      label: "Always On Top",
      checked: settings.alwaysOnTop,
      onChange: useCallback(() => {
        dispatch(setAlwaysOnTop(!settings.alwaysOnTop));
      }, [dispatch, settings.alwaysOnTop]),
    },
    {
      id: "compact-mode",
      label: "Compact Mode",
      checked: settings.compactMode,
      onChange: useCallback(() => {
        dispatch(setEnableCompactMode(!settings.compactMode));
      }, [dispatch, settings.compactMode]),
    },
    {
      id: "fullscreen-break",
      label: "Fullscreen Break",
      checked: settings.enableFullscreenBreak,
      onChange: useCallback(() => {
        dispatch(
          setEnableFullscreenBreak(!settings.enableFullscreenBreak)
        );
      }, [dispatch, settings.enableFullscreenBreak]),
    },
    {
      id: "strict-mode",
      label: "Strict Mode",
      checked: settings.enableStrictMode,
      onChange: useCallback(() => {
        dispatch(setEnableStrictMode(!settings.enableStrictMode));
      }, [dispatch, settings.enableStrictMode]),
    },
    {
      id: "dark-theme",
      label: "Dark Theme",
      checked: isDarkMode,
      onChange: () => {
        if (toggleThemeAction) {
          toggleThemeAction();
        }
      },
    },
    {
      id: "native-titlebar",
      label: "Native Titlebar",
      checked: settings.useNativeTitlebar,
      onChange: useCallback(() => {
        dispatch(setUseNativeTitlebar(!settings.useNativeTitlebar));
      }, [dispatch, settings.useNativeTitlebar]),
    },
    {
      id: "progress-animation",
      label: "Progress Animation",
      checked: settings.enableProgressAnimation,
      onChange: useCallback(() => {
        dispatch(
          setEnableProgressAnimation(!settings.enableProgressAnimation)
        );
      }, [dispatch, settings.enableProgressAnimation]),
    },
    {
      id: "auto-start-work-time",
      label: "Auto-start Work Time",
      checked: settings.autoStartWorkTime,
      onChange: useCallback(() => {
        dispatch(setAutoStartWorkTime(!settings.autoStartWorkTime));
      }, [dispatch, settings.autoStartWorkTime]),
    },
    {
      id: "minimize-to-tray",
      label: "Minimize To Tray",
      checked: settings.minimizeToTray,
      onChange: useCallback(() => {
        dispatch(setMinimizeToTray(!settings.minimizeToTray));
      }, [dispatch, settings.minimizeToTray]),
    },
    {
      id: "close-to-tray",
      label: "Close To Tray",
      checked: settings.closeToTray,
      onChange: useCallback(() => {
        dispatch(setCloseToTray(!settings.closeToTray));
      }, [dispatch, settings.closeToTray]),
    },
    {
      id: "voice-assistance",
      label: "Voice Assistance",
      checked: settings.enableVoiceAssistance,
      onChange: useCallback(() => {
        dispatch(
          setEnableVoiceAssistance(!settings.enableVoiceAssistance)
        );
      }, [dispatch, settings.enableVoiceAssistance]),
    },
    {
      id: "open-at-login",
      label: "Open At Login",
      checked: settings.openAtLogin,
      onChange: useCallback(() => {
        dispatch(setOpenAtLogin(!settings.openAtLogin));
      }, [dispatch, settings.openAtLogin]),
      style: {
        ...(detectOS() === "Linux" && {
          display: "none",
        }),
      },
    },
  ];

  const onChangeNotificationProps = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setNotificationType(e.target.value as NotificationTypes)
      );
    },
    [dispatch]
  );

  const onChangeNotificationSound = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        setNotificationSounds(e.target.value as NotificationSounds)
      );
    },
    [dispatch]
  );

  return (
    <SettingSection heading="App Features">
      {featureList.map(
        ({ id, label, checked, onChange, ...rest }, index) => (
          <Toggler
            id={id}
            key={index}
            label={label}
            checked={checked}
            onChange={onChange}
            {...rest}
          />
        )
      )}
      <Collapse title="Notification Types">
        <Radio
          id="none"
          label="none"
          name="notification"
          value={NotificationTypes.NONE}
          checked={settings.notificationType === NotificationTypes.NONE}
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="normal"
          label="normal"
          name="notification"
          value={NotificationTypes.NORMAL}
          checked={
            settings.notificationType === NotificationTypes.NORMAL
          }
          onChange={onChangeNotificationProps}
        />
        <Radio
          id="extra"
          label="extra"
          name="notification"
          value={NotificationTypes.EXTRA}
          checked={
            settings.notificationType === NotificationTypes.EXTRA
          }
          onChange={onChangeNotificationProps}
        />
      </Collapse>
      <NotificationSoundsSetting />
    </SettingSection>
  );
};

export default FeatureSection;
