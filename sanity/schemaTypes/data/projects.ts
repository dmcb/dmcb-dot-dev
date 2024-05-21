import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projects',
  type: 'document',
  title: 'Projects',
  fields: [
    defineField({
      name: 'orderRank',
      type: 'string',
      title: 'Order',
      hidden: true,
    }),
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      type: 'url',
      title: 'Link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'github',
      type: 'url',
      title: 'GitHub',
    }),
    defineField({
      name: 'description',
      type: 'array',
      title: 'Description',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'video',
      type: 'file',
      title: 'Video',
      validation: (rule) => {
        // require only mp4
        return rule.custom((file) => {
          if (file && file.type !== 'video/mp4') {
            return 'Only mp4 files are allowed'
          }
          return true
        })
      },
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{type: 'accessibleImage'}],
      options: {
        layout: 'grid',
      },
    }),
  ],
})
