import express from "express";
import {descTable,getAllUsers,getUser,insertUsers,updateUser,deleteUser} from "./src/models/user.model.js";
const app = express();
app.use(express.json());

// TEST API
app.get("/api", (req, res) => {
  
  res.json({
    users: ["userOne", "userTwo", "userThree"],
    message: "Hello from the backend!"
  });
  
});

// GET ALL USER
app.get("/users",async(req,res)=>{

  try{
    
    const users = await getAllUsers();
    res.json(users);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Internal Server Error"})
  }

});



// GET ONE USER
app.get("/users/:id",async(req,res)=>{

    try{

        const userId = req.params.id;
        const user = await getUser(userId);
        res.json(user);

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"})
    }

})


app.delete("/users/:id",async(req,res)=>{

     try{
        const userId = req.params.id;
        const user = await deleteUser(userId);
        res.status(201).json(user);

    }catch(err){
        console.error(err);
        res.status(500).json({error:"Internal Server Error"})
    }

});


// SEND USER 
app.post("/users", async (req, res) => {

  try {
    const { username, firstname, lastname, password } = req.body;

    if (!username || !firstname || !lastname || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const user = await insertUsers(username, firstname, lastname, password);
    res.status(201).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Post Server Error" });
  }

});



app.put("/users/:id", async (req,res) =>{

   try {

    const userId = req.params.id;
    const { username, firstname, lastname, password } = req.body;
    const user = await updateUser(userId, username, firstname, lastname, password);
    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update Server Error" });
  }
  
});




app.get("/table",async(req,res)=>{

    try{

      const table = await descTable();
      res.json(table)

    }catch(err){
      console.error(err);
      res.status(500).json({error:"Intenal Server Error"})
    }

})



app.use((err,res,req,next)=>{
  console.error(err.stack);
  console.log("Something Broke!");
})



export default app;