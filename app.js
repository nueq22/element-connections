const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const p3 = document.getElementById('p3');
const p4 = document.getElementById('p4');
const p5 = document.getElementById('p5');
const p6 = document.getElementById('p6');
const p7 = document.getElementById('p7');
const p8 = document.getElementById('p8');

const container = document.getElementById('connections');

const connections = new ElementConnections({
    container: container,
    elements: [p1, p3, p6]
})

console.log(connections);
