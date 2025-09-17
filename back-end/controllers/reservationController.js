const sql = require("mssql");
const config = require("../config/dbConfig");

const ca_reservation = async (req, res) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`        
        SELECT 
            an,mois moisnum,
              CASE mois 
        WHEN 1 THEN 'Jan ' + CAST(an AS VARCHAR(4))
        WHEN 2 THEN 'Fév ' + CAST(an AS VARCHAR(4))
        WHEN 3 THEN 'Mars ' + CAST(an AS VARCHAR(4))
        WHEN 4 THEN 'Avr ' + CAST(an AS VARCHAR(4))
        WHEN 5 THEN 'Mai ' + CAST(an AS VARCHAR(4))
        WHEN 6 THEN 'Juin ' + CAST(an AS VARCHAR(4))
        WHEN 7 THEN 'Juil ' + CAST(an AS VARCHAR(4))
        WHEN 8 THEN 'Août ' + CAST(an AS VARCHAR(4))
        WHEN 9 THEN 'Sept ' + CAST(an AS VARCHAR(4))
        WHEN 10 THEN 'Oct ' + CAST(an AS VARCHAR(4))
        WHEN 11 THEN 'Nov ' + CAST(an AS VARCHAR(4))
        WHEN 12 THEN 'Déc ' + CAST(an AS VARCHAR(4))
        END as mois,
           -- COUNT(*) as nbr_reservation,
            SUM(montantHT) as mt_ht
           -- SUM(nb_jour) as nbr_jours
        FROM [RENTWAY_ALSYS].[dbo].[LAAB_000_RESERVATION]
        WHERE YEAR(creation_date) >= (YEAR(GETDATE())-1) and  YEAR(creation_date) < (YEAR(GETDATE())+1)
        GROUP BY an, mois
        ORDER BY an, moisnum;
   `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { ca_reservation };
