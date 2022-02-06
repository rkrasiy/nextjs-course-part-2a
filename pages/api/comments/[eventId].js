import { getAllDocuments, insertDocument, connectDatabase} from '../../../helpers/db-util';

async function handler(req, res ){
  const eventId = req.query.eventId;
  
  let client;
  
  try{
    client = await connectDatabase()
  }catch(err){
    res.status(500).json({message: 'Connecting to the database failed!'})
    return;
  }

  if(req.method === "POST"){
    const { email, name, text } = req.body;
    if(!email.includes('@') || !name || name.trim() === "" || !text || text.trim() === ""){
      res.status(422).json({ message: "Invalid input!" })
      client.close()
      return; 
    }

    const newComment = {
      email,
      name,
      text,
      eventId
    };
    
    let result;
    try{
      result = await insertDocument(client, "comments", newComment)
      newComment._id = result.insertedId
      res.status(201).json( { message: "Added comment.", comment: newComment})
      client.close();
    }catch(err){
      res.status(500).json({message: 'Inserting data invalid!'})
    }
  }
  if(req.method === "GET") {
    try{
      const documents = await getAllDocuments(client, "comments", { _id: -1 }, { eventId: eventId })
      res.status(200).json({ comments: documents})
    }catch(err){
      res.status(500).json({message: 'Getting comments failed!'})
    }
  }
  client.close();
}

export default handler;
// import { getEventById, updateEvent } from '../../../helpers/api-util';

// export default async function handler(req, res) {
  
//   if (req.method === "PUT") {
//     const eventId = req.query.eventId
//     const event = await getEventById(eventId);

//     const email = req.body.email;
//     const userName = req.body.name;
//     const userComment = req.body.text;
//     const date = new Date()
// //console.log("req: ", req.body)
//     const newComment = {
//       id: getUnicID(),
//       email: email,
//       name: userName,
//       text: userComment,
//       date: date
//     };
//     // if(!event.comments)
//     //   event.comments = []
    
//     // event.comments = [...event.comments, newComment]
    
//     event.location = "IVano-Frankivsk"
//     console.log("EVENT: ", event)
//     let up = await updateEvent(event)
//     console.log("Up: ", up)
//     //res.status(201).json({ message: "Success!", data: data });

//   } else {
//     console.log("ELSE")
//     // const data = extractComments(buildRegisterPath());
//     // res.status(200).json({ comments: data });
//   }
// }
// function getUnicID() {
//   return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
//     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//     return v.toString(16);
//   });
// }