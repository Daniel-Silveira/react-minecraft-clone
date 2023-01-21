import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import {
  darkOakPlanks,
  deepslateTiles,
  dirt,
  lightGrayWool,
  sprucePlanks,
} from "../assets/textures/blocks";
import {
  darkOakPlanksTexture,
  deepslateTilesTexture,
  dirtTexture,
  lightGrayWoolTexture,
  sprucePlanksTexture,
} from "../assets/textures";
import { ChunkLocationDomain, StoreTypes } from "./store.types";
import { CubeDomain } from "../domains/cubes/cube.domain";
import { PositionDomain } from "../domains/cubes/position.domain";

export const cubeTypes = [
  { id: 1, image: dirt, texture: dirtTexture },
  { id: 2, image: sprucePlanks, texture: sprucePlanksTexture },
  { id: 3, image: lightGrayWool, texture: lightGrayWoolTexture },
  { id: 4, image: darkOakPlanks, texture: darkOakPlanksTexture },
  { id: 5, image: deepslateTiles, texture: deepslateTilesTexture },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

const MAX_NEGATIVE = -101;
const MAX_POSITIVE = 99;
const SKY_MAX = 100;
const CHUNK_SIZE = 20;

const generateChunks = () => {
  let array: ChunkLocationDomain[] = [];
  for (let x = MAX_NEGATIVE; x <= MAX_POSITIVE; x += CHUNK_SIZE) {
    for (let y = 0; y <= SKY_MAX; y += CHUNK_SIZE) {
      for (let z = MAX_NEGATIVE; z <= MAX_POSITIVE; z += CHUNK_SIZE) {
        array.push({ id: uuidv4(), position: [x, y, z] });
      }
    }
  }
  return array;
};

// const generateCubes = () => {
//   const array: any = [];
//   const generate = 30;

//   let x = 1;
//   let z = 1;

//   while (z !== generate) {
//     if (x === generate) {
//       x = 1;
//       z = z + 1;
//     }
//     x = x + 1;

//     array.push({
//       id: uuidv4(),
//       position: [x, 0.5, z],
//       texture: lightGrayWoolTexture,
//     });
//   }

//   return array;
// };

const findChunk = (position: any, chunks: any) => {
  return chunks.find((chunk: any) => {
    const [minX, maxX] = [chunk.position[0] - 10, chunk.position[0] + 10];
    const [minY, maxY] = [chunk.position[1] - 10, chunk.position[1] + 10];
    const [minZ, maxZ] = [chunk.position[2] - 10, chunk.position[2] + 10];

    const xValidate = position[0] >= minX && position[0] <= maxX;
    const YValidate = position[1] >= minY && position[1] <= maxY;
    const ZValidate = position[2] >= minZ && position[2] <= maxZ;

    if (xValidate && YValidate && ZValidate) {
      return true;
    }
    return false;
  });
};

export const useStore = create<StoreTypes>((set) => ({
  cubes: [],
  position: [0, 0, 0],
  quickAccess: 1,
  currentChunk: "",
  chunksLocation: generateChunks(),
  chunks: {},

  addCube: (x: number, y: number, z: number) => {
    set((prev) => {
      const chunkClicked = findChunk([x, y, z], prev.chunksLocation).id;

      const texture = cubeTypes.find(
        (cube) => cube.id === prev.quickAccess
      )?.texture;

      const distanceLimitValidation =
        Math.abs(prev.position[0] - x) > 5 ||
        Math.abs(prev.position[1] - y) > 5 ||
        Math.abs(prev.position[2] - z) > 5;

      const alreadyExistsCubeOnPlace = !!prev.chunks[chunkClicked]?.find(
        (cube: CubeDomain) =>
          JSON.stringify(cube.position) === JSON.stringify([x, y, z])
      );

      if (!texture || distanceLimitValidation || alreadyExistsCubeOnPlace) {
        return { ...prev };
      }

      const chunkAlreadyExists = prev.chunks[chunkClicked];

      const newCube = {
        id: uuidv4(),
        position: [x, y, z],
        texture,
      };

      const chunksUpdated = {
        ...prev.chunks,
        [chunkClicked]: !!chunkAlreadyExists
          ? [...chunkAlreadyExists, newCube]
          : [newCube],
      };

      const values = chunksUpdated && Object.values(chunksUpdated);

      return {
        chunks: chunksUpdated,
        cubes: [].concat(...values),
      };
    });
  },

  removeCube: (id: string, x: number, y: number, z: number) => {
    set((prev) => {
      const chunkClicked = findChunk([x, y, z], prev.chunksLocation).id;

      if (
        Math.abs(prev.position[0] - x) > 5 ||
        Math.abs(prev.position[1] - y) > 5 ||
        Math.abs(prev.position[2] - z) > 5
      ) {
        return { ...prev };
      }

      const chunksUpdated = {
        ...prev.chunks,
        [chunkClicked]: prev.chunks[chunkClicked].filter(
          (cube: CubeDomain) => cube.id !== id
        ),
      };

      const values = chunksUpdated && Object.values(chunksUpdated);

      return {
        chunks: chunksUpdated,
        cubes: [].concat(...values),
      };
    });
  },

  setPosition: (position: PositionDomain) => {
    set((prev) => ({
      position,
      currentChunk: findChunk(position, prev.chunksLocation).id,
    }));
  },

  changeItemQuickAccess: (value?: number) => {
    set((prev) => {
      if (!value) {
        return { prev };
      }
      return {
        quickAccess: value,
      };
    });
  },
}));
