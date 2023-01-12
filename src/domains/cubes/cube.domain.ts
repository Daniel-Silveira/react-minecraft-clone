import { Texture } from "three";
import { PositionDomain } from "./position.domain";

export interface CubeDomain {
  id: string;
  position: PositionDomain;
  texture: Texture;
}
