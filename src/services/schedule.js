
import { findDocumentsForDueDate } from '../repositories/document.repository.js';

export async function findDueDocuments() {
    let today = new Date();
    let sevenMoreDays = today.getTime() + 7*24*60*60*1000 // 7 dias a partir de hoje
    let due_date = new Date(sevenMoreDays)

    let res = await findDocumentsForDueDate(due_date)
    console.log('documentos perto de vencer: ', res)
    
}

