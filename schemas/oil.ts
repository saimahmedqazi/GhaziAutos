import type { Rule } from 'sanity'

export default {
  name: 'oil',
  type: 'document',
  title: 'Oil',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Product Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'image',
      type: 'image',
      title: 'Product Image',
      options: { hotspot: true }
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description'
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price (PKR)'
    },
    {
      name: 'oldPrice',
      type: 'number',
      title: 'Old Price (Optional)',
      description: 'If discounted, enter the old/original price'
    },
    {
      name: 'priceNote',
      type: 'string',
      title: 'Price Note',
      description: 'Optional note like “Limited Stock” or “Free Delivery”'
    },
    {
      name: 'tag',
      type: 'string',
      title: 'Tag',
      options: {
        list: [
          { title: 'Best Seller', value: 'best-seller' }
        ]
      },
      description: 'Mark as Best Seller (optional)'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Engine Oil (Petrol)', value: 'engine-oil-petrol' },
          { title: 'Engine Oil (Diesel)', value: 'engine-oil-diesel' },
          { title: 'Gear Oil', value: 'gear-oil' },
          { title: 'Transmission Fluid (ATF)', value: 'transmission-fluid' },
          { title: 'Power Steering Fluid', value: 'power-steering-fluid' },
          { title: 'Brake Fluid', value: 'brake-fluid' },
          { title: 'Radiator Coolant', value: 'coolant' },
          { title: 'Grease (General Purpose)', value: 'grease' },
          { title: '2-Stroke Oil', value: '2-stroke-oil' },
          { title: 'Fork Oil (Motorcycles)', value: 'fork-oil' },
          { title: 'Hydraulic Oil', value: 'hydraulic-oil' },
          { title: 'Differential Oil', value: 'differential-oil' },
          { title: 'Chain Lubricant', value: 'chain-lube' },
          { title: 'Radiator Antifreeze', value: 'antifreeze' }
        ]
      }
    }
  ]
}
