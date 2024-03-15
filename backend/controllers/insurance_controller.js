import { insurance_table } from "../environments/tableConfig.js";
import { connection } from "../connection/pg.js";

export const fetchAccountsByName = async (req, res) => {
  const { fetchingData } = req.body;
  const { companies } = fetchingData;
  console.log(companies);

  const conditions = companies.map(({ company, country }) => {
    return `
      (
        LOWER(${insurance_table.account_name}) LIKE LOWER('%${company}%')
        AND
        LOWER(${insurance_table.account_country}) = LOWER('${country}')
      )
    `;
  });

  const orderByClauses = companies.map(({ company }) => {
    return `CASE WHEN LOWER(${insurance_table.account_name}) = LOWER('${company}') THEN 0 ELSE 1 END`;
  });

  const dynamicQuery = `
    SELECT *
    FROM ${insurance_table.schemaTableName}
    WHERE ${conditions.join(" OR ")}
    ORDER BY ${orderByClauses.join(", ")}
    LIMIT 1;
  `;

  // console.log(dynamicQuery);


  connection.query(dynamicQuery, (error, results) => {
    if (error) {
      console.log(error);

      // If key-value pair of actual error message is to be known (future purpose)
      // const serializedError = {};
      // Object.getOwnPropertyNames(error).forEach((key) => {
      //   serializedError[key] = error[key];
      // });

      res.status(500).json({
        message: "Error fetching data",
        error: error?.message,
      });
    } else {
      console.log(results?.rows?.length);
      if (results?.rows?.length > 0) {
        res.send(results?.rows);
      } else {
        res
          .status(404)
          .json({ message: "No records match this combination in iGraph" });
      }
    }
  });
};
