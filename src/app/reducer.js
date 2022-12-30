import { combineReducers } from "redux";

// common reducers
import userModalReducer from "../components/UserModal/UserModalSlice";
import functionCallModalReducer from "../components/FunctionCallModal/FunctionCallSlice";
import signInModalReducer from "../components/SignInModal/SignInModalSlice";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  userModal: userModalReducer,
  functionCallModal: functionCallModalReducer,
  signInModal: signInModalReducer,
});

export default rootReducer;
