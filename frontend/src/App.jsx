import { useState } from "react";
import axios from "axios";

function App(){

const [input,setInput]=useState("");
const [result,setResult]=useState(null);
const [loading,setLoading]=useState(false);

const submitData=async()=>{

try{
setLoading(true);

const arr=input
.split(",")
.map(x=>x.trim())
.filter(Boolean);

const res=await axios.post(
"https://bajaj-assignment-fikp.onrender.com/bfhl",
{data:arr}
);

setResult(res.data);

}catch{
alert("API Error");
}

setLoading(false);

};

return(
<div style={{
minHeight:"100vh",
background:"#0b1020",
color:"#e5e7eb",
fontFamily:"Segoe UI",
padding:"45px"
}}>

<div style={{
maxWidth:"1200px",
margin:"auto"
}}>

<div style={{
background:"#121a30",
border:"1px solid #24314d",
padding:"35px 45px",
borderRadius:"26px",
boxShadow:"0 12px 40px rgba(0,0,0,.45)",
marginBottom:"30px"
}}>

<div style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
flexWrap:"wrap"
}}>

<div>
<h1 style={{
margin:0,
fontSize:"56px",
fontWeight:"700"
}}>
BFHL Processor
</h1>

<p style={{
marginTop:"10px",
color:"#8fa2c7",
fontSize:"18px"
}}>
Graph Hierarchy Analysis Engine
</p>
</div>

<div style={{
background:"#1a2745",
padding:"14px 22px",
borderRadius:"14px",
color:"#8cb4ff",
fontWeight:"600"
}}>
Live API Analyzer
</div>

</div>

</div>


<div style={{
display:"grid",
gridTemplateColumns:"1fr 1.1fr",
gap:"28px"
}}>

<div style={{
background:"#121a30",
border:"1px solid #24314d",
padding:"35px",
borderRadius:"26px",
boxShadow:"0 10px 35px rgba(0,0,0,.4)"
}}>

<h2 style={{
marginTop:0,
fontSize:"30px"
}}>
Input Graph
</h2>

<p style={{
color:"#91a0bd"
}}>
Enter relationships separated by commas
</p>

<textarea
rows="12"
value={input}
onChange={(e)=>setInput(e.target.value)}
placeholder="A->B,A->C,B->D"
style={{
width:"100%",
marginTop:"14px",
background:"#0d1529",
border:"1px solid #2d3f63",
color:"white",
padding:"18px",
fontSize:"16px",
borderRadius:"18px",
resize:"none",
outline:"none"
}}
/>

<button
onClick={submitData}
style={{
marginTop:"24px",
width:"100%",
padding:"16px",
border:"none",
borderRadius:"15px",
fontSize:"18px",
fontWeight:"700",
cursor:"pointer",
background:"linear-gradient(90deg,#4c7dff,#6a5cff)",
color:"white"
}}
>
{loading?"Processing...":"Run Analysis"}
</button>

</div>




<div style={{
background:"#121a30",
border:"1px solid #24314d",
padding:"35px",
borderRadius:"26px",
boxShadow:"0 10px 35px rgba(0,0,0,.4)"
}}>

<h2 style={{
marginTop:0,
fontSize:"30px"
}}>
Output
</h2>

{!result && (

<div style={{
marginTop:"160px",
textAlign:"center",
color:"#63708d",
fontSize:"22px"
}}>
Awaiting graph analysis...
</div>

)}

{result && (

<>

<div style={{
display:"flex",
gap:"18px",
marginBottom:"24px",
flexWrap:"wrap"
}}>

<Metric
label="Trees"
value={result.summary.total_trees}
/>

<Metric
label="Cycles"
value={result.summary.total_cycles}
/>

<Metric
label="Root"
value={result.summary.largest_tree_root}
/>

</div>


<div style={{
background:"#0d1529",
border:"1px solid #2c3c5d",
padding:"18px",
borderRadius:"18px",
maxHeight:"520px",
overflow:"auto"
}}>

<pre style={{
margin:0,
color:"#d6e1ff",
fontSize:"14px"
}}>
{JSON.stringify(result,null,2)}
</pre>

</div>

</>

)}

</div>

</div>

</div>

</div>
)

}

function Metric({label,value}){

return(
<div style={{
flex:"1",
minWidth:"150px",
background:"#18233f",
padding:"18px",
borderRadius:"16px",
border:"1px solid #2f4268",
textAlign:"center"
}}>

<div style={{
fontSize:"30px",
fontWeight:"700",
color:"#7ea4ff"
}}>
{value}
</div>

<div style={{
marginTop:"8px",
color:"#95a4c4"
}}>
{label}
</div>

</div>
)

}

export default App