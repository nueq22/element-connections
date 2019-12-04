const linesContainer = document.getElementById('connections');

const sq1 = document.getElementById('sq1')
const sq2 = document.getElementById('sq2')
const sq6 = document.getElementById('sq6')

new ElementConnections({
    container: linesContainer,
    elements: [sq1, sq2, sq6, sq3]
})