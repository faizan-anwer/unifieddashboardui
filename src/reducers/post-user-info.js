import {POST_USER_INFO} from '../actions/types';

export default function (state = {}, action)
{
  switch (action.type)
  {
    case POST_USER_INFO:
      return action.payload;
  }
  return state;
};
