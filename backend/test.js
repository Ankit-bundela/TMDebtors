const express=require('express');
const app=express();
const oracle=require('oracledb');
const port=3000;
app.use(express.static("uploaded"));
app.get("/",function(request,response){
response.redirect("/index.html")
});
app.listen(port,function(err){
if(err)
{
console.log(`Some proble ${err}`);
}
console.log(`server is ready and accept ${port}`);
});