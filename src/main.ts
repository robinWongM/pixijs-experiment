import * as PIXI from 'pixi.js';

const element = document.getElementById('test');
const canvas = element;

const wrap = (canvas: any) => {
  const originAddEventListener = canvas?.addEventListener.bind(canvas);
  canvas!.addEventListener = (...args: any[]) => {
    args[2] = { capture: args[2] === false ? false : true, passive: true };
    originAddEventListener?.(...args);
  };
};

wrap(canvas);
wrap(globalThis.document);

const app = new PIXI.Application({
  background: '#1099bb',
  resizeTo: window,
  view: canvas as unknown as PIXI.ICanvas,
});

let isFlower = true;

const texture = PIXI.Texture.from('https://pixijs.com/assets/flowerTop.png');
const secondTexture = PIXI.Texture.from(
  'https://pixijs.com/assets/eggHead.png'
);

// create a new Sprite using the texture
const character = new PIXI.Sprite(texture);

// center the sprites anchor point
character.anchor.set(0.5);

// move the sprite to the center of the screen
character.x = app.screen.width / 2;
character.y = app.screen.height / 2;

app.stage.addChild(character);

// make the sprite interactive
character.eventMode = 'static';
character.cursor = 'pointer';

character.on('pointertap', () => {
  isFlower = !isFlower;
  // Dynamically swap the texture
  character.texture = isFlower ? texture : secondTexture;
});

app.ticker.add(() => {
  character.rotation += 0.02;
});

try {
  app.view.style!.touchAction = '';
} catch (e) {}
