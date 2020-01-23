import {RETRIEVE_USER_STATUS, USER_NOT_AUTHENTICATED, LOGIN_DATA, LOGIN_FAILED} from "../../actions/types"

const initialState = {
	user: {},
	status: true,
	retrieved: false
}

export default function(state = initialState, action){
	switch(action.type)
	{
		case RETRIEVE_USER_STATUS:
		return {
			...state,
			user:		action.userState,
			retrieved:	true
		};

		case USER_NOT_AUTHENTICATED:
		return {
			...state,
			status: 	false,
			retrieved:	true
		}

		case LOGIN_DATA:
		return {
			...state,
			status: true,
			user:		action.userState,
			retrieved: true,
		}

		default:
		return state;
	}
}