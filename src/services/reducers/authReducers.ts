import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
} from "../actions/auth/login";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../actions/auth/logout";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "../actions/auth/register";
import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED,
} from "../actions/auth/refreshToken";
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILED,
} from "../actions/auth/resetPassword";

type TAuth = {
  login_loading: boolean,
  login_error: boolean,
  login_success: boolean,
  logout_loading: boolean,
  logout_error: boolean,
  logout_success: boolean,
  register_loading: boolean,
  register_success: boolean,
  register_error: boolean,
  refresh_token_loading: boolean,
  refresh_token_success: boolean,
  refresh_token_error: boolean, 
}
const authInitialState = {
  login_loading: false,
  login_error: false,
  login_success: false,
  logout_loading: false,
  logout_error: false,
  logout_success: false,
  register_loading: false,
  register_success: false,
  register_error: false,
  refresh_token_loading: false,
  refresh_token_success: false,
  refresh_token_error: false,
};
export const authReducer = (state : TAuth = authInitialState, action : any) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        login_error: false,
        login_success: false,
        login_loading: true,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        login_loading: false,
        login_success: true,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        login_loading: false,
        login_error: true,
      };
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logout_loading: true,
        logout_success: false,
        logout_error: false,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logout_loading: false,
        logout_success: true,
      };
    }
    case LOGOUT_FAILED: {
      return {
        ...state,
        logout_loading: false,
        logout_error: true,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        register_error: false,
        register_loading: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        register_loading: false,
        register_error: false,
        register_success: true,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        register_loading: false,
        register_error: true,
        register_success: false,
      };
    }
    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refresh_token_loading: true,
        refresh_token_error: false,
        refresh_token_success: false,
      };
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refresh_token_loading: false,
        refresh_token_success: true,
      };
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refresh_token_loading: false,
        refresh_token_error: true,
      };
    }
    default: {
      return state;
    }
  }
};

const resetPasswordInitialState = {
  reset_password_loading: false,
  reset_password_error: false,
  reset_password_success: false,
  change_password_loading: false,
  change_password_error: false,
  change_password_success: false,
};
export const resetPasswordReducer = (
  state = resetPasswordInitialState,
  action : any
) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        reset_password_loading: true,
        reset_password_error: false,
        reset_password_success: false,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        reset_password_loading: false,
        reset_password_success: true,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        reset_password_loading: false,
        reset_password_error: true,
      };
    }
    case CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        change_password_loading: true,
        change_password_error: false,
        change_password_success: false,
      };
    }
    case CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        change_password_loading: false,
        change_password_success: true,
      };
    }
    case CHANGE_PASSWORD_FAILED: {
      return {
        ...state,
        change_password_loading: false,
        change_password_error: true,
      };
    }
    default: {
      return state;
    }
  }
};
