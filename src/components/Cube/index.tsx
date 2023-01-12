import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { Texture } from "three";
import { PositionDomain } from "../../domains/cubes/position.domain";
import { useStore } from "../../hooks/useStore";

interface CubeProps {
  id: string;
  position: PositionDomain;
  texture: Texture;
}

export const Cube = ({ id, position, texture }: CubeProps) => {
  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);
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
          removeCube(id, x, y, z);
          return;
        }

        const clickedFace = event.faceIndex && Math.floor(event.faceIndex / 2);

        if (clickedFace === 0) {
          addCube(x + 1, y, z);
          return;
        }
        if (clickedFace === 1) {
          addCube(x - 1, y, z);
          return;
        }
        if (clickedFace === 2) {
          addCube(x, y + 1, z);
          return;
        }
        if (clickedFace === 3) {
          addCube(x, y - 1, z);
          return;
        }
        if (clickedFace === 4) {
          addCube(x, y, z + 1);
          return;
        }
        if (clickedFace === 5) {
          addCube(x, y, z - 1);
          return;
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={texture} />
    </mesh>
  );
};
