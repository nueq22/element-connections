class SvgCanvas {

    element: SVGElement;
    parentElement: HTMLElement;

    constructor(el: SVGElement) {
        this.element = el;
        this.parentElement = el.parentElement || document.body;
        this.setupContainer();
    }

    clear(): void {
        this.element.innerHTML = '';
    }

    insert(child: SVGPathElement | null) {
        // @ts-ignore
        this.element.appendChild(child);
    }

    autosize() {
        const width = this.parentElement.offsetWidth;
        const height = this.parentElement.offsetHeight;
        this.element.setAttribute('viewBox', `0 0 ${width} ${height}`)
    }

    setupContainer(): void {
        this.element.style.position = 'absolute';
        this.element.style.top = '0';
        this.element.style.left = '0';
        this.element.style.zIndex = '-1';
        setTimeout(() => {
            this.autosize();
        }, 0)
    }
}

export default SvgCanvas;