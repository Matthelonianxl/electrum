'use strict';

import {expect} from 'mai-chai';
import LinkingMiddleware from '../linking-middleware.js';

describe ('LinkingMiddleware', () => {

  const middleware = new LinkingMiddleware ();

  beforeEach (() => middleware.reset ());

  describe ('link()', () => {
    it ('applies default middleware logic to properties', () => {
      middleware.register ('foo');
      expect (middleware.link ({x: 1, foo: 'bar'}, 'i')).to.deep.equal ({foo: 'bar'});
      expect (middleware.link ({x: 1, foo: 'bar'}, 'i', {x: 2})).to.deep.equal ({foo: 'bar'});
      expect (middleware.link ({x: 1, foo: 'bar'}, 'i', {foo: 'BAR'})).to.deep.equal ({foo: 'BAR'});
    });

    it ('applies custom middleware logic to properties', () => {
      middleware.register ('foo', (id, prop) => prop + '/' + id);
      expect (middleware.link ({x: 1, foo: 'bar'}, 'i')).to.deep.equal ({foo: 'bar/i'});
      expect (middleware.link ({x: 1, foo: 'bar'}, 'i', {x: 2})).to.deep.equal ({foo: 'bar/i'});
      expect (middleware.link ({x: 1, foo: 'bar'}, 'i', {foo: 'BAR'})).to.deep.equal ({foo: 'BAR/i'});
    });
  });
});
