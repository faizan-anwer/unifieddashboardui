import {SUBS_ISOTOPES} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case SUBS_ISOTOPES:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
