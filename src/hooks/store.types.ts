import { CubeDomain } from "../domains/cubes/cube.domain";
import { PositionDomain } from "../domains/cubes/position.domain";

export interface StoreTypes {
  cubes: CubeDomain[];
  position: PositionDomain;
  quickAccess: number;
  chunksLocation: ChunkLocationDomain[];
  currentChunk: string;
  chunks: any;

  addCube: (x: number, y: number, z: number) => void;
  removeCube: (id: string, x: number, y: number, z: number) => void;
  setPosition: (position: PositionDomain) => void;
  changeItemQuickAccess: (value: number) => void;
}

export interface ChunkLocationDomain {
  id: string;
  position: PositionDomain;
}
