/* eslint-disable */
(function () {
    'use strict';

    var Polyline = /** @class */ (function () {
        function Polyline(points, style) {
            this.points = this.formatPoints(points);
            this.element = this.createElement(style);
        }
        Polyline.prototype.createElement = function (style) {
            var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            polyline.setAttribute('fill', 'none');
            polyline.setAttribute('points', this.points);
            polyline.setAttribute('stroke-width', style.width);
            polyline.setAttribute('stroke', style.color);
            return polyline;
        };
        Polyline.prototype.formatPoints = function (points) {
            return points.map(function (point) { return point.x + "," + point.y; }).join(' ');
        };
        return Polyline;
    }());

    var SvgCanvas = /** @class */ (function () {
        function SvgCanvas() {
            this.element = this.createElement();
        }
        SvgCanvas.prototype.createElement = function () {
            var bodyWidth = document.body.offsetWidth;
            var bodyHeight = document.body.offsetHeight;
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', "0 0 " + bodyWidth + " " + bodyHeight);
            svg.style.position = 'absolute';
            svg.style.top = '0';
            svg.style.left = '0';
            svg.style.zIndex = '-1';
            return svg;
        };
        return SvgCanvas;
    }());

    var defaultStyles = { color: 'black', width: '1' };
    var ElementConnections = /** @class */ (function () {
        function ElementConnections(_a) {
            var container = _a.container, elements = _a.elements, _b = _a.style, style = _b === void 0 ? defaultStyles : _b;
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
        ElementConnections.prototype.getPoints = function () {
            return this.elements.map(this.getCenter);
        };
        ElementConnections.prototype.getCenter = function (el) {
            var _a = el.getBoundingClientRect(), top = _a.top, left = _a.left;
            var elPosition = {
                top: window.scrollX + top,
                left: window.scrollY + left
            };
            var elSize = {
                width: el.offsetWidth,
                height: el.offsetHeight
            };
            return {
                x: elPosition.left + elSize.width / 2,
                y: elPosition.top + elSize.height / 2
            };
        };
        ElementConnections.prototype.draw = function () {
            var svg = new SvgCanvas().element;
            var polyline = new Polyline(this.points, this.style);
            svg.appendChild(polyline.element);
            return svg;
        };
        ElementConnections.prototype.handleResize = function () {
            var _this = this;
            window.addEventListener('resize', function () {
                requestAnimationFrame(function () {
                    _this.points = _this.getPoints();
                    _this.render();
                });
            });
        };
        ElementConnections.prototype.render = function () {
            var el = this.draw();
            this.container.innerHTML = '';
            this.container.appendChild(el);
        };
        return ElementConnections;
    }());
    // @ts-ignore
    window.ElementConnections = ElementConnections;

    return ElementConnections;

}());
