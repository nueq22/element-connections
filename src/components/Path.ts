import Point from "./Point";
import Style from "./Style";

class Path {

    element: SVGPathElement;
    points: string | null;
    lineLength: string;

    constructor(points: Point[], style: Style, animated: boolean) {
        this.points = this.formatPoints(points);
        this.element = this.createElement(style);
        this.lineLength = this.element.getTotalLength().toString();
        if (animated) {
            this.hideLine();
        }
    }

    createElement(style: Style): SVGPathElement {
        const polyline: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('stroke-width', style.width);
        polyline.setAttribute('stroke', style.color);
        if (this.points) {
            polyline.setAttribute('d', this.points);
        } 
        return polyline;
    }

    hideLine() {
        this.element.style.strokeDasharray = this.lineLength;
        this.element.style.strokeDashoffset = this.lineLength;
    }

    animate() {
        requestAnimationFrame(() => {
            const interval = setInterval(() => {
                const current = Number(this.element.style.strokeDashoffset);
                if (current > 0) {
                    this.element.style.strokeDashoffset = (current - 10).toString();
                } else {
                    clearInterval(interval)
                }
            }, 16)
        })
    }

    formatPoints(points: Point[]) {
        const pointsString = points.map(point => `${point.x},${point.y}`).join(' ');
        return pointsString.length ? `M${pointsString}` : null;
    }
}

export default Path;