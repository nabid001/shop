import {defineType, defineField} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'

export const productSchema = defineType({
  title: 'Product',
  name: 'product',
  icon: ProjectsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Private', value: 'private'},
          {title: 'Public', value: 'public'},
        ],
      },
      initialValue: 'private',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'flag',
      title: 'Product Flag',
      type: 'string',
      options: {
        list: [
          {title: 'Featured', value: 'featured'},
          {title: 'None', value: 'none'},
        ],
      },
      initialValue: 'none',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
    }),

    {
      type: 'array',
      name: 'variants',
      title: 'Variant',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              title: 'Variant Name',
              name: 'variantName',
              type: 'string',
            }),
            defineField({
              name: 'size',
              title: 'Sizes',
              type: 'array',
              of: [
                {
                  type: 'string',
                  options: {
                    list: ['SM', 'M', 'L', 'XL', 'XXL'],
                  },
                },
              ],
            }),
            defineField({
              title: 'Color',
              name: 'color',
              type: 'reference',
              to: [{type: 'color'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              title: 'Price',
              name: 'price',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              title: 'Sale Price',
              name: 'salePrice',
              type: 'number',
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              title: 'Stock Quantity',
              name: 'stock',
              type: 'number',
              initialValue: 0,
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              title: 'Image',
              name: 'image',
              type: 'reference',
              to: [{type: 'media'}],

              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    defineField({
      title: 'Author',
      name: 'author',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'totalOrdered',
      title: 'Total Ordered',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      type: 'number',
      name: 'totalViews',
      title: 'Total Views',
      initialValue: 0,
    }),

    // defineField({
    //   name: 'multiImages',
    //   title: 'Gallery Images',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'media'}]}],
    // }),
  ],
})
