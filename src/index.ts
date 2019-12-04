import Point from "./components/Point";
import Style from "./components/Style";
import Path from "./components/Path";
import SvgCanvas from "./components/SvgCanvas";

interface Props {
    container: SVGElement;
    elements: HTMLElement[];
    style?: Style;
    animated?: boolean;
}

const defaultStyles: Style = { color: 'black', width: '1' };

class ElementConnections {
    container: SvgCanvas;
    elements: HTMLElement[];
    points: Point[];
    path: Path;
    style: Style;
    animated: boolean;

    constructor({ container, elements, style = defaultStyles, animated = false }: Props) {
        this.container = new SvgCanvas(container);
        this.elements = elements;
        this.points = this.getPoints();
        this.animated = animated;
        this.style = {
            width: style.width || defaultStyles.width,
            color: style.color || defaultStyles.color
        };
        this.path = new Path([], this.style, this.animated);
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

    draw(): void {
        this.path = new Path(this.points, this.style, this.animated);
    }

    handleResize(): void {
        window.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.animated = false;
                this.points = this.getPoints();
                this.container.autosize();
                this.render()
            })
        })
    }

    animate() {
        this.path.animate();
    }

    render(): void {
        this.draw();
        this.container.clear();
        this.container.insert(this.path.element);
    }
}

// @ts-ignore
window.ElementConnections = ElementConnections;

export default ElementConnections;