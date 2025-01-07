import { DocumentScope, DocumentInsertResponse, MangoQuery, MaybeDocument } from 'nano';
import { connectToDatabase } from '../../infrastructure/database/connections';

// Insert Document function
export const insertDocument = async <T extends MaybeDocument>(
  document: T,
): Promise<DocumentInsertResponse> => {
  const db: DocumentScope<T> = connectToDatabase() as DocumentScope<T>;
  return db.insert(document);
};

// Get Document function
export const getDocument = async <T>(id: string): Promise<T | null> => {
  const db: DocumentScope<T> = connectToDatabase() as DocumentScope<T>;
  try {
    return await db.get(id);
  } catch (error: any) {
    if (error.statusCode === 404) {
      return null;
    }
    throw error;
  }
};

// Find Documents function
export const findDocuments = async <T>(query: MangoQuery): Promise<T[]> => {
  const db: DocumentScope<T> = connectToDatabase() as DocumentScope<T>;
  const result = await db.find(query);
  return result.docs as T[];
};

// Update Document function
export const updateDocument = async <T extends MaybeDocument>(
  document: T,
): Promise<DocumentInsertResponse> => {
  const db: DocumentScope<T> = connectToDatabase() as DocumentScope<T>;
  return db.insert(document);
};

// Delete Document function
export const deleteDocument = async (id: string, rev: string): Promise<void> => {
  const db: DocumentScope<any> = connectToDatabase();
  await db.destroy(id, rev);
};
