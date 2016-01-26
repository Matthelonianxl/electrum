'use strict';

import radium from 'radium';
import {FieldStates} from 'electrum-field';

import LinkingMiddleware from './linking-middleware.js';
import Electrum from './electrum.js';

/******************************************************************************/

class RadiumConnector {
  static wrap (component) {
    return radium (component);
  }
}

/******************************************************************************/

export default new Electrum (RadiumConnector);
export {Electrum, FieldStates, LinkingMiddleware};

/******************************************************************************/
