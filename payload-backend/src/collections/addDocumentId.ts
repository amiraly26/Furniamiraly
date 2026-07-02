export const addDocumentId = ({ doc }) => {
  if (!doc) return doc
  return {
    ...doc,
    documentId: doc.documentId || String(doc.id),
  }
}
