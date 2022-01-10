import { RenderWindow } from "sfml.js";
import { frame } from "./frame";

export const mainProcess = (window: RenderWindow) => {
  while (window.isOpen()) {
    frame(window);
  }
};
