import { memo } from "react";
import { CubeDomain } from "../../domains/cubes/cube.domain";
import { useStore } from "../../hooks/useStore";
import { Cube } from "../Cube";

const Component = ({ cubes, addCube, removeCube }: any) => {
  if (!cubes?.length) return null;
  return (
    <>
      {cubes.map((cube: CubeDomain) => (
        <Cube
          key={cube.id}
          id={cube.id}
          position={cube.position}
          texture={cube.texture}
          handleAddCube={addCube}
          handleRemoveCube={removeCube}
        />
      ))}
    </>
  );
};

const RenderCubes = memo(Component);

export const Cubes = () => {
  const [cubes, addCube, removeCube] = useStore((state) => [
    state.cubes,
    state.addCube,
    state.removeCube,
  ]);

  return (
    <RenderCubes cubes={cubes} addCube={addCube} removeCube={removeCube} />
  );
};
