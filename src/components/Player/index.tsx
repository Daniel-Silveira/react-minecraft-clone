import { Mesh, Vector3 } from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useStore } from "../../hooks/useStore";
import { PositionDomain } from "../../domains/cubes/position.domain";

const JUMP_FORCE: number = 3;
const SPEED: number = 5;

export const Player = () => {
  const [setPosition] = useStore((state) => [state.setPosition]);
  const { actions } = useKeyboard();
  const { camera } = useThree();
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1000,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  const position = useRef<PositionDomain>([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p: PositionDomain) => (position.current = p));
  }, [api.position]);

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v: PositionDomain) => (velocity.current = v));
  }, [api.velocity]);

  useEffect(() => {
    setPosition(position.current);
  }, [position.current]);

  useFrame(() => {
    camera.position.copy(
      new Vector3(position.current[0], position.current[1], position.current[2])
    );

    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0)
    );

    const sideVector = new Vector3(
      (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (actions.jump) {
      api.velocity.set(0, JUMP_FORCE, 0);
    }
  });

  return <mesh ref={ref}></mesh>;
};
