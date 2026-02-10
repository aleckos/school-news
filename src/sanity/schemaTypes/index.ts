import { type SchemaTypeDefinition } from 'sanity'
import { articleType } from './articleType'
import { settingsType } from './settingsType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [articleType, settingsType],
}