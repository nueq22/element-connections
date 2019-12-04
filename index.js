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
        function SvgCanvas(el) {
            this.element = el;
            this.parentElement = el.parentElement || document.body;
            this.setupContainer();
        }
        SvgCanvas.prototype.clear = function () {
            this.element.innerHTML = '';
        };
        SvgCanvas.prototype.insert = function (child) {
            this.element.appendChild(child);
        };
        SvgCanvas.prototype.autosize = function () {
            var width = this.parentElement.offsetWidth;
            var height = this.parentElement.offsetHeight;
            this.element.setAttribute('viewBox', "0 0 " + width + " " + height);
        };
        SvgCanvas.prototype.setupContainer = function () {
            var _this = this;
            this.element.style.position = 'absolute';
            this.element.style.top = '0';
            this.element.style.left = '0';
            this.element.style.zIndex = '-1';
            setTimeout(function () {
                _this.autosize();
            }, 0);
        };
        return SvgCanvas;
    }());

    var defaultStyles = { color: 'black', width: '1' };
    var ElementConnections = /** @class */ (function () {
        function ElementConnections(_a) {
            var container = _a.container, elements = _a.elements, _b = _a.style, style = _b === void 0 ? defaultStyles : _b;
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
        ElementConnections.prototype.getPoints = function () {
            return this.elements.map(this.getCenter);
        };
        ElementConnections.prototype.getCenter = function (el) {
            var elPosition = {
                top: el.offsetTop,
                left: el.offsetLeft,
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
            return new Polyline(this.points, this.style).element;
        };
        ElementConnections.prototype.handleResize = function () {
            var _this = this;
            window.addEventListener('resize', function () {
                requestAnimationFrame(function () {
                    _this.points = _this.getPoints();
                    _this.container.autosize();
                    _this.render();
                });
            });
        };
        ElementConnections.prototype.render = function () {
            var polyline = this.draw();
            this.container.clear();
            this.container.insert(polyline);
        };
        return ElementConnections;
    }());
    // @ts-ignore
    window.ElementConnections = ElementConnections;

    return ElementConnections;

}());
