import { memo } from "react";
import { CubeDomain } from "../../domains/cubes/cube.domain";
import { useStore } from "../../hooks/useStore";
import { Cube } from "../Cube";

const Component = ({ cubes }: { cubes: CubeDomain[] }) => {
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

const RenderCubes = memo(Component);

export const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);
  return <RenderCubes cubes={cubes} />;
};
