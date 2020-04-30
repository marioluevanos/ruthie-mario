function SmoothScroll(options) {
    var _this = this;

    this._onResize = function(event) {
        _this.resizeRequest++;
        if (!_this.requestId) {
            _this.requestId = requestAnimationFrame(_this._update);
        }
    };

    this._onScroll = function(event) {
        _this.scrollRequest++;
        if (!_this.requestId) {
            _this.requestId = requestAnimationFrame(_this._update);
        }
    };

    this._update = function() {
        var resized = _this.resizeRequest > 0;
        var scrollY = window.pageYOffset;
        if (resized) {
            var height = _this.target.clientHeight;
            document.body.style.height = height + "px";
            _this.scrollHeight = height;
            _this.viewHeight = window.innerHeight;
            _this.halfViewHeight = _this.viewHeight / 2;
            _this.maxDistance = _this.viewHeight * 2;
            _this.resizeRequest = 0;
        }
        _this.endScroll = scrollY;
        _this.currentScroll +=
            (scrollY - _this.currentScroll) * _this.scrollEase;
        if (
            Math.abs(scrollY - _this.currentScroll) < _this.endThreshold ||
            resized
        ) {
            _this.currentScroll = scrollY;
            _this.scrollRequest = 0;
        }
        // const scrollOrigin = scrollY + this.halfViewHeight;
        var scrollOrigin = _this.currentScroll + _this.halfViewHeight;

        _this.target.style.transform = 'translate3d(0px,-' + _this.currentScroll + 'px, 0px)';

        for (var i = 0; i < _this.scrollItems.length; i++) {
            var item = _this.scrollItems[i];
            var distance = scrollOrigin - item.top;
            var offsetRatio = distance / _this.maxDistance;
            item.endOffset = Math.round(
                _this.maxOffset * item.depthRatio * offsetRatio
            );
            if (
                Math.abs(
                    item.endOffset - item.currentOffset < _this.endThreshold
                )
            ) {
                item.currentOffset = item.endOffset;
            } else {
                item.currentOffset +=
                    (item.endOffset - item.currentOffset) * _this.scrollEase;
            }
            item.target.style.transform =
                "translate3d(0px,-" + item.currentOffset + "px,0px)";
        }
        _this.requestId =
            _this.scrollRequest > 0
                ? requestAnimationFrame(_this._update)
                : null;
    };

    this.target = options.target;
    this.scrollEase = options.scrollEase != null ? options.scrollEase : 0.1;
    this.maxOffset = options.maxOffset != null ? options.maxOffset : 500;
    this.endThreshold = 0.05;
    this.requestId = null;
    this.maxDepth = 10;
    this.viewHeight = 0;
    this.halfViewHeight = 0;
    this.maxDistance = 0;
    this.scrollHeight = 0;
    this.endScroll = 0;
    this.currentScroll = 0;
    this.resizeRequest = 1;
    this.scrollRequest = 0;
    this.scrollItems = [];
    this.addItems();
    this._update();

    window.addEventListener("resize", this._onResize);
    window.addEventListener("scroll", this._onScroll);
}

SmoothScroll.prototype.addItems = function() {
    this.scrollItems = [];
    var elements = document.querySelectorAll("*[data-depth]");
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var depth = +element.getAttribute("data-depth");
        var rect = element.getBoundingClientRect();
        var item = {
            target: element,
            depth: depth,
            top: rect.top + window.pageYOffset,
            depthRatio: depth / this.maxDepth,
            currentOffset: 0,
            endOffset: 0
        };
        this.scrollItems.push(item);
    }
    return this;
};

export default SmoothScroll;