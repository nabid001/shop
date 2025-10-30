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
      title: 'Category',
      name: 'category',
      type: 'reference',
      to: [{type: 'category'}],
    }),

    {
      type: 'object',
      name: 'variants',
      title: 'Variant',
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
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{type: 'color'}],
            },
          ],
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
          validation: (Rule) => Rule.required().min(0),
        }),
        defineField({
          title: 'Image',
          name: 'image',
          type: 'image',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          title: 'Image Gallery',
          name: 'imageGallery',
          type: 'array',
          of: [{type: 'image'}],
        }),
      ],
      validation: (Rule) => Rule.required(),
    },

    defineField({
      name: 'totalSold',
      title: 'Total Sold',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      type: 'number',
      name: 'totalViews',
      title: 'Total Views',
      initialValue: 0,
    }),

    defineField({
      name: 'featured',
      title: 'Is Featured',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      title: 'New Arrival',
      name: 'newArrival',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
