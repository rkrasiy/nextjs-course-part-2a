import { insertDocument, connectDatabase } from '../../../helpers/db-util';


export default async function handler (req, res){
  if(req.method === 'POST'){
    const userEmail = req.body.email;

    if(!userEmail || !userEmail.includes('@')){
      res.status(422).json({message: "Invalid email address!"})
      return;
    }
    let client;
    try{
      client = await connectDatabase()
    }catch(err){
      res.status(500).json({message: 'Connecting to the database failed!'})
      return;
    }
console.log("HERE", client)
    try{
      await insertDocument(client, "newsletter", {email: userEmail})
      client.close();
    }catch(err){
      res.status(500).json({message: 'Inserting data invalid!'})
      return;
    }
    console.log("User email:", userEmail)
    res.status(201).json({message: 'Signed up!'})
  }
}


// import fs from "fs";
// import path from "path";

// export function buildRegisterPath() {
//   return path.join(process.cwd(), "data", "register.json");
// }

// export function extractUser(filePath) {
//   const fileData = fs.readFileSync(filePath);
//   const data = JSON.parse(fileData);

//   return data;
// }

// export default function handler(req, res) {
//   if (req.method === "POST") {
//     const email = req.body.email;

//     const newUser = {
//       id: getUnicID(),
//       email: email,
//     };
    

//     const filePath = buildRegisterPath();
//     const data = extractUser(filePath);

//     if(data.find( user => user.email === newUser.email)){
//       res.status(409).json({message: "This user already exist!"})
//     }else{
//       data.push(newUser);
//       fs.writeFileSync(filePath, JSON.stringify(data));
//       res.status(201).json({ message: "Success!", logedIn: newUser });
//     } 
//   } else {
//     const data = extractUser(buildRegisterPath());
//     res.status(200).json({ logedIn: data });
//   }
// }
// function getUnicID() {
//   return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }
