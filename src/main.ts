import * as PIXI from 'pixi.js';

const element = document.getElementById('test');
const canvas = element;

// @ts-ignore
const wrap = (ele: any) => {
  const originAddEventListener = ele?.addEventListener.bind(ele);
  ele!.addEventListener = (...args: any[]) => {
    args[2] = { capture: args[2] === false ? false : true, passive: true };
    originAddEventListener?.(...args);
  };
};

const searchParams = new URLSearchParams(document.location.search);
if (searchParams.get('menu') === 'true') {
  canvas?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  })
}
if (searchParams.get('document') === 'true') {
  wrap(globalThis.document);
}
if (searchParams.get('global') === 'true') {
  wrap(globalThis);
}
if (searchParams.get('canvas') === 'true') {
  wrap(canvas);
}


const app = new PIXI.Application({
  background: '#1099bb',
  resizeTo: window,
  view: canvas as unknown as PIXI.ICanvas,
  resolution: window.devicePixelRatio,
});
//document.body.appendChild(app.view as unknown as HTMLElement);

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
