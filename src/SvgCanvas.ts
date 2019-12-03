class SvgCanvas {

    element: SVGElement;

    constructor() {
        this.element = this.createElement()
    }

    createElement(): SVGElement {
        const bodyWidth: number = document.body.offsetWidth;
        const bodyHeight: number = document.body.offsetHeight;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', `0 0 ${bodyWidth} ${bodyHeight}`)
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.zIndex = '-1';

        return svg;
    }
}

export default SvgCanvas;