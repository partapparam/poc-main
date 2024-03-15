import { Client } from './Client.js'

export const fetchDiamondPrice = async (formdata) => {
    try {
      return await Client.post('/diamond/fetchDiamondPrice', formdata);
    } catch(error){
      return error;
    }
}

export const fetchCalculations = async (formdata) => {
  try {
    return await Client.post('/diamond/fetchCalculations', formdata);
  } catch(error){
    return error;
  }
}