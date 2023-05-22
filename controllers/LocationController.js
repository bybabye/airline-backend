import pool from "../database/connect.js";
import { v4 as uuidv4 } from 'uuid';
export const getListLocation =  (req, res) => {
  const query = `SELECT * from sanbay`;
  try {
      pool.query(query, (error, results) => {
      if (error) {
        return res.status(403).json({ messages: "Forbidden1", error });
      }
      // console.log(ghep);
      return res.send({
        status: 200,
        data: results.rows,
      });
    });
  } catch (error) {
    return res.status(403).json({ messages: "Forbidden2" });
  }
};
