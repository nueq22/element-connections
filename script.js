class ElementConnections {
    constructor({ container, elements, line = {} }) {
        this.container = container;
        this.elements = elements;
        this.points = this.getPoints();
        this.lineStyles = {
            width: line.width || 1,
            color: line.color || 'black'
        };
        this.render();
        this.handleResize();
    }

    getPoints() {
        return this.elements.map(this.getCenter);
    }

    getCenter(el) {
        const { top, left } = el.getBoundingClientRect();

        const elPosition = {
            top: window.scrollX + top,
            left: window.scrollY + left
        }

        const elSize = {
            width: el.offsetWidth,
            height: el.offsetHeight
        }

        return [
            elPosition.left + elSize.width / 2, elPosition.top + elSize.height / 2
        ]
    }

    get formattedPoints() {
        return this.points.map(point => point.join(',')).join(' ');
    }

    draw() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${document.body.offsetWidth} ${document.body.offsetHeight}`)
        svg.style.position = 'absolute';
        svg.style.top = 0;
        svg.style.left = 0;
        svg.style.zIndex = -1;

        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('points', this.formattedPoints);
        polyline.setAttribute('stroke-width', this.lineStyles.width);
        polyline.setAttribute('stroke', this.lineStyles.color);
        svg.appendChild(polyline);
        return svg;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.points = this.getPoints();
                this.render()
            })
        })
    }

    render() {
        const el = this.draw();
        this.container.innerHTML = '';
        this.container.appendChild(el);
    }
}
