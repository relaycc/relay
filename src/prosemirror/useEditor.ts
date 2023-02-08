import { MutableRefObject, useEffect, useState } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { defaultSchema, imageSettings } from "./defaultSchema";
import { exampleSetup } from "prosemirror-example-setup";
import { mdSerializer } from "./markdownSerializer";
import { mdParser } from "./markdownParser";
import { Node, Slice } from "prosemirror-model";
import { linkify } from "./linkify";
import { imagePlugin } from "prosemirror-image-plugin";

import "prosemirror-image-plugin/dist/styles/common.css";

export const useEditor = (viewRef: MutableRefObject<EditorView | null>) => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const editor = document.querySelector("#editor");
    if (!editor) {
      return;
    }

    viewRef.current = new EditorView(editor, {
      state: EditorState.create({
        schema: defaultSchema,
        doc: mdParser.parse(content) as Node,
        plugins: [
          ...exampleSetup({
            schema: defaultSchema,
            menuBar: false,
          }),
          imagePlugin(defaultSchema, { ...imageSettings }),
        ],
      }),
      dispatchTransaction: (tr) => {
        if (!viewRef.current) {
          return;
        }
        const view = viewRef.current;

        console.log({ tr });
        const state = view.state.apply(tr);
        view.updateState(state);
        const md = mdSerializer.serialize(state.doc);
        console.log({ state, md });
        setContent(md);
      },
      transformPasted: (slice: Slice) => {
        return new Slice(
          linkify(slice.content),
          slice.openStart,
          slice.openEnd
        );
      },
    });

    return () => {
      viewRef?.current && viewRef.current.destroy();
    };
  }, []);

  return { content };
};
