import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Θέτουμε σε false για να βλέπουμε τις αλλαγές αμέσως
})
