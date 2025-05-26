export default {
    name: 'product',
    type: 'document',
    title: 'Products',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Product Name'
      },
      {
        name: 'image',
        type: 'image',
        title: 'Product Image',
        options: { hotspot: true }
      },
      {
        name: 'price',
        type: 'number',
        title: 'Price (PKR)'
      },
      {
        name: 'category',
        type: 'string',
        title: 'Category',
        options: {
          list: [
            { title: 'Engine Parts', value: 'engine' },
            { title: 'Brakes', value: 'brakes' },
            { title: 'Lubricants', value: 'lubricants' }
          ]
        }
      }
    ]
  }