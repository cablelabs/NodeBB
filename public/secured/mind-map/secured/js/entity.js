var Entity = (function (){
  'use strict';

  var properties = ['name', 'displayName', 'path', 'domain', 'description', 'links'];

  function Entity (spec) {
    var self = this;
    Object.keys(spec).forEach(function (key) {
      if (properties.indexOf(key) >= 0) { self[key] = spec[key]; }
    });
  }

  Entity.prototype.has_link = function (link) {
    if (typeof link === 'string') {
      return this.links.indexOf(link) >= 0;
    } else if (typeof link === 'object' && link.hasOwnProperty('name')) {
      return this.links.indexOf(link.name) >= 0;
    }
  };

  return Entity;
}());

var Entity_Set = (function (){
  'use strict';

  function Entity_Set (entities) {
    this.entities = entities.map( function (ent) { return new Entity(ent); });
  }

  Entity_Set.prototype.by_name = function (names) {
    return this.entities.filter( function (ent) { return names.indexOf(ent.name) >= 0; });
  };

  Entity_Set.prototype.by_domain = function (domain) {
    if (domain) {
      return this.entities
      .filter( function (ent) { return ent.domain === domain; })
      .sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    } else {
      return this.all_by_domain();
    }
  };

  Entity_Set.prototype.all_by_domain = function () {
    var s = [], self = this;
    this.entities.forEach( function (ent) {
      if (ent.domain && s.indexOf(ent.domain) === -1) { s.push(ent.domain); }
    });
    return s.sort().map( function (domain) {
      return { name: domain, entities: self.by_domain(domain) };
    });
  };

  Entity_Set.prototype.related = function (entity) {
    if (Array.isArray(entity)) {
      return this.related_list(entity);
    } else {
      return this.entities.map( function (ent) {
        return [ entity, ent, entity.has_link(ent), ent.has_link(entity) ];
      })
      .filter (function (rel) {
        return rel[2] || rel[3];
      });
    }
  };

  Entity_Set.prototype.related_list = function (list) {
    var result = [];
    list.forEach( function (ent) {
      result = result.concat(
        this.related(ent).filter(function (rel) {
          return list.indexOf(rel[1]) < 0;
        }));
    }, this);
    return result;
  };

  Entity_Set.prototype.hops_data = function (entities, max) {
    entities = this.by_name( Array.isArray(entities) ? entities : [entities] );

    var hops = [], result = {}, i = 0, next;

    function related_filter (rel) {
      var name = rel[1].name;
      return !result.hasOwnProperty(name) && next.indexOf(rel[1]) < 0;
    }

    function trail_map (list) {
      return list[0];
    }

    function related_each (rel) {
      if (!result.hasOwnProperty(rel[1].name)) {
        result[rel[1].name] = {hops: i+1, trail: []};
      }
      if (result[rel[1].name].trail.map(trail_map).indexOf(rel[0].name) < 0) {
        result[rel[1].name].trail.push([rel[0].name, rel[2], rel[3]]);
      }
    }

    for (; i < max; i++) {
      next = i === 0 ? entities : hops[i-1].map( function (rel) { return rel[1]; });
      hops[i] = this.related_list(next).filter(related_filter);
      hops[i].forEach(related_each);
    }

    return result;
  };

  return Entity_Set;
}());