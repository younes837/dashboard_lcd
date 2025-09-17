const sql = require("mssql");
const config = require("../config/dbConfig");

const parc_statistics = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`        
            select Status,COUNT(*) count from rentway.dbo.parc_actif
group by status
   `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { parc_statistics };
