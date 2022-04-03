///// Virtual DOM Tree 구현 /////

let VDOMTree = {
  tag: "div",
  attributes: { id: "app" },
  children: [
    {
      tag: "ul",
      attributes: {},
      children: [
        {
          tag: "li",
          attributes: { calss: "list" },
          children: [],
          textContent: "List 1",
        },
        {
          tag: "li",
          attributes: { class: "list" },
          children: [],
          textContent: "List 2",
        },
      ],
    },
    {
      tag: "P",
      attributes: {},
      children: [],
      textContent: "Paragraph",
    },
  ],
};
