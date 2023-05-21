import pool from "../database/connect.js";
import { v4 as uuidv4 } from 'uuid';
export const addFlight =  (req, res) => { // thêm mới chuyến bay dành cho admin
  const data = req.body; // lấy dữ liệU từ client gửi về
  const query = `INSERT INTO chuyenbay (macb,masbdi,masbden,giodi) VALUES ('${uuidv4()}','${data.start}','${data.end}','2023-05-21 11:30')`;
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
/** 
 * tìm kiếm chuyến bay theo mã chuyến bay và giờ khởi hành
*/
export const searchFlight = (req,res) => {
    const data = req.body; // lấy dữ liệU từ client gửi về

    // const query = `SELECT *,giodi + INTERVAL '110 minutes' AS gioden
    // FROM chuyenbay
    // WHERE masbdi = '${data.sbdi}' AND masbden = '${data.sbden}' AND DATE(giodi) = '${data.time}'
    // ORDER BY giodi;`

    /** câu lệnh kết nối bảng chuyến bay và bảng sân bay tìm và tìm những thông tin từ client gửi về và trả ngược lại  */
    /*
    sân bay đi :  Departure airport (D)
    sân bay đến :  Arrival airport (A)
    chuyến bay : Flight (F)
    địa điểm : location (L)
    * */
    const query = `
     SELECT F.macb AS id,F.giodi AS DepartureTime ,F.giodi + INTERVAL '110 minutes' AS ArrivalTime,
     D.tensanbay AS DepartureAirport, D.tinh AS DepartureProvince,
     A.tensanbay AS ArrivalAirport, A.tinh AS ArrivalProvince
     FROM chuyenbay F
     JOIN sanbay D ON F.masbdi = D.masanbay
     JOIN sanbay A ON F.masbden = A.masanbay 
     WHERE F.masbdi = '${data.sbdi}' AND F.masbden = '${data.sbden}' AND DATE(F.giodi) = '${data.time}'
     ORDER BY F.giodi;
     `

    try {
        pool.query(query, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(403).json({ messages: "Forbidden1", error });
        }
        return res.send({
          status: 200,
          data: results.rows,
        });
      });
    } catch (error) {
      return res.status(403).json({ messages: "Forbidden2" });
    }
}





export const addAutomatic = (req,res) => { // add nhanh chuyến bay 
    const query = `SELECT masanbay from sanbay`;
  try {
      pool.query(query, (error, results) => {
      if (error) {
        return res.status(403).json({ messages: "Forbidden1", error });
      }
      const k = 2;
      const masanbay = results.rows.map((item) => item.masanbay)
      const permutations = calculatePermutations(masanbay, k);
 
      for (const permutation of permutations) {
        const q = `INSERT INTO chuyenbay (macb,masbdi,masbden,giodi)
        VALUES ('${uuidv4()}','${permutation[0]}', '${permutation[1]}' ,'2023-05-23 22:00' );`;
          pool.query(q, (error, results) => {
            if (error) {
              console.log(error);
            }
          });
      }
   
     
   
      return res.send({
        status: 200,
        data: "success",
      });

      // console.log(ghep);
      
    });
  } catch (error) {
    return res.status(403).json({ messages: "Forbidden2" });
  }
}

function calculatePermutations(sanBay, k) { // chỉnh hợp của sân bay a -> sân bay b . 
    const permutations = [];
    const used = Array(sanBay.length).fill(false);
    const currentPermutation = [];
  
    function backtrack() {
      if (currentPermutation.length === k) {
        permutations.push([...currentPermutation]);
        return;
      }
  
      for (let i = 0; i < sanBay.length; i++) {
        if (!used[i]) {
          used[i] = true;
          currentPermutation.push(sanBay[i]);
          backtrack();
          used[i] = false;
          currentPermutation.pop();
        }
      }
    }
  
    backtrack();
  
    return permutations;
}