import axios from "axios"
import { returnErrors } from "./messages"
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from "./actionTypes"

export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING })
	const token = getState().auth.token

	const config = {
		headers: {
			"Content-type": "application/json",
		},
	}

	if (token) {
		config.headers["Authorization"] = `Token ${token}`
	}
	axios
		.get("/api/auth/user", config)
		.then((res) => {
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status))
			dispatch({
				type: AUTH_ERROR,
			})
		})
}
