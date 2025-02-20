import { GET_USER_DATA,DELETE_USERS,CREATE_USERS ,VALIDATE_TOKENS} from '../actions/formaction.ts'

const initialState = {
  users: [],
  authenticatedUser: null,
  validate: null,
  error: null,

};

export const formReducer = (state = initialState, action) => {
  console.log("reducer accessed")  
  switch (action.type) {
    case CREATE_USERS:
      return {
        ...state,
        users: [...state.users, action.payload], 
      };
    case GET_USER_DATA:
      return {
        ...state,
       users: action.payload,
        
      };
      
    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload), 
      };

      case VALIDATE_TOKENS:
        return{
          ...state,
          validate: true
        };
    // case AUTH_USER:
    //   return {
    //     ...state,
    //     authenticatedUser: action.payload, 
    //   };
    default:
      return state;
  }
};

 
