var Entity = function Entity(spec) {
  "use strict";
  var properties = new Set(['name', 'path', 'domain', 'description', 'links']);
  self = this;
  Object.keys(spec).forEach((function(key) {
    if (properties.has(key)) {
      self[key] = spec[key];
    }
  }));
  this.links = new Set(spec.links);
};
($traceurRuntime.createClass)(Entity, {
  add_link: function(link) {
    "use strict";
    if (typeof link === 'string') {
      this.links.add(link);
    } else if (typeof link === 'object' && link.hasOwnProperty('name')) {
      this.links.add(link.name);
    }
    return this;
  },
  has_link: function(link) {
    "use strict";
    if (typeof link === 'string') {
      return this.links.has(link);
    } else if (typeof link === 'object' && link.hasOwnProperty('name')) {
      return this.links.has(link.name);
    }
  }
}, {});
var Entity_Set = function Entity_Set(entities) {
  "use strict";
  this.entities = entities.map((function(ent) {
    return new Entity(ent);
  }));
};
($traceurRuntime.createClass)(Entity_Set, {
  by_name: function(names) {
    "use strict";
    return this.entities.filter((function(ent) {
      return names.indexOf(ent.name) >= 0;
    }));
  },
  by_domain: function(domain) {
    "use strict";
    if (domain) {
      return this.entities.filter((function(ent) {
        return ent.domain === domain;
      })).sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else {
      return this.all_by_domain();
    }
  },
  all_by_domain: function() {
    "use strict";
    var $__0 = this;
    var s = [];
    this.entities.forEach((function(ent) {
      if (s.indexOf(ent.domain) === -1) {
        s.push(ent.domain);
      }
    }));
    return s.sort().map((function(domain) {
      return {
        name: domain,
        entities: $__0.by_domain(domain)
      };
    }));
  },
  related: function(entity) {
    "use strict";
    if (Array.isArray(entity)) {
      return this.related_list(entity);
    } else {
      return this.entities.filter((function(ent) {
        return ent.has_link(entity) || entity.has_link(ent);
      }));
    }
  },
  related_list: function(list) {
    "use strict";
    var result = new Set(),
        self = this;
    list.forEach((function(entity) {
      self.related(entity).forEach((function(ent) {
        if (list.indexOf(ent) < 0) {
          result.add([entity, ent]);
        }
      }));
    }));
    return Array.from(result.values());
  },
  hops_data: function(entities, max) {
    "use strict";
    var entity_names = Array.isArray(entities) ? entities : [entities];
    entities = this.by_name(entity_names);
    var hops = [this.related_list(entities)],
        result = {};
    hops[0].forEach((function(pair) {
      result[pair[1].name] = {hops: 1};
    }));
    var $__2 = this,
        $__3 = function(i) {
          var next = hops[i - 1].map((function(pair) {
            return pair[1];
          }));
          hops[i] = ($__2.related_list(next)).filter((function(pair) {
            var name = pair[1].name;
            return !result.hasOwnProperty(name) && entity_names.indexOf(name) < 0;
          }));
          hops[i].forEach((function(pair) {
            if (!result.hasOwnProperty(pair[1].name)) {
              result[pair[1].name] = {
                hops: i + 1,
                trails: []
              };
            }
            if (result[pair[1].name].trails.indexOf(pair[0].name) < 0) {
              result[pair[1].name].trails.push(pair[0].name);
            }
          }));
        };
    for (var i = 1; i < max; i++) {
      $__3(i);
    }
    return result;
  }
}, {});
