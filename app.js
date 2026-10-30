// This id project of responce objects

const express = require("express")
const app = express()
const PORT = 3001

app.get("/", (req, res) => {
    res.set("Text-content","plain")
    res.send("This is home page") //  we can send Text, HTML, Buffer, object jaise responses
})

app.get("/about", (req, res) => {

    res.send(`

<h1>About Us</h1>
<p>Welcome to our about page.
</p>

`);
});

app.get("/api/student", (req, res) => {
    res.json({                                 // sends it to the client with an appropriate JSON content type.
        id: 101,
        name: "Rahul",
        course: "Backend Development"
    });
});


app.post("/api/student",(req,res)=> {
    res.status(201).json({                // 201 for create new student
        
        message:" new Student created"
    })
})




app.listen(PORT, () => {
    console.log(`Server running at http://localhost:3001`);
});
