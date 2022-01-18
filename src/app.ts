import { Joystick } from 'sfml.js';
import { DisplayWindow } from './liteTGSS';

let running = true;
const window = new DisplayWindow({ title: 'SFML In TS', width: 320, height: 240, scale: 2, mouseVisible: true });
window.onClose = () => (running = false);
window.onKeyPressed = ({ key }) => {
  if (key.codeStr === 'Escape') running = false;
};
window.onLostFocus = () => console.log('Focus lost');
window.onGainedFocus = () => console.log('Focus gained');
window.onJoystickConnected = ({ joystickConnect: { joystickId } }) => {
  const name = Joystick.getIdentification(joystickId).name;
  console.log(`${name} connected!`);
};
window.onJoystickDisconnected = ({ joystickConnect: { joystickId } }) => {
  const name = Joystick.getIdentification(joystickId).name;
  console.log(`${name} disconnected!`);
};
window.onJoystickButtonPressed = ({ joystickButton: { button, joystickId } }) => {
  const name = Joystick.getIdentification(joystickId).name;
  console.log(`Button #${button} of ${name} pressed!`);
};
window.onJoystickMoved = ({ joystickMove: { joystickId, axisStr, position } }) => {
  const name = Joystick.getIdentification(joystickId).name;
  console.log(`Axis ${axisStr} of ${name} moved to ${position}!`);
};

while (running) {
  window.update();
}
window.close();
