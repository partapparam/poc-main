import { Client } from './Client.js'

export const fetchSemantic = async (formdata) => {
    try {
      return await Client.post('/semantic/fetchSemantic', formdata);
    } catch(error){
      return error;
    }
}
