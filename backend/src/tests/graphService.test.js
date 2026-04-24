const processGraph=require("../services/graphService");

test("duplicate test",()=>{

let r=processGraph([
"A->B",
"A->B",
"A->B"
]);

expect(
r.duplicate_edges
).toEqual(["A->B"]);

});

test("cycle test",()=>{

let r=processGraph([
"A->B",
"B->C",
"C->A"
]);

expect(
r.summary.total_cycles
).toBe(1);

});

test("multi parent",()=>{

let r=processGraph([
"A->D",
"B->D"
]);

expect(
r.hierarchies[0].root
).toBe("A");

});