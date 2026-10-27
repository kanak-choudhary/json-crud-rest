const express = require("express")
const fs=require("fs")
const app = express()
const PORT = 3000
const users = require("./MOCK_DATA.json")
app.use(express.json());

// Midilwares

// app.use(express.urlencoded({extended: false}))   // midilware ( built in )

// app.use((req,res,next)=>{
// console.log(" this is our midilware 1");
// })


// ROUTES

// server side rendring..
app.get('/user', (req, res) => {
    const html = `

    <ul> ${users.map((user) => `<li>${user.first_name} </li>`).join("")

        }</ul>
    `;
    res.send(html)
})

// HOME

app.get('/', (req, res) => {
    return res.end("this is home page")
})

// USER ROUTE

app.get('/api/user', (req, res) => {
    
    return res.json(users)
})

// get any user through id
app.get('/api/user/:id', (req, res) => {

    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user)
})



// create new route for add user 
app.post('/api/user', (req, res) => {

    const body=req.body  // entire data from req it can hold in body
    console.log("body", body);
    

    users.push({...body, id: users.length + 1})  // push the client side data in users with length +1
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{ // use for add new data in our json file 
        return res.json({ status: "success" , id: users.length})
    })

})


// assignment

// update the new user using id

app.patch('/api/user/:id', (req, res) => {

    const id = Number(req.params.id);

    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, req.body); // update changes

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {     // Convert & Save
        if (err) {     // Check
            return res.status(500).json({ message: "Error updating user" });
        }

        return res.json({
            message: "User updated successfully",
            user: user
        });
    });
});


// Delete the new user using id

app.delete('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(index, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({
                message: "Error deleting user"
            });
        }

        return res.json({
            message: "User deleted successfully"
        });
    });
});


app.listen(PORT, () => {
    console.log("server is running...");

})