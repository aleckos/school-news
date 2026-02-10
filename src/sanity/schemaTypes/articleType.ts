import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const articleType = defineType({
  name: 'article',
  title: 'Άρθρο',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Τίτλος',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Συντάκτης',
      type: 'string',
      initialValue: 'Ανδριάνα',
    }),
    defineField({
      name: 'category',
      title: 'Κατηγορία',
      type: 'string',
      options: {
        list: [
          {title: 'Πολιτισμός', value: 'ΠΟΛΙΤΙΣΜΟΣ'},
          {title: 'Γεωγραφία', value: 'ΓΕΩΓΡΑΦΙΑ'},
          {title: 'Περιβάλλον', value: 'ΠΕΡΙΒΑΛΛΟΝ'},
          {title: 'Νέα', value: 'ΝΕΑ'},
          {title: 'Αθλητικά', value: 'ΑΘΛΗΤΙΚΑ'},
          {title: 'Επιστήμη', value: 'ΕΠΙΣΤΗΜΗ'},
        ],
      },
    }),
    defineField({
      name: 'grade',
      title: 'Τάξη',
      type: 'string',
      initialValue: 'Γ2',
    }),
    defineField({
      name: 'issue',
      title: 'Τεύχος',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'date',
      title: 'Ημερομηνία',
      type: 'string',
      initialValue: () => new Date().toLocaleDateString('el-GR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
    }),
    defineField({
      name: 'layout',
      title: 'Επιλογή Template',
      type: 'string',
      options: {
        list: [
          {title: 'Κλασικό (Default)', value: 'default'},
          {title: 'Εντυπωσιακό (Highlight)', value: 'highlight'},
          {title: 'Απλό (Minimal)', value: 'minimal'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'content',
      title: 'Περιεχόμενο (Παράγραφοι)',
      type: 'array',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'image',
      title: 'Φωτογραφία Άρθρου',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
