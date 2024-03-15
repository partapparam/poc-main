import { Client } from "./Client.js"

export const tenantAPI = async (formdata) => {
  try {
    return await Client.post("/tenantAPI/tenantFetch", formdata)
  } catch (error) {
    return error
  }
}
