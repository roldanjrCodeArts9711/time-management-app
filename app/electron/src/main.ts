import {
  BrowserWindow,
  app,
  ipcMain,
  globalShortcut,
  Menu,
  Tray,
  shell,
  nativeImage,
} from "electron";
import debounce from "lodash.debounce";
import notifier from "node-notifier";
import path from "path";
import {
  SET_ALWAYS_ON_TOP,
  SET_FULLSCREEN_BREAK,
  MINIMIZE_WINDOW,
  CLOSE_WINDOW,
  SET_UI_THEME,
  SET_NATIVE_TITLEBAR,
  SHOW_WINDOW,
  RELEASE_NOTES_LINK,
  TRAY_ICON_UPDATE,
  SET_COMPACT_MODE,
  SET_OPEN_AT_LOGIN,
} from "@pomatez/shareables";
import {
  activateGlobalShortcuts,
  activateAutoUpdate,
  blockShortcutKeys,
  getIcon,
  isWindow,
  isMacOS,
  getFromStorage,
  createContextMenu,
} from "./helpers";
import isDev from "electron-is-dev";
import store from "./store";

import "v8-compile-cache";
import {
  FullscreenState,
  setFullscreenBreakHandler,
} from "./lifecycleEventHandlers/fullScreenBreak";
import WindowsToaster from "node-notifier/notifiers/toaster";
import NotificationCenter from "node-notifier/notifiers/notificationcenter";

const onProduction = app.isPackaged;

const notificationIcon = path.join(
  __dirname,
  "assets/notification-dark.png"
);

const trayIcon = path.join(__dirname, "assets/tray-dark.png");

const onlySingleInstance = app.requestSingleInstanceLock();

const applicationMenu = isMacOS()
  ? Menu.buildFromTemplate([{ role: "appMenu" }, { role: "editMenu" }])
  : null;
Menu.setApplicationMenu(applicationMenu);

const getFrameHeight = () => {
  if (isWindow()) {
    return 502;
  } else {
    if (store.safeGet("useNativeTitlebar")) {
      return 488;
    }
    return 502;
  }
};

let tray: Tray | null = null;

let win: BrowserWindow | null;

type WindowStateProps = {
  isOnCompactMode: boolean;
} & FullscreenState;

const windowState: WindowStateProps = {
  isFullscreen: false,
  isOnCompactMode: false,
};

function createMainWindow() {
  win = new BrowserWindow({
    width: 340,
    height: getFrameHeight(),
    resizable: true,
    maximizable: false,
    show: false,
    frame: store.safeGet("useNativeTitlebar"),
    icon: getIcon(),
    backgroundColor: store.safeGet("isDarkMode") ? "#141e25" : "#fff",
    alwaysOnTop: store.safeGet("alwaysOnTop"),
    webPreferences: {
      contextIsolation: true,
      backgroundThrottling: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Open the DevTools.
  if (isDev) win.webContents.openDevTools({ mode: "detach" });

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  win.loadURL(
    !onProduction
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "index.html")}`
  );

  win.once("ready-to-show", () => {
    win?.show();
  });

  win.on(
    "minimize",
    debounce(
      async () => {
        try {
          if (win) {
            const data = await getFromStorage(win, "state");
            if (data.settings.minimizeToTray) {
              if (!windowState.isFullscreen) {
                win?.hide();
                if (tray === null && data.settings.minimizeToTray) {
                  createSystemTray();
                }
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      1000,
      { leading: true }
    )
  );
  /**
   * This only exists to counteract an issue with linux where leave-full-screen triggers every time this is called on linux (when exiting fullscreen)
   *
   * It may be fixed in a future version of linux.
   *
   * If you try to set the size smaller than the minimum allowed it will also cause issues here.
   *
   * @param width
   * @param height
   */
  function setSizeIfDiff(width: number, height: number) {
    // Just to stop an infinite loop in the case of a bug
    const minSize = win?.getMinimumSize();
    width = Math.max(width, minSize?.[0] || 0);
    height = Math.max(height, minSize?.[1] || 0);
    const size = win?.getSize();
    if (!size || size[0] !== width || size[1] !== height) {
      win?.setSize(width, height);
    }
  }

  win.on("leave-full-screen", () => {
    if (windowState.isOnCompactMode) {
      setSizeIfDiff(340, 100);
      // Windows doesn't like trying to set it as not resizeable it along with everything else that's going on
      setTimeout(() => {
        win?.setResizable(false);
      });
    } else {
      setSizeIfDiff(340, getFrameHeight());
    }
  });

  win.on(
    "close",
    debounce(
      async (e) => {
        e.preventDefault();
        try {
          if (win) {
            const data = await getFromStorage(win, "state");
            if (!data.settings.closeToTray) {
              app.exit();
            } else {
              if (!windowState.isFullscreen) {
                win?.hide();
                if (tray === null && data.settings.closeToTray) {
                  createSystemTray();
                }
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
      1000,
      { leading: true }
    )
  );

  createContextMenu(win);
}

const trayTooltip = "Just click to restore.";

const contextMenu = Menu.buildFromTemplate([
  {
    label: "Restore the app",
    click: () => {
      win?.show();
    },
  },
  {
    label: "Quit",
    click: () => {
      app.exit();
    },
  },
]);

function createSystemTray() {
  tray = new Tray(trayIcon);

  tray.setToolTip(trayTooltip);
  tray.setContextMenu(contextMenu);

  tray?.on("click", () => {
    if (!win?.isVisible()) {
      win?.show();
    } else {
      if (!win?.isFullScreen()) {
        win?.hide();
      }
    }
  });
}

type NotificationProps = {
  title: string;
  message: string;
  actions: string[];
  callback?: (err: Error | null, response: string) => void;
};

function notify(props: NotificationProps) {
  // This is because it can take different types depending on the initialised OS.
  // Just for some reason, whoever sorted the types out of this library only really considered JS rather than TS.
  const notification: WindowsToaster.Notification &
    NotificationCenter.Notification = {
    icon: notificationIcon,
    title: props.title,
    message: props.message,
    actions: props.actions,
    appID: "com.roldanjr.pomatez",
    sound: true,
    wait: true,
  };

  notifier.notify(notification, (err, response) => {
    if (props.callback) props.callback(err, response);
  });
}

if (!onlySingleInstance) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      } else if (!win.isVisible()) {
        win.show();
      } else {
        win.focus();
      }
    }
  });

  app.whenReady().then(async () => {
    if (isDev) {
      console.log("Installing devtools");
      const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"];
      const installer = await import("electron-devtools-installer");
      console.log(installer);

      for (const tool of extensions) {
        try {
          await installer.default(installer[tool], true);
        } catch (e) {
          console.log(e);
        }
      }
    }

    createMainWindow();

    if (onProduction) {
      if (win) {
        const blockKeys = [
          "CommandOrControl+R",
          "CommandOrControl+Shift+R",
          "CommandOrControl+Alt+Q",
          "F11",
        ];
        blockShortcutKeys(win, blockKeys);
      }
    }

    activateGlobalShortcuts([
      {
        key: "Alt+Shift+H",
        callback: () => {
          win?.hide();
        },
      },
      {
        key: "Alt+Shift+S",
        callback: () => {
          win?.show();
        },
      },
    ]);

    const autoUpdater = activateAutoUpdate({
      onUpdateAvailable: (info) => {
        notify({
          title: "NEW UPDATE IS AVAILABLE",
          message: `App version ${info.version} ready to be downloaded.`,
          actions: ["View Release Notes"],
          callback: (err, response) => {
            if (!err) {
              if (response === "view release notes") {
                shell.openExternal(RELEASE_NOTES_LINK);
              }
            }
          },
        });
      },
      onUpdateDownloaded: (info) => {
        notify({
          title: "READY TO BE INSTALLED",
          message: "Update has been successfully downloaded.",
          // Temporarily commented out due to an issue with snoretoast https://github.com/mikaelbr/node-notifier/issues/332
          actions: ["Quit and Install" /*, "Install it Later"*/],
          callback: (err, response) => {
            if (!err) {
              //if (response === "quit and install") {
              autoUpdater.quitAndInstall();
              //}
            }
          },
        });
      },
    });
  });
}

ipcMain.on(SET_ALWAYS_ON_TOP, (e, { alwaysOnTop }) => {
  win?.setAlwaysOnTop(alwaysOnTop);
  store.safeSet("alwaysOnTop", alwaysOnTop);
});

ipcMain.on(SET_FULLSCREEN_BREAK, (e, args) => {
  setFullscreenBreakHandler(args, {
    win,
    tray,
    trayTooltip,
    contextMenu,
    isFullscreen: windowState.isFullscreen,
  });
});

ipcMain.on(SET_COMPACT_MODE, (e, args) => {
  if (args.compactMode) {
    win?.setMinimumSize(340, 100);
    win?.setSize(340, 100);
    win?.setResizable(false);
    windowState.isOnCompactMode = true;
  } else {
    win?.setResizable(true);
    windowState.isOnCompactMode = false;
    win?.setMinimumSize(340, getFrameHeight());
    win?.setSize(340, getFrameHeight());
  }
});

ipcMain.on(SET_UI_THEME, (e, { isDarkMode }) => {
  store.safeSet("isDarkMode", isDarkMode);
});

ipcMain.on(SHOW_WINDOW, () => {
  if (!win?.isVisible()) {
    win?.show();
  } else {
    win?.focus();
  }
});

ipcMain.on(MINIMIZE_WINDOW, (e, { minimizeToTray }) => {
  if (!minimizeToTray) {
    win?.minimize();
  } else {
    if (tray === null) {
      createSystemTray();
    }
    win?.hide();
  }
});

ipcMain.on(CLOSE_WINDOW, (e, { closeToTray }) => {
  if (!closeToTray) {
    app.exit();
  } else {
    if (tray === null) {
      createSystemTray();
    }
    win?.hide();
  }
});

ipcMain.on(SET_NATIVE_TITLEBAR, (e, { useNativeTitlebar }) => {
  if (store.safeGet("useNativeTitlebar") !== useNativeTitlebar) {
    store.safeSet("useNativeTitlebar", useNativeTitlebar);
    setTimeout(() => {
      app.relaunch();
      app.exit();
    }, 1000);
  }
});

ipcMain.on(TRAY_ICON_UPDATE, (e, dataUrl) => {
  const image = nativeImage.createFromDataURL(dataUrl);
  tray?.setImage(image);
});

ipcMain.on(SET_OPEN_AT_LOGIN, (e, { openAtLogin }) => {
  const storeOpenAtLogin = store.safeGet("openAtLogin");

  if (storeOpenAtLogin !== openAtLogin) {
    store.safeSet("openAtLogin", openAtLogin);

    app.setLoginItemSettings({
      openAtLogin: openAtLogin,
      openAsHidden: openAtLogin,
    });
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.setAppUserModelId("com.roldanjr.pomatez");
