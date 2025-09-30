import {defineField, defineType} from 'sanity'
import {ColorWheelIcon} from '@sanity/icons'

export const colorSchema = defineType({
  title: 'Color',
  name: 'color',
  icon: ColorWheelIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
