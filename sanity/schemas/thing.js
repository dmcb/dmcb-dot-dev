export default {
  name: 'thing',
  type: 'document',
  title: 'Thing',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text'
        }
      ]
    }
  ]
}