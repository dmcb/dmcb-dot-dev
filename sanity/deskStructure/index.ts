import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'

export const structure = (S: any, context: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      orderableDocumentListDeskItem({type: 'projects', title: 'Projects', S, context}),
    ])
