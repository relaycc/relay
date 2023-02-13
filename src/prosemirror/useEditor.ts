import { MutableRefObject, useCallback, useEffect, useState } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { defaultSchema, imageSettings } from "./defaultSchema";
import { exampleSetup } from "prosemirror-example-setup";
import { mdSerializer } from "./markdownSerializer";
import { mdParser } from "./markdownParser";
import { Node, Slice } from "prosemirror-model";
import { linkify } from "./linkify";
import { imagePlugin } from "prosemirror-image-plugin";
import { startImageUpload } from "prosemirror-image-plugin";
import "prosemirror-image-plugin/dist/styles/common.css";

export const useEditor = (viewRef: MutableRefObject<EditorView | null>) => {
  const [content, setContent] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

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
          ...exampleSetup({ schema: defaultSchema, menuBar: false }),
          imagePlugin(defaultSchema, { ...imageSettings }),
        ],
      }),
      dispatchTransaction: (tr) => {
        if (!viewRef.current) {
          return;
        }
        const view = viewRef.current;

        console.log({ tr });
        const newState = view.state.apply(tr);
        setIsEmpty(newState.selection.empty);
        view.updateState(newState);
        const md = mdSerializer.serialize(newState.doc);
        console.log({ newState, md });
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

  const handleUploadAttachment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        viewRef.current?.state.selection.$from.parent.inlineContent &&
        e.target.files?.length
      ) {
        const file = e.target.files[0];
        startImageUpload(
          viewRef.current,
          file,
          file.name,
          imageSettings,
          defaultSchema,
          viewRef.current.state.selection.from
        );
      }
    },
    []
  );

  return { content, isEmpty, handleUploadAttachment };
};
