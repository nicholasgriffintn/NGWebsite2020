import { animated } from "react-spring";
import styled from "styled-components";
import { Sun, Moon } from "styled-icons/fa-solid";

export const Box = styled.div`
  display: grid;
  > * {
    /* for vertical centering */
    display: flex;
    grid-area: 1/1;
  }
`;

// Needed as a selector in Notification below.
export const Div = styled(animated.div)``;

export const SunIcon = styled(Sun).attrs({ size: `1em` })`
  cursor: pointer;
`;

export const MoonIcon = styled(Moon).attrs({ size: `1em` })`
  transform: scale(0.9);
  cursor: pointer;
`;
