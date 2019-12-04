const linesContainer = document.getElementById('connections');

const sq1 = document.getElementById('sq1')
const sq2 = document.getElementById('sq2')
const sq6 = document.getElementById('sq6')

const p = new ElementConnections({
    container: linesContainer,
    elements: [sq1, sq2, sq6],
    animated: true
})

p.animate();

const linesContainer2 = document.getElementById('connections2');
const sq21 = document.getElementById('sq21')
const sq22 = document.getElementById('sq22')

new ElementConnections({
    container: linesContainer2,
    elements: [sq21, sq22],
    style: {
        width: 6,
        color: 'blue'
    }
})