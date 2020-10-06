const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require('http');
const path = require('path');
const fs = require('fs');
const upload = require('express-fileupload');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));
app.use(upload());

app.get("/", (req, res) => {
    fs.readdir( './public/images', (err, lists) => {
        if(!err)
        {
            res.render("index", { fileList : lists});
        }
        else
        {
            res.render(err);
        }
    })
})

app.post("/", (req, res) => {
    if(req.files)
    {
        console.log(req.files);
        const file = req.files.myfile;
        const filename = req.files.myfile.name;
        console.log(filename);
        file.mv('./public/images/' + filename, (err, results) => {
            if(!err)
            {
                console.log("File Uploaded Successfully");
                res.redirect("/");
            }
            else
            {
                res.send(err);
            }
        })
    }
});

app.get('/deleteFile/:file', (req, res) => {
    var targetPath = './public/images/'+req.params.file;
    console.log(targetPath);
    fs.unlink(targetPath, (err) => {
        if(err) {
            res.send("Delete Unsuccessful");
        } else {
            res.redirect("/");
        }
    })
});

app.listen(5000, () => {
    console.log("Server is Running on port 5000");
})