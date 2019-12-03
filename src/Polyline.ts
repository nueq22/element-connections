import Point from "./Point";
import Style from "./Style";

class Polyline {

    element: SVGPolylineElement;
    points: string;

    constructor(points: Point[], style: Style) {
        this.points = this.formatPoints(points);
        this.element = this.createElement(style);
    }

    createElement(style: Style) {
        const polyline: SVGPolylineElement = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('fill', 'none');
        polyline.setAttribute('points', this.points);
        polyline.setAttribute('stroke-width', style.width);
        polyline.setAttribute('stroke', style.color);
        return polyline;
    }

    formatPoints(points: Point[]) {
        return points.map(point => `${point.x},${point.y}`).join(' ');
    }
}

export default Polyline;