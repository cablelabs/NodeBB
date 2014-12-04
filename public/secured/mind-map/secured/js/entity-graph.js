/**
 * EntityGraph
 * Dependencies:  jQuery, dom-element.js
 *
 * EntityGraph creates a visual representation of data entity relationships that you can navigate by clicking on the entities.
 */


var EntityGraph = (function () {

var swaggerUriBase;


function create (data, elementID) {
    swaggerUriBase = data.swaggerUriBase;
    var graph = new Graph({
        elem: document.getElementById('graph'),
        data: data
    });
    //setup jQuery popover component
    $('[data-toggle="popover"]').popover();
    return graph;
}


/**
 * Objects
 */


//Graph
function Graph (spec) {
    DomElement.call(this, spec)
    this.depth = 1
}

Graph.prototype = Object.create(DomElement.prototype)

Graph.prototype.init = function() {
    var self = this;
    this.data.domains.forEach( function (domain) {
        if (domain.name.toLowerCase() !== 'unsuported') {
            self.append( new Domain ( {
                name: domain.name,
                data: domain.entities
            }))
        }
    })
};

Graph.prototype.onEmit = function(event, data) {
    switch (event) {
        case 'search':
            this.broadcast(event, data)
            break
        case 'reset':
            this.onReset(data)
            break
        case 'depth':
            this.onDepth(data)
            break
        default:
            this.emit(event, data)
    }   
}

Graph.prototype.reset = function() {
    this.broadcast('reset')
}

Graph.prototype.search = function(term) {
    this.broadcast('search', term)
};

Graph.prototype.setDepth = function(depth) {
    this.broadcast('reset')
    this.depth = depth
    if (this.selectedEntity) {
        this.selectedEntity.toggle('selected', true)
        this.selectedEntity.setDepth()
    }
};

Graph.prototype.onReset = function (data) {
    this.selectedEntity = null;
    this.broadcast('reset', data)
}

Graph.prototype.onDepth = function (data) {
    data.graphDepth = this.depth
    if (data.entity.depth === 0) {
        this.selectedEntity = data.entity
    }
    this.broadcast('depth', data)
}



//Domain
function Domain (spec) {
    this.name = spec.name
    DomElement.call(this, spec)
}

Domain.prototype = Object.create(DomElement.prototype);

Domain.prototype.createSelfElem = function(spec) {
    DomElement.prototype.createSelfElem.call(this, spec);

    this.elem.className = 'domain open';

    var h2 = document.createElement('h2')
    h2.classList.add('domain-title')
    this.elem.appendChild(h2).innerHTML = this.name

    this.childContainer = this.elem.appendChild(document.createElement('div'))
    this.childContainer.classList.add('entities')
};

Domain.prototype.init = function () {
    this.on('click', this.clickHandler, '.domain-title')

    this.data.forEach( function (entity) {
        this.append(new Entity({
            data: entity,
            domainName: this.name
        }))
    }, this)
}

Domain.prototype.clickHandler = function(event) {
    this.toggle('open')
};





//Entity
function Entity (spec) {
    this.name = spec.data.name
    this.domainName = spec.domainName
    DomElement.call(this, spec)
}

Entity.prototype = Object.create(DomElement.prototype)

Entity.prototype.createSelfElem = function(spec) {
    DomElement.prototype.createSelfElem.call(this, spec)

    this.elem.className = 'entity'

    //breadcrumbs trail
    this.hopTrail = new DomElement({ attr: { class: 'hop-trail'} })

    //information icon
    var info = new DomElement({
        elem: 'span',
        attr: {
            class: 'glyphicon glyphicon-info-sign description', // bootstrap glyphicon
            'data-container': 'body', // bootstrap popover attribute
            'data-toggle': 'popover', // bootstrap popover attribute
            'data-placement': 'bottom',  // bootstrap popover attribute
            'data-content': this.data.description, // bootstrap popover attribute
            title: ' ',  //single space content allows for info popup header bar
        }
    }).on('click', function (e) {
        this.parent.toggle('selected')
    })

    //link to swagger
    var apiLink = new DomElement({
        elem: 'a',
        attr: { class: 'api-link', href: this.getLink() }
    })
    .append( new DomElement({
        elem: 'span',
        attr: {
            class: 'glyphicon glyphicon-retweet',
            title: this.name + ' documentation',
            'aria-hidden': 'true'
        }
    }))

    //append children to entity
    this
        .append( this.hopTrail )     //append breadcrumbs trail
        .append( new DomElement({    //append title
            elem: 'h3',
            attr: { class: 'entity-title' },
            text: this.name
        }))
        .append(                     //append glyphs
            new DomElement({
                attr: { class: 'glyphs'}
            }).append(info).append(apiLink)
        )

};

Entity.prototype.init = function () {
    this.on('click', this.clickHandler)
};

Entity.prototype.clickHandler = function(event) {
    if (event.target.tagName !== 'SPAN') {
        var selected = this.elem.classList.contains('selected');
        this.emit('reset')
        if (!selected) {
            this.toggle('selected', true)
            this.setDepth()
        }
    } 
};

Entity.prototype.setDepth = function (previous) {
    this.depth = previous ? previous.entity.depth + 1 : 0;

    var depthObj = {
        entity: this,
        previous: previous
    }

    //remove any previous depth classes
    this.elem.className = this.elem.className.replace(/depth-\d/, '')

    this.toggle('depth-' + this.depth, true)
    this.hopTrail.elem.innerHTML = getDepthString(depthObj)

    this.emit('depth', depthObj)
}

Entity.prototype.onBroadcast = function(event, data) {
    switch (event) {
        case 'depth':
            this.onDepth(data)
            break
        case 'search':
            this.onSearch(data)
            break
        case 'reset':
            this.onReset()
            break
        default:
            this.broadcast(event, data)
    }
}


Entity.prototype.onDepth = function(data) {

    if (this.depth === -1) {
        this.toggle('noshow', true)
    }

    if (data.entity.depth < data.graphDepth) {
        if (this.depth < 0 || data.entity.depth < this.depth - 1) {
            var thisPathName = getPathName(this.data.path),
                dataPathName = getPathName(data.entity.data.path);
            if (thisPathName && (data.entity.data.links.indexOf(thisPathName) >= 0 || this.data.links.indexOf(dataPathName) >= 0)) {
                this.toggle('noshow', false)
                this.setDepth(data)
            }
        }
    }
}

Entity.prototype.onReset = function () {
    this.depth = -1
    this.elem.className = 'entity'
    this.hopTrail.elem.innerHTML = ''
}

Entity.prototype.onSearch = function(term) {
    this.onReset()
    if (term) {
        var re = new RegExp(term, 'gi')
        if (!re.test(this.name)){
            this.toggle('noshow', true)
        }
    }
};

Entity.prototype.getLink = function () {
    var linkBase = swaggerUriBase + this.domainName,
        path = this.data.path.replace(/{|}/g, '').replace(/(?!^)\//g, '_')
    return linkBase + path + '_get';
};

function getPathName (path) {
    var re = /^\/([^\/.]*)\/{id}$/
    var result = re.exec(path)
    return result ? result[1] : result
}

function getDepthString (data){
    var result = '';
    while (data.previous && data.entity.depth > 1) {
        result = data.previous.entity.name + (result ? ' &#8594; ' : '') + result;
        data = data.previous
    }
    return result
}

/**
 * End Objects
 */


return {
    create: create
}


}(window, document));