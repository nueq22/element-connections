const lineContainer = document.getElementById('line-container');

const sq1 = document.getElementById('sq1')
const sq2 = document.getElementById('sq2')
const sq6 = document.getElementById('sq6')

new ElementConnections({
    container: lineContainer,
    elements: [sq1, sq2, sq6, sq3]
})