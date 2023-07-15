const express = require("express")
const bodyParser = require("body-parser")
const today = require(__dirname+"/todayDate.js")

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set('view engine', 'ejs');

let items=["Wake Up", "Have breakfast"]
let workItems=[]

app.get("/", function(req, res) {

    res.render("list", {
        listTitle: today(),
        itemList: items
    })

})

app.post("/", function(req, res) {

    if(req.body.button === "Work List") {
        workItems.push(req.body.newItem)
        res.redirect("/work")

    } else {
        items.push(req.body.newItem)
        res.redirect("/")
    }

})

app.get("/work", function(req, res){
    res.render("list", {
        listTitle:"Work List",
        itemList:workItems
    })
})

app.post("/work", function(req, res){
    workItems.push(req.body.newItem)
    res.redirect("/work")
})

app.listen(3000, function(){
    console.log("Server started on port 3000");
})