import { Client } from './Client.js'

export const insertSite = async (formdata) => {
    try {
      return await Client.post('/gtm/insertSite', formdata);
    } catch(error){
      return error;
    }
}

export const getSiteInfo = async (formdata) => {
  try {
    return await Client.post('/gtm/getSiteInfo', formdata);
  } catch(error){
    return error;
  }
}