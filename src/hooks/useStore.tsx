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
import { StoreTypes } from "./store.types";
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

export const useStore = create<StoreTypes>((set) => ({
  cubes: [],
  position: [0, 0, 0],
  quickAccess: 1,

  addCube: (x: number, y: number, z: number) => {
    set((prev) => {
      const texture = cubeTypes.find(
        (cube) => cube.id === prev.quickAccess
      )?.texture;

      const distanceLimitValidation =
        Math.abs(prev.position[0] - x) > 5 ||
        Math.abs(prev.position[1] - y) > 5 ||
        Math.abs(prev.position[2] - z) > 5;

      const alreadyExistsCubeOnPlace = !!prev.cubes.find(
        (cube) => JSON.stringify(cube.position) === JSON.stringify([x, y, z])
      );

      if (!texture || distanceLimitValidation || alreadyExistsCubeOnPlace) {
        return { ...prev };
      }

      return {
        cubes: [
          ...prev.cubes,
          {
            id: uuidv4(),
            position: [x, y, z],
            texture,
          },
        ],
      };
    });
  },

  removeCube: (id: string, x: number, y: number, z: number) => {
    set((prev) => {
      if (
        Math.abs(prev.position[0] - x) > 5 ||
        Math.abs(prev.position[1] - y) > 5 ||
        Math.abs(prev.position[2] - z) > 5
      ) {
        return { ...prev };
      }
      return {
        cubes: prev.cubes.filter((cube: CubeDomain) => cube.id !== id),
      };
    });
  },

  setPosition: (position: PositionDomain) => {
    set(() => ({
      position,
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
