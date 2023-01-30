<p align="center">
  <a href="https://roldanjr.github.io/pomatez/">
    <img src=".github/assets/logo.png" alt="Pomatez logo" width="56" height="56">
  </a>
</p>

<h1 align="center">Pomatez</h1>

<h3 align="center">Stay Focused. Take a Break.</h3>

<p align="center">
  <br>
  <a href="#sparkles-features">Features</a>
  .
  <a href="#world_map-roadmap">Road Map</a>
  .
  <a href="#call_me_hand-development">Development</a>
  .
  <a href="#computer-installation">Installation</a>
  .
  <a href="#shield-privacy">Privacy</a>
  .
  <a href="#newspaper-license">License</a>
  <br>
  <br>
</p>

<p align="center">
   <a href="https://snapcraft.io/pomatez">
      <image src="https://snapcraft.io/pomatez/badge.svg" alt="Pomatez" />
   </a>
   <a href="https://travis-ci.com/roldanjr/pomatez">
      <image src="https://travis-ci.com/roldanjr/pomatez.svg?branch=master" alt="Build Status" />
   </a>
   <image src="https://img.shields.io/github/downloads/roldanjr/pomatez/total" alt="Github Downloads" />
   <a href="https://github.com/roldanjr/pomatez/releases/latest">
      <image src="https://img.shields.io/github/v/release/roldanjr/pomatez" alt="Latest Version" />
   </a>
   <a href="https://github.com/roldanjr/pomatez/blob/master/LICENSE">
      <image src="https://img.shields.io/github/license/roldanjr/pomatez" alt="License" />
   </a>
</p>

![App Preview](.github/assets/preview.png)

## :sparkles: Features

- **Customizable rules** - it allows you to modify the default Pomodoro configuration based on your personal preferences.

- **Built-in task list** - it allows you to create a simple list of todos and mark the items done when it's done.

- **Full-screen breaks** - once enabled, it will force you to not continue working during break time by occupying the whole screen of your desktop, but right now it doesn't support multiple monitors.

- **Desktop notification** - once enabled, you will get desktop notifications from time to time depending on the notification type you selected. Supported notification types are the following;

  - _None_ - no notification will be shown. `default`
  - _Normal_ - will show notification in every break.
  - _Extra_ - will show notification 60 seconds before the break starts, and 30s before the break ends, and the actual break starts.

- **Special breaks** - a special feature that enables you to set specific times to take important breaks like lunch, snack, dinner and etc.. without updating the Pomodoro configuration.

- **Keyboard shortcuts** - might be helpful for you depending on your use case but currently, these keyboard shortcuts are not yet customizable.

- **Auto updates** - once enabled, the app will always be on top of other apps running on your Operating System.

- **Always on top** - once enabled, the app will always be on top of other apps running on your Operating System.

- **Minimize to tray** - once enabled, the minimize action will not minimize the app. Instead, it will be hidden and sent to the tray.

- **Close to tray** - once enabled, the close action will not quit the app. Instead, it will be hidden and sent to the tray.

- **Progress on tray** - the app will show a progress indicator on your system tray. This feature can be activated if minimize to tray or close to tray feature is enabled also.

- **Progress animation** - by default, you will get a smooth timer progress animation but if you're worried about the app's memory consumption on your computer, you can disable it by the way.

- **Toggle native titlebar** - it allows you to switch between the custom title bar of the app to a native one provided by your Operating System and vice versa, depending on your personal preference.

- **Auto-start work time** - once enabled, you will no longer need to manually start the work timer again after the break ends, it will automatically start for you.

- **Voice assistance** - once enabled, your desktop notification will include a male voice to inform you of things related to your Pomodoro session. Useful sometimes especially when you're away from your computer during break time.

- **Dark theme** - it allows you to use dark mode and helps you reduce eye strain and improves visibility if you are the type of person with low vision and high sensitivity to bright light.

- **Strict mode** - once enabled, the app will strictly follow the rules you have set and prevent you from pausing, skipping, and resetting the timer when it started.

- **Compact Mode** - once enabled, the app will occupy less space on your screen and it will be useful if you're using a small-screen device.

## :world_map: Roadmap

- **Customizable shortcuts** - provide a way to make the default keyboard shortcuts customizable by the users.

- **Website Blocker** - enable users to block specific websites while working in order to stay on focus.

- **Productivity report** - provide some useful summary about the users' productivity to have some sense of accomplishments.

- **Time extender** - enable the users to extend the timer if needed. Useful when they want to finish the task first before taking up a break.

- **Tasks database** - enable users to save completed tasks into a database. Useful when the users want to monitor or track previous tasks.

## :zap: Quick Setup

1. Install all app dependencies.

   ```sh
   yarn install or npm install
   ```

2. Start the development.

   ```sh
   yarn dev:app or npm run dev:app
   ```

## 🛠 Building for Production

1. Build Windows installer.

   ```sh
   yarn build:win or npm run build:win
   ```

2. Build macOS installer.

   ```sh
   yarn build:mac or npm run build:mac
   ```

3. Build Linux installer.

   ```sh
   yarn build:linux or npm run build:linux
   ```

4. Build macOS, Windows and Linux installer at once.

   ```sh
   yarn build:mwl or npm run build:mwl
   ```

## :pencil: Pre-Commit

If your pr is being rejected due to the pre-commit checks, just download pre-commit using `pip install pre-commit` or via one of the commands [here](https://pre-commit.com/#install).
Once that is installed just running `pre-commit` should automatically fix the files.

## :computer: Installation

Available for Windows, macOS, and Linux.

Download the latest version from the [Releases Page](https://github.com/roldanjr/pomatez/releases/latest) or from the :point_right: [Download Page](https://roldanjr.github.io/pomatez/) .

**For Linux users:**

> If you want to be always updated with the latest release, recommended way to install it is via Snap Store.

[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/pomatez)

Please consider starring this project to show your :blue_heart: and support. Thank you so much :bowing_man:

## :shield: Privacy

This app has analytics that will track the number of users only and nothing more ([analytics.ts](https://github.com/roldanjr/pomatez/blob/master/app/main/src/helpers/analytics.ts)).

## :newspaper: License

MIT © [Roldan Montilla Jr](https://github.com/roldanjr)
