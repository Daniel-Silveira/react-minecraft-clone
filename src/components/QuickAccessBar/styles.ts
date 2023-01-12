import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  z-index: 9;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Container = styled.div`
  height: 3.2rem;
  border: 0.2rem solid #00000030;
  display: flex;
`;

export const BoxItem = styled.div<{ active: boolean }>`
  display: flex;
  height: 3.2rem;
  width: 3.2rem;
  border: 3px;
  border: 0.4rem solid #80808087;
  box-sizing: border-box;
  box-shadow: 0px 0px 3px 3px #00000020, inset 0 0 3px 3px #00000020;
  ${({ active }: { active?: boolean }) =>
    active &&
    css`
      transform: scale(1.2);
      border-color: grey;
      box-shadow: 0px 0px 2px 2px #00000060, inset 0 0 3px 3px #00000020;
    `}
`;

export const Image = styled.img``;
