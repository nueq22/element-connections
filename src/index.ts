import Point from "./Point";
import Style from "./Style";
import Polyline from "./Polyline";
import SvgCanvas from "./SvgCanvas";

interface Props {
    container: SVGElement;
    elements: HTMLElement[];
    style?: Style;
}

const defaultStyles: Style = { color: 'black', width: '1' };

class ElementConnections {
    container: SvgCanvas;
    elements: HTMLElement[];
    points: Point[];
    style: Style;

    constructor({ container, elements, style = defaultStyles }: Props) {
        this.container = new SvgCanvas(container);
        this.elements = elements;
        this.points = this.getPoints();
        this.style = {
            width: style.width || defaultStyles.width,
            color: style.color || defaultStyles.color
        };
        this.render();
        this.handleResize();
    }

    getPoints(): Point[] {
        return this.elements.map(this.getCenter);
    }

    getCenter(el: HTMLElement): Point {
        const elPosition = {
            top: el.offsetTop,
            left: el.offsetLeft,
        }
        const elSize = {
            width: el.offsetWidth,
            height: el.offsetHeight
        }
        return {
            x: elPosition.left + elSize.width / 2,
            y: elPosition.top + elSize.height / 2
        }
    }

    draw(): SVGPolylineElement {
        return new Polyline(this.points, this.style).element;
    }

    handleResize(): void {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.points = this.getPoints();
                this.container.autosize();
                this.render()
            })
        })
    }

    render(): void {
        const polyline = this.draw();
        this.container.clear();
        this.container.insert(polyline);
    }
}

// @ts-ignore
window.ElementConnections = ElementConnections;

export default ElementConnections;