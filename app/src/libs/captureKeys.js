const { UiohookKey } = require("uiohook-napi");

const UiohookToName = Object.fromEntries(Object.entries(UiohookKey).map(([k, v]) => [v, k]));
// console.log('UiohookKey',UiohookKey);
const sendkeyDown = (e) => {
  const data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
  console.log('sendKeyDown:',data);
};

// function send webContents event for keyUp
const sendKeyUp = (e) => {
  const data = { event: e, name: UiohookToName[e.keycode], time: Date.now() };
   console.log('sendKeyUp:',data);
};

module.exports= { sendKeyUp, sendkeyDown,UiohookToName};
