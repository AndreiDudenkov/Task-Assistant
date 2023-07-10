import {createUser} from 'store/actions';
import {UserType} from 'types';

const initState = {
  users: [] as UserType[],
};

type InitStateType = typeof initState;
type ActionsType = ReturnType<typeof createUser>;

export const usersReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  debugger
  switch (action.type) {

    case 'CREATE_USER':
      return {
        users: [...state.users, action.payload] as UserType[],
      };
    default:
      return state;
  }
};
