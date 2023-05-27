import pool from "../database/connect.js";
import { v4 as uuidv4 } from "uuid";

export const addUserFunction = (
  tenkh,
  ngaysinh,
  cmnd,
  noicap,
  quoctich,
  ngonngu,
  gmail
) => {
  // lấy dữ liệU từ client gửi về
  const query = `INSERT INTO khachhang ( tenkh, ngaysinh, cmnd ,noicap,quoctich,ngonngu,gmail)
    SELECT '${tenkh}', '${ngaysinh}','${cmnd}','${noicap}' , '${quoctich}','${ngonngu}','${gmail}'
    WHERE NOT EXISTS (
        SELECT 1 FROM khachhang 
        WHERE cmnd = '${cmnd}'
    );`;
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
    }
    console.log(results);
  });
};

export const addUser = (req, res) => {
  // thêm mới chuyến bay dành cho admin
  const data = req.body; // lấy dữ liệU từ client gửi về

  try {
    addUserFunction(
      data.tenkh,
      data.ngaysinh,
      data.cmnd,
      data.noicap,
      data.quoctich,
      data.ngonngu,
      data.gmail
    );
    return res.send({
      status: 200,
      data: "success",
    });
  } catch (error) {
    return res.status(403).json({ messages: "Forbidden2" });
  }
};
