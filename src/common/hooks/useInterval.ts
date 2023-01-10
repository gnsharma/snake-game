import * as React from "react";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";
import { canUseDOM } from "../helpers/misc";

export function useInterval<T extends () => any>(
  callback: T,
  duration: number
) {
  const options = React.useRef({ callback, duration });
  const interval = React.useRef<ReturnType<typeof setInterval>>();

  useIsomorphicLayoutEffect(() => {
    options.current.callback = callback;
    options.current.duration = duration;
  }, [callback, duration]);

  const clear = React.useCallback(() => {
    if (canUseDOM && interval.current) clearInterval(interval.current);
  }, []);

  const set = React.useCallback((newDuration = options.current.duration) => {
    clear();
    if (canUseDOM) {
      interval.current = setInterval(() => {
        const { callback } = options.current;
        typeof callback === "function" && callback();
      }, newDuration);
    }
  }, []);

  useIsomorphicLayoutEffect(() => clear, [clear]);

  return { set, clear };
}
