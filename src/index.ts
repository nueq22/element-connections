import Point from "./Point";
import Style from "./Style";
import Polyline from "./Polyline";
import SvgCanvas from "./SvgCanvas";

interface Props {
    container: HTMLElement;
    elements: HTMLElement[];
    style?: Style;
}

const defaultStyles: Style ={ color: 'black', width: '1' };

class ElementConnections {
    container: HTMLElement;
    elements: HTMLElement[];
    points: Point[];
    style: Style;

    constructor({ container, elements, style = defaultStyles }: Props) {
        this.container = container;
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
        const { top, left } = el.getBoundingClientRect();
        const elPosition = {
            top: window.scrollX + top,
            left: window.scrollY + left
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

    draw(): SVGElement {
        const svg = new SvgCanvas().element;
        const polyline = new Polyline(this.points, this.style);
        svg.appendChild(polyline.element);
        return svg;
    }

    handleResize(): void {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.points = this.getPoints();
                this.render()
            })
        })
    }

    render(): void {
        const el = this.draw();
        this.container.innerHTML = '';
        this.container.appendChild(el);
    }
}

// @ts-ignore
window.ElementConnections = ElementConnections;

export default ElementConnections;