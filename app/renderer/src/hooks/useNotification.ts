import bell from "assets/audios/notification-bell.wav";
import pomodoro from "assets/audios/notification/pomodoro.mp3";
import treasure from "assets/audios/notification/treasure.mp3";
import trumpets from "assets/audios/notification/trumpets.mp3";
import { NotificationSounds } from "store/settings/types";

type OptionProps = {
  mute?: boolean;
  notificationSound: NotificationSounds;
} & NotificationOptions;

export const useNotification = (
  constantOptions?: OptionProps,
  notify?: boolean
) => {
  return function (
    title: string,
    options: NotificationOptions,
    audioSrc?: string
  ) {
    const defaultOptions: NotificationOptions = {
      ...constantOptions,
      ...options,
      silent: true,
    };

    // Making sure that notification sound the same
    // in all Operating System

    if (!constantOptions?.mute) {
      let sound;

      switch (constantOptions?.notificationSound) {
        case NotificationSounds.POMODORO:
          sound = pomodoro;
          break;
        case NotificationSounds.TRUMPETS:
          sound = trumpets;
          break;
        default:
          sound = bell;
      }

      new Audio(sound).play().catch((e) => {
        console.warn("There was a problem playing sound", e);
      });

      if (audioSrc) {
        setTimeout(() => {
          new Audio(audioSrc).play().catch((e) => {
            console.warn("There was a problem playing sound", e);
          });
        }, 1500);
      }
    }

    if (!notify) return;
    return new window.Notification(title, defaultOptions);
  };
};
