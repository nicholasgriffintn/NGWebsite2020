// _error.js is only used in production. In development you'll get an error with the call stack to know where the error originated from.
import React from "react";

import Page from "../components/Page";

import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";

import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";
import { config } from "../config/config";

const userPool = new CognitoUserPool({
  UserPoolId: config.AUTH.UserPoolId,
  ClientId: config.AUTH.ClientId,
});

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    const { loggedIn } = checkLoggedIn();
    if (loggedIn) {
      redirect({}, "/dashboard");
    }
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleTwoFactorChange(e) {
    this.setState({ twofactor: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim();
    const password = this.state.password.trim();
    const authenticationData = {
      Email: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userData = {
      Username: email,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        redirect({}, "/dashboard");
      },

      onFailure: function (err) {
        console.log("error ", err);
      },

      mfaRequired: function (codeDeliveryDetails) {
        var verificationCode = prompt("Please input verification code", "");
        cognitoUser.sendMFACode(verificationCode, this);
      },

      newPasswordRequired: function (userAttributes, requiredAttributes) {
        var newPassword = prompt("Please input a new password", "");

        delete userAttributes.email_verified;
        delete userAttributes.phone_number_verified;

        cognitoUser.completeNewPasswordChallenge(
          newPassword,
          userAttributes,
          this
        );
      },
    });
  }
  render() {
    return (
      <Page displayHeader={true} title="Login">
        <div className="content-wrap">
          <div className="container-main">
            <div className="page-header-spacer"></div>

            <h1 id="single-title" className="animated bounceInDown">
              Sign in to the dashboard
            </h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="form-control">
                <input
                  type="text"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleEmailChange.bind(this)}
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handlePasswordChange.bind(this)}
                />
              </div>
              <div className="form-control">
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </Page>
    );
  }
}
