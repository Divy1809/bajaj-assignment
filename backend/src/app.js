const express=require("express");
const cors=require("cors");

const bfhl=require("./routes/bfhl");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
res.send("BFHL API Running");
});

app.use("/bfhl",bfhl);

app.use((err,req,res,next)=>{
res.status(500).json({
error:"Internal Server Error"
});
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Running ${PORT}`);
});