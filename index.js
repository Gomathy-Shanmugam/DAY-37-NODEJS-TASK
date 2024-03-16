import express from "express"
const app = express()
const PORT = 8000
import {  format } from "date-fns";
import fs from "fs";

// Getting all data
app.get('/', (req, res) =>{
  res.send('Hello World')
})


// creating new file and writing of data using writeFileSync method
app.get("/write",(req,res)=>{
 const date =  format(new Date(), "dd mm yyyy hh mm ss");
const filepath = "Time/16-03-2024.txt`"
fs.writeFileSync(filepath,`${date}`,"utf-8")
res.status(200).json(`${date}`);
 })


// Reading file using readFileSync method
 app.get('/read', (req, res) =>{
const readdata = format(new Date(), "dd mm yyyy hh mm ss");
const filepath = "Time/`${readdata}`.txt`"
// Handling Error
try{
  const readData = fs.readFileSync(filepath,{ encoding: 'utf8', flag: 'r' });
  res.status(200).json(`${readData}`)
}catch (error) {
  res.status(404).json({error : "File not found"})
}
})



// Reading All files using readFileSync method
app.get('/readAll', (req, res) => {
  const readdata = format(new Date(), "dd mm yyyy hh mm ss");
  const folderPath = 'Time';
  const fileNames = fs.readdirSync(folderPath,"utf-8");
  const fileNamesWithoutExtension = fileNames.map(fileName => fileName.replace('.txt', ''));
  const responseString = fileNamesWithoutExtension.join(', ');
  res.status(200).send(`<h1 style="text-align:center; color:violet">Have a Good Day!</h1><br><h2 style = "color:blue ; text-align:center"> Make your Day Beautiful and Colourfull</h2><br><p style="text-align:center">${responseString}</p>`);
});




// renaming of file name 
// app.get('/renamesync', (req, res) => {
//   const readdata = format(new Date(), "dd mm yyyy hh mm ss");
//   const folderPath = 'Time';
//   const newfilepath = "Time/16-03-2024-4.00.txt"
//   const oldfilepath = "Time/18-08-2023-11.00.txt"

//   const data = fs.renameSync( oldfilepath, newfilepath )
// try{
//   function getCurrentFilenames() { 
//     console.log('File renamed successfully.');
//     getCurrentFilenames();
//     fs.readdirSync(folderPath).forEach(file => { 
//       console.log(file); 
//       res.status(200).json({ message: 'File renamed successfully.' });
//     }); 
//   } 
// }catch(err){
//   console.log("Files are not renamed");
//   res.status(404).json({ message: 'File renamed successfully.' });
// }
// });




app.get('/renamesync', (req, res) => {
  const folderPath = 'Time';
  const oldfilename = "18-08-2023-11.00.txt";
  const newfilename = "16-03-2024-4.00.txt";

  const oldfilepath = `${folderPath}/${oldfilename}`;
  const newfilepath = `${folderPath}/${newfilename}`;

  try {
    fs.renameSync(oldfilepath, newfilepath);
    console.log('File renamed successfully.');
    const files = fs.readdirSync(folderPath);
    console.log(files);
    res.status(200).json({ message: 'File renamed successfully.', files });
  } catch (err) {
    console.error("Files are not renamed:", err);
    res.status(404).json({ error: 'Failed to rename file.' });
  }
});

app.listen(PORT,() => console.log ("Server is responding", PORT))