import React from "react";
import { useTransition } from "react-spring";
import { useDarkMode } from "../hooks";
import { Box, Div, SunIcon, MoonIcon } from "./styles/darkMode";

export default function DarkMode({ initial, ...rest }) {
  const [colorMode, setColorMode] = useDarkMode(initial);

  const Modes = {
    light: { Icon: SunIcon, title: `Light Mode`, nextMode: `dark` },
    dark: { Icon: MoonIcon, title: `Dark Mode`, nextMode: `light` },
  };

  const transitions = useTransition(colorMode, null, {
    initial: null,
    from: { opacity: 0, transform: `translateX(100%)` },
    enter: { opacity: 1, transform: `translateX(0%)` },
    leave: { opacity: 0, transform: `translateX(-100%)` },
  });

  return (
    <Box {...rest}>
      {transitions.map(({ item, props, key }) => {
        console.log(item);

        if (!item) {
          item = "light";
        }

        const { Icon, title, render, nextMode } = Modes[item];

        return (
          <Div key={key} style={props}>
            <Icon
              title={title}
              onClick={() => setColorMode(nextMode)}
              // onTouchStart needed to react on first tap in iOS Safari.
              onTouchStart={() => setColorMode(nextMode)}
            />
          </Div>
        );
      })}
    </Box>
  );
}
