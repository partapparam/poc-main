import { gtm_js_sitetable, gtm_ip } from "../environments/tableConfig.js";
import { connection } from "../connection/pg.js";
import { v4 as uuidv4 } from 'uuid';

export const insertSite = async (req, res) => {
    // console.log(req.body)
    const { site_name } = req.body;
    const query = `SELECT JSON_AGG(JSON_BUILD_OBJECT('site_id', ${gtm_js_sitetable.site_id}, 'site_name', ${gtm_js_sitetable.site_name})) AS sites FROM ${gtm_js_sitetable.schemaTableName}`
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching data' });
      } else {
        const sites = results.rows[0].sites;
        // console.log(sites)
        const filteredArray = sites?.filter((site) => site.site_name.includes(site_name) || site_name.includes(site.site_name))
        if (filteredArray && filteredArray.length > 0) {
            const site_id = filteredArray[0].site_id;
            res.send({ site_id })
        } else {
            const uuid = uuidv4();
            const shortUuid = uuid.replace(/-/g, '').substring(0, 16);
            // console.log(shortUuid)
            const insertQuery = `INSERT INTO ${gtm_js_sitetable.schemaTableName} (${gtm_js_sitetable.site_id}, ${gtm_js_sitetable.site_name}, ${gtm_js_sitetable.createddate}) VALUES ($1, $2, current_timestamp)`;
            const insertValues = [shortUuid, site_name]
            connection.query(insertQuery, insertValues, (error, results) => {
                if (error) {
                    res.status(500).json({ message: 'Error fetching data' });
                } else {
                    res.send({ site_id: shortUuid })
                }
            })
        }
      }
    });   
  }

export const getSiteInfo = async (req, res) => {
  const query = `SELECT ${gtm_ip.schemaTableName}.${gtm_ip.id}, ${gtm_ip.schemaTableName}.${gtm_ip.site_id}, ${gtm_js_sitetable.schemaTableName}.${gtm_js_sitetable.site_name}, ${gtm_ip.schemaTableName}.${gtm_ip.ip}, ${gtm_ip.schemaTableName}.${gtm_ip.timestamp}
  FROM ${gtm_ip.schemaTableName}
  INNER JOIN ${gtm_js_sitetable.schemaTableName} ON ${gtm_ip.schemaTableName}.${gtm_ip.site_id} = ${gtm_js_sitetable.schemaTableName}.${gtm_js_sitetable.site_id}
  ORDER BY ${gtm_ip.schemaTableName}.${gtm_ip.timestamp} DESC;`
  // console.log(query)
  connection.query(query, (error, results) => {
    if (error) {
      console.log(error)
      res.status(500).json({ message: "Error fetching data" });
    } else {
      // console.log(results.rows);
      res.send({ siteInfo: results.rows })
    }
  })
}