import { useEffect } from "react";
import { useKeyboard } from "../../hooks/useKeyboard";
import { cubeTypes, useStore } from "../../hooks/useStore";
import * as S from "./styles";

export const QuickAccessBar = () => {
  const actions = useKeyboard();
  const [quickAccess, changeItemQuickAccess] = useStore((state) => [
    state.quickAccess,
    state.changeItemQuickAccess,
  ]);

  useEffect(() => {
    const options = [
      actions.changeItem1,
      actions.changeItem2,
      actions.changeItem3,
      actions.changeItem4,
      actions.changeItem5,
      actions.changeItem6,
      actions.changeItem7,
      actions.changeItem8,
      actions.changeItem9,
    ];

    changeItemQuickAccess(options.findIndex((boolean) => boolean) + 1);
  }, [
    actions.changeItem1,
    actions.changeItem2,
    actions.changeItem3,
    actions.changeItem4,
    actions.changeItem5,
    actions.changeItem6,
    actions.changeItem7,
    actions.changeItem8,
    actions.changeItem9,
  ]);

  return (
    <S.Wrapper>
      <S.Container>
        {cubeTypes.map((item) => (
          <S.BoxItem key={item.id} active={quickAccess === item.id}>
            {item.image && <S.Image src={item.image} />}
          </S.BoxItem>
        ))}
      </S.Container>
    </S.Wrapper>
  );
};
