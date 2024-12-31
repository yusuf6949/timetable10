/**
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  appId: "com.kinaawa.timetable",
  productName: "KHSK TimeTable",
  directories: {
    output: "release",
    buildResources: "build"
  },
  files: [
    "dist/**/*",
    "electron/**/*",
    "package.json"
  ],
  extraMetadata: {
    main: "electron/main.cjs"
  },
  win: {
    target: [{
      target: "nsis",
      arch: ["x64"]
    }],
    icon: "build/icon.png"
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
    shortcutName: "KHSK TimeTable",
    include: "installer.nsh"
  },
  afterPack: "scripts/afterPack.cjs"
}