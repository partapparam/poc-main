import { Client } from './Client.js'

export const amariAPI = async (formdata) => {
    try {
      return await Client.post('/amariAPI/amariFetch', formdata);
    } catch(error){
      return error;
    }
}
