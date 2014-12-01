/**
 * Dom Element
 *
 * Dom Element is an object for relating data to the DOM.  Each instance of DomElement contains an element of the dom.
 * When dynamically building elements from JSON data, using the DomElement module enables you to parallel communication between
 * data objects with the structures that represent them in the DOM.
 */

function DomElement (spec) {
    this.data = spec.data
    this.children = []
    spec.elem = spec.elem || 'div'
    this.createSelfElem(spec)
    this.init()
}

DomElement.prototype.createSelfElem = function(spec) {
    this.elem = typeof spec.elem === 'object' ? spec.elem : document.createElement(spec.elem)
    this.childContainer = this.elem
    if (spec.attr) {
        var self = this;
        Object.keys(spec.attr).forEach( function (attribute) {
            self.elem.setAttribute(attribute, spec.attr[attribute])
        })
    }
    if (spec.text) { this.elem.innerHTML = spec.text }
};


DomElement.prototype.init = function() {};


DomElement.prototype.append = function(child) {
    this.children.push(child)
    child.parent = this
    this.childContainer.appendChild(child.elem)
    return this
}

DomElement.prototype.on = function(eventType, fn, target) {
    var elems = target ? this.elem.querySelectorAll(target) : [this.elem]
    for ( var i = elems.length - 1; i >= 0; i -= 1) {
        elems[i].addEventListener(eventType, fn.bind(this))
    }
    return this
}

DomElement.prototype.toggle = function (toggleClass, confirm) {
    if (typeof confirm === 'undefined') {
        this.elem.classList.toggle(toggleClass)
    } else {
        this.elem.classList.toggle(toggleClass, confirm)
    }
    return this
}

DomElement.prototype.position = function() {
    return this.elem.getBoundingClientRect();
}

DomElement.prototype.emit = function(event, data) {
    if (this.hasOwnProperty('parent')) {
        this.parent.onEmit(event, data)
    }
    return this
}

DomElement.prototype.onEmit = function(event, data) {
    this.emit(event, data)
    return this
}

DomElement.prototype.broadcast = function(event, data) {
    this.children.forEach( function (child) {
        child.onBroadcast(event, data)
    })
    return this
}

DomElement.prototype.onBroadcast = function(event, data) {
    this.broadcast(event, data)
    return this
};