import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Ρυθμίσεις Εφημερίδας',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος Εφημερίδας',
      type: 'string',
      initialValue: 'ΤΑ ΝΕΑ ΤΟΥ ΣΧΟΛΕΙΟΥ',
    }),
    defineField({
      name: 'schoolName',
      title: 'Όνομα Σχολείου',
      type: 'string',
      initialValue: 'Ράλλεια Πειραματικά Δημοτικά Σχολεία Πειραιά',
    }),
    defineField({
      name: 'currentIssue',
      title: 'Τρέχον Τεύχος',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'theme',
      title: 'Θέμα Εμφάνισης (Global Template)',
      type: 'string',
      options: {
        list: [
          {title: 'Πολύχρωμο (Παιδικό)', value: 'playful'},
          {title: 'Κλασικό (Εφημερίδα)', value: 'classic'},
          {title: 'Μοντέρνο (Clean)', value: 'modern'},
          {title: 'Σκοτεινό (Dark)', value: 'dark'},
        ],
      },
      initialValue: 'playful',
    }),
  ],
})
