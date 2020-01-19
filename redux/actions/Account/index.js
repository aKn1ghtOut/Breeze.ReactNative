import {RETRIEVE_USER_STATUS, USER_NOT_AUTHENTICATED, LOGIN_DATA, LOGIN_FAILED} from "../../actions/types"

import cookies from "react-cookies";

export function retrieve_user_status(){
	return async (dispatch) =>
	{
		fetch(
			((process.env.REACT_APP_API_URL || "http://127.0.0.1:8000/") + "rest-auth/verifyUser"),
			{
				method:		"GET",
				headers:	new Headers({
					"Content-Type" : "application/json",
					"Authorization":		cookies.load("BreezeToken")
				})
			}
		)
		.then(
			async (res) => {

				let resp = await res.json();

				console.log(resp);
                
				if(resp.status === "success")
				return dispatch({
					type:			RETRIEVE_USER_STATUS,
					userState:		resp.user_data
				});
				else
				return dispatch({
                    type:           USER_NOT_AUTHENTICATED
                });
			}, 
			(err) => {
                return dispatch({
                    type:           USER_NOT_AUTHENTICATED
                });
            }
		).catch(
			e => {
				return dispatch({
                    type:           USER_NOT_AUTHENTICATED
                });
			}
		)
	}
}