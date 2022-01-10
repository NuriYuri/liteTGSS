import { DisplayWindow } from "./liteTGSS";

let running = true;
const window = new DisplayWindow({ title: "SFML In TS", width: 320, height: 240, scale: 2 });
window.onClose = () => {
  running = false;
};
window.onKeyPressed = ({ key }) => {
  if (key.codeStr === "Escape") running = false;
};

while (running) {
  window.update();
}
window.close();
