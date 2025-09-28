import {defineField, defineType} from 'sanity'

export const colorSchema = defineType({
  name: 'colors',
  title: 'Colors',
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
