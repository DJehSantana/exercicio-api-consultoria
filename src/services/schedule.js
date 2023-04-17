
import { findDocumentsForDueDate } from '../repositories/document.repository.js';

export async function job() {
    console.log('entered job')
    let today = new Date();
    let sevenMoreDays = today.getTime() + 7*24*60*60*1000 // 7 days from today
    let due_date = new Date(sevenMoreDays)
    console.log(due_date)

    let res = await findDocumentsForDueDate(due_date)
    console.log('documents', res)
    
}

