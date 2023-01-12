import { Mesh, RepeatWrapping } from "three";
import { usePlane } from "@react-three/cannon";
import { bedRockTexture } from "../../assets/textures";
import { useStore } from "../../hooks/useStore";
import { ThreeEvent } from "@react-three/fiber";

export const Terrain = () => {
  const [addCube] = useStore((state) => [state.addCube]);
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  bedRockTexture.wrapS = RepeatWrapping;
  bedRockTexture.wrapT = RepeatWrapping;
  bedRockTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(event: ThreeEvent<MouseEvent>) => {
        if (!event.nativeEvent.button) return null;
        const [x, _, z] = Object.values(event.point).map((value: number) =>
          Math.ceil(value)
        );
        addCube(x, 0.5, z);
      }}
    >
      <planeGeometry attach="geometry" args={[200, 200]} />
      <meshStandardMaterial attach="material" map={bedRockTexture} />
    </mesh>
  );
};
