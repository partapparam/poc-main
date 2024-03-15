import { tenant_table } from "../environments/tableConfig.js";
import { connection } from "../connection/pg.js";

export const getTest = async (req, res) => {
    // const {tenant_id} = req.body;
    // console.log(tenant_id);
    const query = `SELECT * FROM ${tenant_table.schemaTableName}`
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        res.send(results.rows);
        // console.log(results);
      }
    });   
  }