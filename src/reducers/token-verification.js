import {TOKEN_VERIFICATION} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case TOKEN_VERIFICATION:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
