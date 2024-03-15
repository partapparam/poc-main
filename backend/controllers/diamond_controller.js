import axios from "axios";
import { DIAMOND_POC_TOKEN } from "../environments/environment.js";
import { diamond_table } from "../environments/tableConfig.js";
import { connection } from "../connection/pg.js";

export const fetchDiamondPrice = async (req, res) => {
  const { fetchingData, type } = req.body;
  const clientIP = req?.headers['x-real-ip'] || req?.headers['x-forwarded-for'] || '54.197.48.229';
  //   console.log(fetchingData, "fetchingData");
    // console.log(clientIP, "clientIP");
  //   console.log(type, "type");
  //   console.log(req, "Requestttt");
  //   console.log("token", DIAMOND_POC_TOKEN);
  let urlToHit;

  if (type === "noFeedBack") {
    urlToHit =
      "https://yxabbln42lm2dkehpywaeo6zsa0ajthh.lambda-url.us-east-1.on.aws/diamond-price";
  } else if (type === "positive") {
    urlToHit =
      "https://yxabbln42lm2dkehpywaeo6zsa0ajthh.lambda-url.us-east-1.on.aws/feedback-positive";
  } else if (type === "negative") {
    urlToHit =
      "https://yxabbln42lm2dkehpywaeo6zsa0ajthh.lambda-url.us-east-1.on.aws/feedback-negative";
  }
  //   console.log(urlToHit)

  try {
    const config = {
      method: "POST",
      url: urlToHit,
      data: JSON.stringify(fetchingData),
      headers: {
        "client-ip": clientIP,
        token: DIAMOND_POC_TOKEN,
        "Content-Type": "application/json",
      },
    };
    // console.log(config)

    const response = await axios.request(config);
    const data = response.data;

    if (data?.Price_per_carat) {
      res.send({
        data: data,
        price: data?.Price_per_carat || "Some Data",
      });
    } else {
      res.send({
        data: data,
        message: data?.detail[0]?.msg || data?.detail || "There was some error",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const fetchCalculations = async (req, res) => {
  const query = `SELECT * FROM ${diamond_table.schemaTableName} ORDER BY ${diamond_table.log_time} DESC`

  connection.query(query, (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        message: "Error fetching calculations",
        error: error?.message,
      });
    } else {
      console.log(results?.rows?.length);
      if (results?.rows?.length > 0) {
        res.send(results?.rows);
      } else {
        res
          .status(404)
          .json({ message: "No records currently in iGraph" });
      }
    }
  });
};
