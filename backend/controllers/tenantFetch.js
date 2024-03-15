import axios from "axios"
import { TOKEN, BEARER_AUTH } from "../environments/environment.js"

/**
 *
 * Start Helper Functions
 */
const getConfig = (session, payload) => ({
  method: "POST",
  url: "http://3.236.218.40:443/iquery",
  data: payload,
  headers: {
    token: TOKEN,
    Authorization: BEARER_AUTH,
    "Content-Type": "application/json",
    session: session,
    proxy: "False",
  },
})

const doAxiosRequest = async (session, payload) => {
  return await axios.request(getConfig(session, payload))
}

const checkResponseDataIsJson = (response) => {
  let responseData
  try {
    console.log("valid  json")
    responseData = JSON.parse(response.data.response)
  } catch {
    console.log("invalid json")
    responseData = response.data.response
  }
  return responseData
}

/**
 *
 * @param {Object} responseData
 * @returns Answer string from the response
 */
const checkAnswersResponse = (responseData) => {
  const checkResponse = responseData.response
    ? responseData.response
    : responseData.answer
    ? responseData.answer
    : responseData
  console.log("The res ", checkResponse)
  return checkResponse
}

/**
 * Start Scrape Meta Information from the sources
 * @param {string} url
 * @returns Title of Article or Link
 */
const createTitle = (url) => {
  const splitSource = url.split("/")
  let urlTitle =
    splitSource[splitSource.length - 1] === ""
      ? splitSource[splitSource.length - 2]
      : splitSource[splitSource.length - 1]
  urlTitle = urlTitle.replaceAll(/_/g, "-")
  const splitTitle = urlTitle.split("-")
  const title = []
  for (let word of splitTitle) {
    word = word[0].toUpperCase() + word.substring(1)
    word = word.split(".")[0]
    title.push(word)
  }
  return title.join(" ")
}

/**
 * Create structured array of source objects
 * @param {Array} sources
 * @returns Array of structured Source Objects (sitename, title, url, image)
 */
const buildSources = (sources) => {
  const sourcesArr = []
  for (const source of sources) {
    const currentSource = {}
    currentSource.siteName = source.title
    currentSource.url = source.source
    currentSource.image = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${currentSource.url}&size=16`
    currentSource.title = createTitle(currentSource.url)
    sourcesArr.push(currentSource)
  }
  return sourcesArr
}

const tenantFetch = async (req, res) => {
  const { question, session } = req.body
  const payload = {
    query: question,
  }
  try {
    const response = await doAxiosRequest(session, payload)
    //   parse the JSON response
    let responseData = checkResponseDataIsJson(response)
    // console.log("responseData = ", responseData)
    const checkResponse = checkAnswersResponse(responseData)
    // console.log("The res ", checkResponse)
    if (checkResponse.includes("I cannot answer that") && session == "True") {
      // rerun the query to Serp using `session=False`
      console.log("rerun")
      const newResponse = await doAxiosRequest("False", payload)
      // console.log("new Response", newResponse.data)
      responseData = checkResponseDataIsJson(newResponse)
    }
    console.log("\n\nResponse-\n\n####", responseData)
    // build sources
    let sources = []
    // ensure sources exist
    if (responseData.sources) {
      sources = buildSources(responseData.sources)
    }

    res.status(200).json({
      responseData: responseData.answer,
      sources: sources,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: "error",
      error: error,
      message: "Server Down, please try again.",
    })
  }
}

export default tenantFetch
