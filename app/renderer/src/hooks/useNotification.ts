import bell from "assets/audios/notification-bell.wav";

type HookOptions = {
  mute?: boolean;
} & NotificationOptions;

export const useNotification = (
  commonOptions?: HookOptions,
  showNotification?: boolean
) => {
  return async function sendNotification(
    title: string,
    options: NotificationOptions,
    audioSrc?: string
  ) {
    const userOptions = {
      ...commonOptions,
      ...options,
    };

    // Making sure that notification sound the same in all Operating System
    if (!userOptions.mute) {
      await playSound(bell);

      if (audioSrc) {
        // Small delay to avoid sound overlapping
        await wait(1500);
        await playSound(audioSrc);
      }
    }

    if (showNotification) {
      new Notification(title, { ...userOptions, silent: true });
    }
  };
};

async function playSound(audioSrc: string) {
  try {
    const audio = new Audio(audioSrc);
    await audio.play();
  } catch (e) {
    console.warn("There was a problem playing sound", e);
  }
}

async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
