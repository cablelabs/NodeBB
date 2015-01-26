  class Entity {
    //spec contains:  name, path, domain, description, links
    constructor(spec) {
      var properties = new Set(['name', 'path', 'domain', 'description', 'links'])
          self = this;
      Object.keys(spec).forEach( (key) => {
        if (properties.has(key)) { self[key] = spec[key]; }
      });
      this.links = new Set(spec.links);
    }

    add_link (link) {
      if (typeof link === 'string') {
        this.links.add(link);
      } else if (typeof link === 'object' && link.hasOwnProperty('name')) {
        this.links.add(link.name);
      }
      return this;
    }

    has_link (link) {
      if (typeof link === 'string') {
        return this.links.has(link);
      } else if (typeof link === 'object' && link.hasOwnProperty('name')) {
        return this.links.has(link.name);
      }
    }
  }


  class Entity_Set {

    constructor(entities) {
      this.entities = entities.map( (ent) => { return new Entity(ent); });
    }

    by_name (names) {
      return this.entities.filter( (ent) => { return names.indexOf(ent.name) >= 0; });
    }

    by_domain (domain) {
      if (domain) {
        return this.entities
        .filter( (ent) => { return ent.domain === domain; })
        .sort(function (a, b) {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      } else {
        return this.all_by_domain();
      }
    }

    all_by_domain () {
      var s = [];
      this.entities.forEach( (ent) => { if (s.indexOf(ent.domain) === -1) { s.push(ent.domain); } });
      return s.sort().map( (domain) => { return { name: domain, entities: this.by_domain(domain) }; });
    }

    related (entity) {
      if (Array.isArray(entity)) { return this.related_list(entity); }
      else {
        return this.entities.filter( (ent) => {
          return ent.has_link(entity) || entity.has_link(ent);
        });
      }
    }

    related_list (list) {
      var result = new Set(), self = this;
      list.forEach((entity) => {
        self.related(entity).forEach( (ent) => {
          if (list.indexOf(ent) < 0) { result.add([entity, ent]); }
        });
      });
      return Array.from(result.values());
    }

    hops_data (entities, max) {

      var entity_names =  Array.isArray(entities) ? entities : [entities];
      entities = this.by_name(entity_names);

      var hops = [this.related_list(entities)],
          result = {};
      hops[0].forEach( (pair) => { result[pair[1].name] = {hops: 1}; });

      for (let i = 1; i < max; i++) {

        let next = hops[i-1].map( (pair) => { return pair[1]; });

        hops[i] = (this.related_list(next)).filter( (pair) => {
          var name = pair[1].name;
          return !result.hasOwnProperty(name) && entity_names.indexOf(name) < 0;
        });

        hops[i].forEach( (pair) => {
          if (!result.hasOwnProperty(pair[1].name)) {
            result[pair[1].name] = {hops: i+1, trails: []};
          }
          if (result[pair[1].name].trails.indexOf(pair[0].name) < 0) {
            result[pair[1].name].trails.push(pair[0].name);
          }
        });
      }

      return result;
    }

  }