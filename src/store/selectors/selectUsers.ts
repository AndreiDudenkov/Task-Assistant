import {UserType} from 'types';
import {RootStoreType} from '../index';


export const selectUsers = (state: RootStoreType): UserType[] => state.usersData.users;
