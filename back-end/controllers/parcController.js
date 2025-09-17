const sql = require("mssql");
const config = require("../config/dbConfig");

const parc_statistics = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`        
      select Status,COUNT(*) count from rentway.dbo.parc_actif
      group by status 
      order by count desc
    `);

    const total = result.recordset.reduce((acc, curr) => acc + curr.count, 0);
      
    res.json({ total : total, result: result.recordset });
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const top_marques = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`
      select v.brandId,  count(*) Number
      from rentway.dbo.RA RA
        left join rentway.dbo.RA_Vehicles rav on rav.RA = ra.Number
        left join rentway.dbo.Vehicle v on rav.Unit_Number = v.unitnr
      where RA.Creation_date >= '01-01-2020' and v.brandId is not null and substituted_Vehicle = 0
      group by v.brandId
      --order by Number desc
    `);
    res.json(result.recordset);
  }
  catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = { parc_statistics, top_marques };
