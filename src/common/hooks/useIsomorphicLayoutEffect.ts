import * as React from "react";

import { canUseDOM } from "src/common/helpers/misc";

export const useIsomorphicLayoutEffect = canUseDOM
  ? React.useLayoutEffect
  : React.useEffect;
