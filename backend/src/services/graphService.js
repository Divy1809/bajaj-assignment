module.exports=function(edges){

const invalid_entries=[];
const duplicate_edges=[];

const seen=new Set();

const graph={};
const indegree={};

const childAssigned=new Set();

const validPattern=/^[A-Z]->[A-Z]$/;

for(let raw of edges){

let e=raw.trim();

if(!validPattern.test(e)){
invalid_entries.push(raw);
continue;
}

let [p,c]=e.split("->");

if(p===c){
invalid_entries.push(raw);
continue;
}

if(seen.has(e)){
if(!duplicate_edges.includes(e))
duplicate_edges.push(e);
continue;
}

seen.add(e);

if(childAssigned.has(c)){
continue;
}

childAssigned.add(c);

if(!graph[p]) graph[p]=[];
if(!graph[c]) graph[c]=[];

graph[p].push(c);

indegree[c]=(indegree[c]||0)+1;

if(!(p in indegree))
indegree[p]=0;

}

const visited=new Set();
const hierarchies=[];

function buildTree(node){
let obj={};

for(let child of graph[node]){
obj[child]=buildTree(child);
}

return obj;
}

function depth(node){

if(graph[node].length===0)
return 1;

let max=0;

for(let child of graph[node]){
max=Math.max(max,depth(child));
}

return max+1;
}

function hasCycle(node,vis,stack){

vis.add(node);
stack.add(node);

for(let n of graph[node]){
if(!vis.has(n)){
if(hasCycle(n,vis,stack))
return true;
}
else if(stack.has(n)){
return true;
}
}

stack.delete(node);

return false;
}

let roots=[];

for(let n in graph){
if(indegree[n]===0)
roots.push(n);
}

const allNodes=Object.keys(graph);

if(roots.length===0 && allNodes.length){
roots=[allNodes.sort()[0]];
}

let totalTrees=0;
let totalCycles=0;
let largestDepth=0;
let largestTreeRoot="";

for(let root of roots){

if(visited.has(root))
continue;

let cycle=hasCycle(root,new Set(),new Set());

function mark(node){
if(visited.has(node)) return;
visited.add(node);
for(let c of graph[node]) mark(c);
}

mark(root);

if(cycle){
totalCycles++;

hierarchies.push({
root,
tree:{},
has_cycle:true
});
}
else{

let d=depth(root);

if(
d>largestDepth ||
(d===largestDepth &&
(root<largestTreeRoot || !largestTreeRoot))
){
largestDepth=d;
largestTreeRoot=root;
}

totalTrees++;

hierarchies.push({
root,
tree:{
[root]:buildTree(root)
},
depth:d
});

}

}

return{

hierarchies,
invalid_entries,
duplicate_edges,

summary:{
total_trees:totalTrees,
total_cycles:totalCycles,
largest_tree_root:largestTreeRoot
}

};

}