import { Fragment, Node } from "prosemirror-model";

// const url = /\bhttps?:\/\/[\w_\/\.]+/g;
export const url =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/g;

// Expand urls in text nodes in a given fragment to linked text
// (and recursively go through child nodes)
export const linkify = (fragment: Fragment) => {
  const linkified: Node[] = [];
  fragment.forEach(function (child) {
    if (child.isText) {
      const text = child.text as string;
      let pos = 0,
        match;

      while ((match = url.exec(text))) {
        const start = match.index;
        const end = start + match[0].length;
        const link = child.type.schema.marks["link"];

        // simply copy across the text from before the match
        if (start > 0) {
          linkified.push(child.cut(pos, start));
        }

        const urlText = text.slice(start, end);
        linkified.push(
          child
            .cut(start, end)
            .mark(link.create({ href: urlText }).addToSet(child.marks))
        );
        pos = end;
      }

      // copy over whatever is left
      if (pos < text.length) {
        linkified.push(child.cut(pos));
      }
    } else {
      linkified.push(child.copy(linkify(child.content)));
    }
  });

  return Fragment.fromArray(linkified);
};
