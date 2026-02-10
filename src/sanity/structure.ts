import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Διαχείριση Εφημερίδας')
    .items([
      // Άρθρα
      S.documentTypeListItem('article').title('Άρθρα'),
      S.divider(),
      // Ρυθμίσεις (Singleton)
      S.listItem()
        .title('Ρυθμίσεις Εφημερίδας')
        .id('settings')
        .child(
          S.document()
            .schemaType('settings')
            .documentId('settings')
        ),
      // Φιλτράρισμα για να μην εμφανίζονται διπλά
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['article', 'settings'].includes(item.getId()!),
      ),
    ])