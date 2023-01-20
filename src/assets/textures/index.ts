import { NearestFilter } from "three";
import { TextureLoader } from "three";
import {
  dirt,
  sprucePlanks,
  lightGrayWool,
  darkOakPlanks,
  sand,
  bedrock,
  deepslateTiles,
} from "./blocks";
import nether from "./nether.png";
import skulk from "./skulk.png";

const transformImage = (image: string) => {
  const texture = new TextureLoader().load(image);
  texture.magFilter = NearestFilter;
  return texture;
};

const netherTexture = transformImage(nether);
const skulkTexture = transformImage(skulk);

const bedRockTexture = transformImage(bedrock);
const dirtTexture = transformImage(dirt);
const sandTexture = transformImage(sand);
const sprucePlanksTexture = transformImage(sprucePlanks);
const lightGrayWoolTexture = transformImage(lightGrayWool);
const darkOakPlanksTexture = transformImage(darkOakPlanks);
const deepslateTilesTexture = transformImage(deepslateTiles);

export {
  bedRockTexture,
  netherTexture,
  skulkTexture,
  sandTexture,
  dirtTexture,
  sprucePlanksTexture,
  lightGrayWoolTexture,
  darkOakPlanksTexture,
  deepslateTilesTexture,
};
