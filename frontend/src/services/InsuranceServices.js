import { Client } from './Client.js'

export const fetchAccountData = async (formdata) => {
    try {
      return await Client.post('/insurance/fetchAccountsByName', formdata);
    } catch(error){
      return error;
    }
}
