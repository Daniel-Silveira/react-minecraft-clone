import { CubeDomain } from "../../domains/cubes/cube.domain";
import { useStore } from "../../hooks/useStore";
import { Cube } from "../Cube";

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);

  if (!cubes?.length) return null;

  return (
    <>
      {cubes.map((cube: CubeDomain) => (
        <Cube
          key={cube.id}
          id={cube.id}
          position={cube.position}
          texture={cube.texture}
        />
      ))}
    </>
  );
};
