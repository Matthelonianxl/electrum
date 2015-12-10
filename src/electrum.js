'use strict';

import {EventHandlers} from 'electrum-events';

import LinkingMiddleware from './linking-middleware.js';
import InjectingMiddleware from './injecting-middleware.js';
import {getBus, getWrap} from './utils/get-interfaces.js';
import extend from './utils/extend.js';
import wrap from './utils/wrap.js';

/******************************************************************************/

const emptyBus = {};

/******************************************************************************/

export default class Electrum {
  constructor (...wrappers) {
    this._wrappers = wrappers;
    this.reset ();
  }

  get bus () {
    return this._bus;
  }

  reset () {
    this._connectors = [];
    this._bus = emptyBus;
    this._linkingMiddleware = new LinkingMiddleware ();
    this._linkingMiddleware.register ('state', (id, state) => id === undefined ? state : state.select (id));
    this._linkingMiddleware.register ('theme', (id, theme) => theme);
    this._injectingMiddleware = new InjectingMiddleware ();
    this._injectingMiddleware.register ('events', obj => {
      EventHandlers.inject (obj, () => this.bus);
    });
    this._wrappers.forEach (x => this.use (x));
  }

  use (connector) {
    const wrap = getWrap (connector);
    const bus  = getBus (connector);

    if (wrap) {
      this._connectors.unshift (connector);
    }

    if (bus) {
      this.useBus (bus);
    }
  }

  useBus (bus) {
    if (this._bus !== emptyBus) {
      throw new Error ('Electrum does not support using multiple buses');
    }
    this._bus = bus;
  }

  inject (obj, props) {
    this._injectingMiddleware.inject (obj, props);
  }

  link (props, id, override) {
    return this._linkingMiddleware.link (props, id, override);
  }

  read (props, id) {
    const {state} = props;
    return state.get (id);
  }

  get injectingMiddleware () {
    return this._injectingMiddleware;
  }

  get linkingMiddleware () {
    return this._linkingMiddleware;
  }

  get connectors () {
    return this._connectors.slice ();
  }

  wrap (name, component, more) {
    const {styles} = more || {};
    return wrap (this._connectors, extend (name, component, styles));
  }
}

/******************************************************************************/
