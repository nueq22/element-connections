/* eslint-disable */
(function () {
    'use strict';

    var Path = /** @class */ (function () {
        function Path(points, style, animated) {
            this.points = this.formatPoints(points);
            this.element = this.createElement(style);
            this.lineLength = this.element.getTotalLength().toString();
            if (animated) {
                this.hideLine();
            }
        }
        Path.prototype.createElement = function (style) {
            var polyline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            polyline.setAttribute('fill', 'none');
            polyline.setAttribute('stroke-width', style.width);
            polyline.setAttribute('stroke', style.color);
            if (this.points) {
                polyline.setAttribute('d', this.points);
            }
            return polyline;
        };
        Path.prototype.hideLine = function () {
            this.element.style.strokeDasharray = this.lineLength;
            this.element.style.strokeDashoffset = this.lineLength;
        };
        Path.prototype.animate = function () {
            var _this = this;
            requestAnimationFrame(function () {
                var interval = setInterval(function () {
                    var current = Number(_this.element.style.strokeDashoffset);
                    if (current > 0) {
                        _this.element.style.strokeDashoffset = (current - 25).toString();
                    }
                    else {
                        clearInterval(interval);
                    }
                }, 16);
            });
        };
        Path.prototype.formatPoints = function (points) {
            var pointsString = points.map(function (point) { return point.x + "," + point.y; }).join(' ');
            return pointsString.length ? "M" + pointsString : null;
        };
        return Path;
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
            // @ts-ignore
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
            var container = _a.container, elements = _a.elements, _b = _a.style, style = _b === void 0 ? defaultStyles : _b, _c = _a.animated, animated = _c === void 0 ? false : _c;
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
            this.path = new Path(this.points, this.style, this.animated);
        };
        ElementConnections.prototype.handleResize = function () {
            var _this = this;
            window.addEventListener('resize', function () {
                requestAnimationFrame(function () {
                    _this.animated = false;
                    _this.points = _this.getPoints();
                    _this.container.autosize();
                    _this.render();
                });
            });
        };
        ElementConnections.prototype.animate = function () {
            this.path.animate();
        };
        ElementConnections.prototype.render = function () {
            this.draw();
            this.container.clear();
            this.container.insert(this.path.element);
        };
        return ElementConnections;
    }());
    // @ts-ignore
    window.ElementConnections = ElementConnections;

    return ElementConnections;

}());
