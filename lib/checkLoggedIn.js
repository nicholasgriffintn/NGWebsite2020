import { CognitoUserPool } from "amazon-cognito-identity-js";
import { config } from "../config/config";

export default () => {
  const userPool = new CognitoUserPool({
    UserPoolId: config.AUTH.UserPoolId,
    ClientId: config.AUTH.ClientId,
  });

  const cognitoUser = userPool.getCurrentUser();

  if (cognitoUser && cognitoUser !== null) {
    return cognitoUser.getSession((err, res) => {
      if (err) {
        console.error("error with authentication: ", err);
        throw err;
      }
      if (res && res.isValid()) {
        return { user: res, loggedIn: res.isValid() };
      } else {
        return { user: res, loggedIn: false };
      }
    });
  } else {
    return { user: { null: "null" }, loggedIn: false };
  }
};
