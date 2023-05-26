import pool from "../database/connect.js";
import { v4 as uuidv4 } from 'uuid';


export const addUser = (req, res) => { // thêm mới chuyến bay dành cho admin
    const data = req.body; // lấy dữ liệU từ client gửi về
    const query = `INSERT INTO khachhang (makh, tenkh, ngaysinh, cmnd , noicap,quoctich)
    SELECT '${data.tenkh}', '${data.ngaysinh}','${data.cmnd}','${data.noicap}','${data.quoctich}'
    WHERE NOT EXISTS (
        SELECT 1 FROM khachhang 
        WHERE cmnd = '${data.cmnd}'
    );`;
    console.log(query);
    try {
      pool.query(query, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(403).json({ messages: "Forbidden1", error });
        }
        // console.log(ghep);
        return res.send({
          status: 200,
          data: "success",
        });
      });
    } catch (error) {
      return res.status(403).json({ messages: "Forbidden2" });
    }
};