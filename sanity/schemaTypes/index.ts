import { type SchemaTypeDefinition } from 'sanity'
import product from '../../schemas/product' 
import oil from '@/schemas/oil'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product,oil],
  
}
