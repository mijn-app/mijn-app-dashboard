import { combineReducers } from 'redux';

import * as application from './application';
import * as journey from './journey';
import * as journeys from './journeys';
import * as journeyUi from './journeyUi';
import * as order from './order';
import * as orders from './orders';

export default combineReducers({
  ...application,
  ...journey,
  ...journeys,
  ...journeyUi,
  ...order,
  ...orders,
});
