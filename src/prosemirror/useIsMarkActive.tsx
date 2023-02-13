import React from "react";
import { MarkType } from "prosemirror-model";
import { EditorState } from "prosemirror-state";

export const useIsMarkActive = (mark: MarkType, state?: EditorState) => {
  const [active, setActive] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!state) {
      return;
    }
    const { from, to } = state.selection;

    let fromCalculated = from;
    if (from === to) {
      fromCalculated = from - 1;
    }
    setActive(state.doc.rangeHasMark(fromCalculated, to, mark));
  }, [state, mark]);

  return active;
};
