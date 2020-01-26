import {HOME_BG, TECHNICAL_BG, CULTURAL_BG, SPORTS_BG, EVENTPAGE_BG} from "../actions/types"

const initialState = {
	background: "cultural_bg",
}

export default function(state = initialState, action){
	switch(action.type)
	{
		case HOME_BG:
			return {
				...initialState,
				background : "home_bg"
			}

		case TECHNICAL_BG:
			return {
				...initialState,
				background : "technical_bg"
			}
		
		case EVENTPAGE_BG:
			return {
				...initialState,
				background : "cultural_categories"
			}

		case SPORTS_BG:
			return {
				...initialState,
				background : "sports_bg"
			}

		case CULTURAL_BG:
			return {
				...initialState,
				background : "cultural_bg"
			}

		default:
		return state;
	}
}