export const product = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "name",
      title: "Product name",
      type: "string",
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    {
      name: "type",
      title: "product type",
      type: "string",
    },
    {
        name: "price",
        title: "product price",
        type: "number",
      },

      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
      },
      {
        name: "category",
        title: "product category",
        type: "reference",
        to:[
          {
            type:"category"
          }
        ],
      },
      {
        name: 'details',
        title: 'Details',
        type: 'array',
        of: [{ type: 'block' }],
      },
      {
        name: 'care',
        title: 'Care',
        type: 'array',
        of: [{ type: 'block' }],
      },
  ],
};
