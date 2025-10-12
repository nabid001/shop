import {defineField, defineType} from 'sanity'

import {DashboardIcon} from '@sanity/icons'

export const bannerSchema = defineType({
  title: 'Hero Banner',
  name: 'banner',
  icon: DashboardIcon,
  type: 'document',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'string',
    }),
    defineField({
      title: 'Primary Button',
      name: 'primaryButton',
      type: 'object',
      fields: [
        defineField({
          title: 'Name',
          name: 'name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Url',
          name: 'url',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Secondary Button',
      name: 'secondaryButton',
      type: 'object',
      fields: [
        defineField({
          title: 'Name',
          name: 'name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Url',
          name: 'url',
          type: 'url',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      title: 'Status',
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'Private', value: 'private'},
          {title: 'Public', value: 'public'},
        ],
      },
    }),
  ],
})
