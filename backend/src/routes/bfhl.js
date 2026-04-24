const router=require("express").Router();
const processGraph=require("../services/graphService");

router.post("/",(req,res)=>{

if(!req.body.data || !Array.isArray(req.body.data)){
return res.status(400).json({
error:"data array required"
});
}

const result=processGraph(req.body.data);

res.json({
user_id:"divyjain_18092005",
email_id:"dj5507@srmist.edu",
college_roll_number:"RA2311028010113",
...result
});

});

module.exports=router;