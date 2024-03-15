import axios from "axios"
// import ogs from 'open-graph-scraper';
import {
  TOKEN,
  BEARER_AUTH,
  AMARI_BEARER_AUTH,
  AMARI_LAMBDA_LINK,
} from "../environments/environment.js"

const fetchAmari = async (req, res) => {
  const { question } = req.body
  console.log(question)
  const payload = {
    query: question,
  }
  try {
    const config = {
      method: "POST",
      url: "http://3.236.218.40:443/amari_nlp",
      data: payload,
      headers: {
        token: TOKEN,
        Authorization: BEARER_AUTH,
        "Content-Type": "application/json",
      },
    }

    const response = await axios.request(config)

    const responseData = response.data
    console.log(responseData, "ressppppp")

    // <------------------------- Scrape meta information from sources START ----------------------------------------->

    const scrapePayload = {
      resFromAmari: responseData.response,
    }

    const scrapeConfig = {
      method: "POST",
      url: AMARI_LAMBDA_LINK,
      data: scrapePayload,
      headers: {
        Authorization: AMARI_BEARER_AUTH,
        "Content-Type": "application/json",
      },
    }

    const scrapeResponse = await axios.request(scrapeConfig)
    console.log(scrapeResponse.data)

    // <------------------------- Scrape meta information from sources END ----------------------------------------->

    res.status(200).json({
      responseData: responseData.response,
      sources: scrapeResponse.data.meta_info,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: "error",
      error: error,
      message: "Server down, please try after sometime",
    })
  }
}

export default fetchAmari
