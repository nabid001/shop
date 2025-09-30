import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const mediaSchema = defineType({
  title: 'Media',
  icon: ImageIcon,
  name: 'media',
  type: 'document',
  fields: [
    defineField({
      title: 'Name',
      name: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required().error('Image is Required!'),
          fields: [
            {
              type: 'string',
              name: 'alt',
              title: 'Alt',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
})
