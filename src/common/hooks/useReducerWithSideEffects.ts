import * as React from "react";

type SideEffectFunction<R extends React.Reducer<any, any>> = (
  state: React.ReducerState<R>,
  action: React.ReducerAction<R>
) =>
  | Promise<React.ReducerAction<R> | null | undefined>
  | React.ReducerAction<R>
  | null
  | undefined;

export function useReducerWithSideEffects<R extends React.Reducer<any, any>, I>(
  reducer: R,
  sideEffects: SideEffectFunction<R>,
  initialState: React.ReducerState<R>,
  initializer?: any
): [React.ReducerState<R>, React.Dispatch<React.ReducerAction<R>>] {
  const currentAction = React.useRef<React.ReducerAction<R> | null>(null);
  const [state, dispatch] = React.useReducer(
    (state: any, action: any) => {
      const newState = reducer(state, action);

      /* prevent calling side effects again if reducer function is called twice,
      which is the expected behavior in some occasions https://github.com/facebook/react/issues/16295
      */
      if (currentAction.current !== action) {
        Promise.resolve(sideEffects(newState, action)).then((newAction) => {
          if (!newAction) return;
          dispatch(newAction);
        });
        currentAction.current = action;
      }

      return newState;
    },
    initialState,
    initializer
  );

  return [state, dispatch];
}
