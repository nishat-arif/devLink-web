//export const base_url = "http://localhost:3000";

export const base_url = location.hostname === "localhost"? "http://localhost:3000" : "/api";

export const login_api_suffix= "/login"

export const logout_api_suffix = "/logout"

export const feed_api_suffix = '/feed';

export const profile_view_api_suffix = '/profile/view';

export const profile_edit_api_suffix = '/profile/edit';

export const signup_api_suffix = '/signup';

export const requestsReceived_api_suffix = '/users/requests/received';

export const connection_api_suffix = "/users/connections";

export const chat_api_suffix = "/chat";

export const payment_create_suffix = "/payment/create"

export const payment_verify_suffix = "/payment/verify"

export const remove_connection_suffix = "/users/removeconnection"

export const password_set_suffix = "/profile/password"

export const app_icon_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4O8TBQ9TvkdW5tb-u-jfjSLG7PlUaW6DF_dOd5gANdrO5x10-X84vwkA&s"



