

import { getByParams } from './document.service.js';

export async function findDueDocuments() {
    try {
        let today = new Date();
        let sevenMoreDays = today.getTime() + 7*24*60*60*1000 // 7 dias a partir de hoje

        let res = await getByParams({data_vencimento: sevenMoreDays})

        if (res) {
            console.log('documentos perto de vencer: ', res)
        }
        

    } catch(e) {
        console.log(e)
    }
    
}

