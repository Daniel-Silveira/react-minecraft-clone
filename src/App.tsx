import { Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Terrain } from "./components/Terrain";
import { Player } from "./components/Player";
import { Camera } from "./components/Camera";
import { Cubes } from "./components/RenderCubes";
import { useStore } from "./hooks/useStore";
import { QuickAccessBar } from "./components/QuickAccessBar";

function App() {
  const [position, currentChunk] = useStore((state) => [
    state.position,
    state.currentChunk,
  ]);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 9,
          padding: "0 1rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>{position[0]?.toFixed()},</p>
          <p style={{ margin: "0 1rem" }}>{position[1]?.toFixed()},</p>
          <p>{position[2]?.toFixed()}</p>
          {currentChunk && <strong>{currentChunk}</strong>}
        </div>
      </div>
      <Canvas>
        <Sky sunPosition={[500, 0, 200]} />
        <ambientLight intensity={0.5} />
        <Camera />
        <Physics>
          <Cubes />
          <Player />
          <Terrain />
        </Physics>
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2.5rem",
        }}
      >
        +
      </div>
      <QuickAccessBar />
    </div>
  );
}

export default App;
