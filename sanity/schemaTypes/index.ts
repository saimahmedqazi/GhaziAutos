import { type SchemaTypeDefinition } from 'sanity'
import product from '../../schemas/product' 
import oil from '@/schemas/oil'
import blog from '@/schemas/blog'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,oil,blog],
  
}
