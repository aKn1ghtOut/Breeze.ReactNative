import {HOME_BG, TECHNICAL_BG, CULTURAL_BG, SPORTS_BG, EVENTPAGE_BG} from "../actions/types"

const initialState = {
	background: "cultural_bg",
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