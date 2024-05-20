import {defineField, defineType} from 'sanity'

export default defineType({
  type: 'image',
  title: 'Accessible Image',
  name: 'accessibleImage',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'asset.originalFilename',
      subtitle: 'alt',
      media: 'asset',
    },
  },
})
