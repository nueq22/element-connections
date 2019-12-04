const starContainer = document.getElementById('star-connections');
const sp = {
    p1: document.getElementById('star-1'),
    p2: document.getElementById('star-2'),
    p3: document.getElementById('star-3'),
    p4: document.getElementById('star-4'),
    p5: document.getElementById('star-5'),
}

const starConnection = new ElementConnections({
    container: starContainer,
    elements: [sp.p1, sp.p5, sp.p2, sp.p3, sp.p4, sp.p1],
    animated: true,
})

starConnection.animate();