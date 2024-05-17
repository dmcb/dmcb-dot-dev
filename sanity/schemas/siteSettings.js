export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
    },
    {
      name: "portrait",
      type: "image",
      title: "Portrait",
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
        },
      ],
    },
  ],
};
