'use strict';

import Middleware from './middleware.js';

/*****************************************************************************/

function Electrum () {
  if (!(this instanceof Electrum)) {
    var obj = Object.create (Electrum.prototype);
    obj.constructor.apply (obj, arguments);
    return obj;
  }

  this.connectors = [];
  this.bus = {};

  for (var i = 0; i < arguments.length; i++) {
    this.use (arguments[i]);
  }
}

/*****************************************************************************/

import use from './use.js';
import createClass from './create-class.js';

Electrum.prototype.use = use;
Electrum.prototype.createClass = createClass;

const middleware = new Middleware ();
middleware.register ('state', (id, prop) => prop.select (id));
middleware.register ('theme', (id, prop) => prop);

Electrum.middleware = middleware;

/*****************************************************************************/

export default Electrum;
export const E = new Electrum ();

function wrapComponent (name, component) {
  return E.createClass (name, component);
}

E.wrapComponent = wrapComponent;

/*****************************************************************************/
