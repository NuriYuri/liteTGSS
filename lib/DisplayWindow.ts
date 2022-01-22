import {
  Event,
  Image,
  JoystickButtonEvent,
  JoystickConnectEvent,
  JoystickMoveEvent,
  KeyEvent,
  MouseButtonEvent,
  MouseMoveEvent,
  MouseWheelScrollEvent,
  RenderWindow,
  SensorEvent,
  SizeEvent,
  TextEvent,
  TouchEvent,
  VideoMode,
} from 'sfml.js';

export type DisplayWindowSettings = {
  title: string;
  width: number;
  height: number;
  scale: number;
  bpp?: number;
  frameRate?: number;
  vsync?: boolean;
  fullscreen?: boolean;
  mouseVisible?: boolean;
};

export type CurrentDisplayWindowSettings = Required<DisplayWindowSettings>;

export class DisplayWindow extends RenderWindow {
  private _settings: CurrentDisplayWindowSettings;
  private _icon: Image | undefined;
  public onClose: () => void = () => {
    return;
  };
  public onGainedFocus: () => void = () => {
    return;
  };
  public onJoystickButtonPressed: (event: JoystickButtonEvent) => void = () => {
    return;
  };
  public onJoystickButtonReleased: (event: JoystickButtonEvent) => void = () => {
    return;
  };
  public onJoystickConnected: (event: JoystickConnectEvent) => void = () => {
    return;
  };
  public onJoystickDisconnected: (event: JoystickConnectEvent) => void = () => {
    return;
  };
  public onJoystickMoved: (event: JoystickMoveEvent) => void = () => {
    return;
  };
  public onKeyPressed: (event: KeyEvent) => void = () => {
    return;
  };
  public onKeyReleased: (event: KeyEvent) => void = () => {
    return;
  };
  public onLostFocus: () => void = () => {
    return;
  };
  public onMouseButtonPressed: (event: MouseButtonEvent) => void = () => {
    return;
  };
  public onMouseButtonReleased: (event: MouseButtonEvent) => void = () => {
    return;
  };
  public onMouseEntered: () => void = () => {
    return;
  };
  public onMouseLeft: () => void = () => {
    return;
  };
  public onMouseMoved: (event: MouseMoveEvent) => void = () => {
    return;
  };
  public onMouseWheelScrolled: (event: MouseWheelScrollEvent) => void = () => {
    return;
  };
  public onResized: (event: SizeEvent) => void = () => {
    return;
  };
  public onSensorChanged: (event: SensorEvent) => void = () => {
    return;
  };
  public onTextEntered: (event: TextEvent) => void = () => {
    return;
  };
  public onTouchBegan: (event: TouchEvent) => void = () => {
    return;
  };
  public onTouchEnded: (event: TouchEvent) => void = () => {
    return;
  };
  public onTouchMoved: (event: TouchEvent) => void = () => {
    return;
  };

  constructor({
    title,
    width,
    height,
    scale,
    bpp = 32,
    frameRate = 60,
    vsync = true,
    fullscreen = false,
    mouseVisible = false,
  }: DisplayWindowSettings) {
    super(
      new VideoMode(width * scale, height * scale, bpp),
      title,
      // tslint:disable-next-line: no-bitwise
      fullscreen ? RenderWindow.Style.Fullscreen : RenderWindow.Style.Titlebar | RenderWindow.Style.Close,
    );
    this.setVerticalSyncEnabled(vsync);
    this.setMouseCursorVisible(mouseVisible);
    this.setFramerateLimit(vsync ? 0 : frameRate);

    this._settings = { title, width, height, scale, bpp, frameRate, vsync, fullscreen, mouseVisible };
  }

  /**
   * Get the current settings of the Window
   */
  get settings(): CurrentDisplayWindowSettings {
    return { ...this._settings };
  }

  /**
   * Set the current settings of the Window
   */
  set settings({ title, width, height, scale, bpp, frameRate, vsync, fullscreen, mouseVisible }: CurrentDisplayWindowSettings) {
    this.setVerticalSyncEnabled(vsync);
    this.setMouseCursorVisible(mouseVisible);
    this.setFramerateLimit(vsync ? 0 : frameRate);
    // TODO: implement create over RenderWindow so we can change resolution & similar stuff

    this._settings = { title, width, height, scale, bpp, frameRate, vsync, fullscreen, mouseVisible };
  }

  /**
   * Get the width of the window
   */
  get width() {
    return this._settings.width;
  }

  /**
   * Get the height of the window
   */
  get height() {
    return this._settings.height;
  }

  /**
   * Get the icon of the window
   */
  get icon() {
    return this._icon;
  }

  /**
   * Set the icon of the window
   */
  set icon(icon: Image) {
    // TODO: Implement setIcon over RenderWindow
    this._icon = icon;
  }

  close() {
    // TODO: dispose all viewports
    super.close();
  }

  /**
   * Update the window content
   */
  update() {
    return new Promise((resolve) => {
      setImmediate(() => {
        this.clear(0);
        this.display();
        let event = this.pollEvent();
        while (event) {
          this.processEvent(event);
          event = this.pollEvent();
        }
        resolve(true);
      });
    });
  }

  /**
   * Dispose all the resources and close the window
   */
  dispose() {
    this.close();
  }

  private processEvent(event: Event) {
    switch (event.type) {
      case 'Closed':
        return this.onClose();
      case 'GainedFocus':
        return this.onGainedFocus();
      case 'JoystickButtonPressed':
        return this.onJoystickButtonPressed(event);
      case 'JoystickButtonReleased':
        return this.onJoystickButtonReleased(event);
      case 'JoystickConnected':
        return this.onJoystickConnected(event);
      case 'JoystickDisconnected':
        return this.onJoystickDisconnected(event);
      case 'JoystickMoved':
        return this.onJoystickMoved(event);
      case 'KeyPressed':
        return this.onKeyPressed(event);
      case 'KeyReleased':
        return this.onKeyReleased(event);
      case 'LostFocus':
        return this.onLostFocus();
      case 'MouseButtonPressed':
        return this.onMouseButtonPressed(event);
      case 'MouseButtonReleased':
        return this.onMouseButtonReleased(event);
      case 'MouseEntered':
        return this.onMouseEntered();
      case 'MouseLeft':
        return this.onMouseLeft();
      case 'MouseMoved':
        return this.onMouseMoved(event);
      case 'MouseWheelMoved':
        return;
      case 'MouseWheelScrolled':
        return this.onMouseWheelScrolled(event);
      case 'Resized':
        return this.onResized(event);
      case 'SensorChanged':
        return this.onSensorChanged(event);
      case 'TextEntered':
        return this.onTextEntered(event);
      case 'TouchBegan':
        return this.onTouchBegan(event);
      case 'TouchEnded':
        return this.onTouchEnded(event);
      case 'TouchMoved':
        return this.onTouchMoved(event);
      case 'Resized':
        return;
      default:
        const assertUnreachable = (input: never) => {
          return;
        };
        assertUnreachable(event);
    }
  }
}
