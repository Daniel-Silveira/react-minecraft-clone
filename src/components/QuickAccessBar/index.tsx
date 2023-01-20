import { memo, useEffect } from "react";
import { useKeyboard } from "../../hooks/useKeyboard";
import { cubeTypes, useStore } from "../../hooks/useStore";
import * as S from "./styles";

const Component = ({ actions, quickAccess, changeItemQuickAccess }: any) => {
  useEffect(() => {
    const options = Object.values(actions);
    changeItemQuickAccess(options.findIndex((boolean) => boolean) + 1);
  }, [actions]);

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

const RenderQuickAccessBar = memo(Component);

export const QuickAccessBar = () => {
  const { quickAccessActions } = useKeyboard();
  const [quickAccess, changeItemQuickAccess] = useStore((state) => [
    state.quickAccess,
    state.changeItemQuickAccess,
  ]);

  return (
    <RenderQuickAccessBar
      quickAccess={quickAccess}
      changeItemQuickAccess={changeItemQuickAccess}
      actions={quickAccessActions}
    />
  );
};
