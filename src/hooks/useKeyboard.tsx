import { useCallback, useEffect, useState } from "react";

const actionByKey = (key: string) => {
  const keyActionMap: any = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    Space: "jump",
    Digit1: "changeItem1",
    Digit2: "changeItem2",
    Digit3: "changeItem3",
    Digit4: "changeItem4",
    Digit5: "changeItem5",
    Digit6: "changeItem6",
    Digit7: "changeItem7",
    Digit8: "changeItem8",
    Digit9: "changeItem9",
  };
  return keyActionMap[key];
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    changeItem1: false,
    changeItem2: false,
    changeItem3: false,
    changeItem4: false,
    changeItem5: false,
    changeItem6: false,
    changeItem7: false,
    changeItem8: false,
    changeItem9: false,
  });

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const action = actionByKey(event.code);

    if (action) {
      setActions((prev) => ({ ...prev, [action]: true }));
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const action = actionByKey(event.code);

    if (action) {
      setActions((prev) => ({ ...prev, [action]: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return actions;
};
