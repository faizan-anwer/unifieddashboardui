import {GET_COUNTRIES} from "../actions/types";

export default function (state = {}, action)
{
  switch (action.type)
  {
    case GET_COUNTRIES:
      return action.payload;
  }
  return state;
};
