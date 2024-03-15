import { Client } from './Client.js'

export const getTest = async (formdata) => {
    try {
      return await Client.post('/test/getTest', formdata);
    } catch(error){
      return error;
    }
}