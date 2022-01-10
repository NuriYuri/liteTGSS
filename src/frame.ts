import { Event, RenderWindow } from "sfml.js";

export const frame = (window: RenderWindow) => {
  let event: Event;
  window.clear(0);
  window.display();
  while ((event = window.pollEvent())) {
    switch (event.type) {
      case "Closed":
        window.close();
        break;
      case "KeyPressed":
        if (event.key.codeStr === "Escape") window.close();
    }
  }
};
