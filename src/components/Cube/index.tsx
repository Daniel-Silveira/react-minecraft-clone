import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { memo } from "react";
import { Texture } from "three";
import { PositionDomain } from "../../domains/cubes/position.domain";

interface CubeProps {
  id: string;
  position: PositionDomain;
  texture: Texture;
  handleAddCube: any;
  handleRemoveCube: any;
}

export const Component = ({
  id,
  position,
  texture,
  handleAddCube,
  handleRemoveCube,
}: CubeProps) => {
  const [ref]: any = useBox(() => ({
    type: "Static",
    position,
  }));

  return (
    <mesh
      ref={ref}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        const { x, y, z } = ref.current.position;

        if (!event.nativeEvent.button) {
          handleRemoveCube(id, x, y, z);
          return;
        }

        const clickedFace = event.faceIndex && Math.floor(event.faceIndex / 2);

        if (clickedFace === 0) {
          handleAddCube(x + 1, y, z);
          return;
        }
        if (clickedFace === 1) {
          handleAddCube(x - 1, y, z);
          return;
        }
        if (clickedFace === 2) {
          handleAddCube(x, y + 1, z);
          return;
        }
        if (clickedFace === 3) {
          handleAddCube(x, y - 1, z);
          return;
        }
        if (clickedFace === 4) {
          handleAddCube(x, y, z + 1);
          return;
        }
        if (clickedFace === 5) {
          handleAddCube(x, y, z - 1);
          return;
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};

export const Cube = memo(Component);
