import pool from "../database/connect.js";
import { v4 as uuidv4 } from "uuid";
import { sentMailBuyTicketFunction } from "./GmailController.js";
import { addUserFunction } from "./UserController.js";

function generateRandomString() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const length = 6;
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export const addFlight = (req, res) => {
  // thêm mới chuyến bay dành cho admin
  const data = req.body; // lấy dữ liệU từ client gửi về
  const query = `INSERT INTO chuyenbay (macb,masbdi,masbden,giodi) VALUES ('${uuidv4()}','${
    data.start
  }','${data.end}','2023-05-21 11:30')`;
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
export const searchFlight = (req, res) => {
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
     SELECT F.macb AS id,F.giodi AS Departure_Time  , F.masbdi AS  Departure_Airport_id,F.masbden AS  Arrival_Airport_id, F.available_seats,F.price ,F.giodi + INTERVAL '110 minutes' AS Arrival_Time,
     D.tensanbay AS Departure_Airport, D.tinh AS Departure_Province,
     A.tensanbay AS Arrival_Airport, A.tinh AS Arrival_Province
     FROM chuyenbay F
     JOIN sanbay D ON F.masbdi = D.masanbay
     JOIN sanbay A ON F.masbden = A.masanbay 
     WHERE F.masbdi = '${data.sbdi}' AND F.masbden = '${data.sbden}' AND DATE(F.giodi) = '${data.time}'
     ORDER BY F.giodi;
     `;

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
};
/*
  đặt chỗ : ngoài việc add vào bảng đặt chỗ thì phải update lại số lượng bên bảng chuyến bay từ id của chuyến bay
  Ex : UPDATE flight SET available_seats = available_seats - 1 WHERE id = 123;

  huỷ chỗ : huy chỗ thì phải trả lại chỗ cho bảng chuyến bay
  Ex : UPDATE flight SET available_seats = available_seats + 1 WHERE id = 123;

*/
export const updateAvailableSeats = async (id, datcho) => {
  const query = `UPDATE chuyenbay SET available_seats = available_seats ${
    datcho ? "- 1" : "+ 1"
  } WHERE macb = '${id}'`;
  console.log(query);
  await pool.query(query, (error, results) => {
    if (error) {
      console.log(error);
    }
    return "success";
  });
};

/**
 * hàm dùng để đặt chỗ
 */

export const addAvaibleSeatFunction = async (cmnd,macb) => {
  const code = generateRandomString();
  const query = `INSERT INTO datcho (madc,cmnd,macb,code) VALUES ('${uuidv4()}','${cmnd}','${macb}','${code}')`;

  pool.query(query, async (error, results) => {
    if (error) {
      console.log(error);
      
    }
    await updateAvailableSeats(macb, 1);
    // console.log(ghep);
    console.log(results);
  });
  return code;
};
export const addAvaibleSeat = async  (req, res) => {
  // thêm mới chuyến bay dành cho admin
  const data = req.body; // lấy dữ liệU từ client gửi về
 
  try {
   const code =  await addAvaibleSeatFunction(data.cmnd,data.macb);
   return res.send({
    status: 200,
    data: code,
  });
  } catch (error) {
    return res.status(403).json({ messages: "Forbidden2" });
  }
};
/*
{
  "macb": "abcd-efgh-ijkl",
  "giodi": "2023/05/24 05:00",
  "gioden": "2023/05/24 06:50",
  "sbdi" : "Sân bay Quốc tế Đà Nẵng",
  "masbdi" :  "DAD",
  "sbden" : "Sân bay Quốc tế Tân Sơn Nhấ",
  "masbden" : "SGN",
  "passengers": [
    {
      "name: "Nguyen Van A",
      "dob": "12/2/2002",
      "idCard": "03881112222",
      "email": "user1@gmail.com",
    },
    {
      "name: "Nguyen Thi B",
      "dob": "12/2/2002",
      "idCard": "03881112222",
      "email": "user2@gmail.com",
    }
  ]
}
*/
export const addAvaibleSeats = async (req, res) => {
  // thêm mới chuyến bay dành cho admin

  const data = req.body; // lấy dữ liệU từ client gửi về


  try {
    /**pass */
     data.passengers.forEach( async (person) => {
      await addUserFunction(
        person.name,
        person.dob,
        person.idCard,
        person.noicap,
        person.quoctich,
        person.ngonngu,
        person.gmail
      );
    }); // them moi vao data


    await data.passengers.map(async (person)  => {
      const code = await addAvaibleSeatFunction(person.idCard,data.macb);
      await sentMailBuyTicketFunction(code,data.giodi,data.gioden,data.sbdi,data.masbdi,data.sbden,data.masbden,person.gmail)
    });
    return res.send({
      status: 200,
      data: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ messages: "Forbidden2" });
  }
};
/*
  Thêm khách hàng 
  INSERT INTO khachhang (makh,tenkh,ngaysinh,cmnd,noicap,quoctich) VALUES ('001','Bùi Lê Huy','2000/10/29','65214809218721','Công An tỉnh Quảng trị','Việt Nam')

*/
export const addAutomatic = (req, res) => {
  // add nhanh chuyến bay
  const query = `SELECT masanbay from sanbay`;
  try {
    pool.query(query, (error, results) => {
      if (error) {
        return res.status(403).json({ messages: "Forbidden1", error });
      }
      const k = 2;
      const masanbay = results.rows.map((item) => item.masanbay);
      const permutations = calculatePermutations(masanbay, k);

      for (const permutation of permutations) {
        const q = `INSERT INTO chuyenbay (macb,masbdi,masbden,giodi,available_seats,price)
        VALUES ('${uuidv4()}','${permutation[0]}', '${
          permutation[1]
        }' ,'2023-06-01 15:10',40,'1630000');`; 
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
};

function calculatePermutations(sanBay, k) {
  // chỉnh hợp của sân bay a -> sân bay b .
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
