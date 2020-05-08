import React from "react";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

import Page from "../components/Page";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      twofactor: null,
    };
  }

  componentDidMount() {
    const { user, loggedIn } = checkLoggedIn();
    if (!loggedIn) {
      redirect({}, "/login");
    } else if (user) {
      this.setState({ user: user });
    } else {
      redirect({}, "/login");
    }
  }

  handleTwoFactorChange(e) {
    this.setState({ twofactor: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    var verifyTwoFactorHeaders = new Headers();
    verifyTwoFactorHeaders.append(
      "Authorization",
      "Bearer " + this.state.user.idToken.jwtToken
    );
    verifyTwoFactorHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      twofactor: this.state.twofactor,
    });

    var requestOptions = {
      method: "POST",
      headers: verifyTwoFactorHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/admin/verify-two-factor", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.setState({ qrcode_secret_url: result.secretURL });
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <Page displayHeader={true} title="Dashboard">
        <div className="content-wrap">
          <div className="container-main">
            <div className="page-header-spacer"></div>

            <h1>Verify Two Factor Authentication</h1>

            {this.state.user && this.state.user.idToken ? (
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-control">
                  <input
                    type="twofactor"
                    value={this.state.twofactor}
                    placeholder="Two Factor Code"
                    onChange={this.handleTwoFactorChange.bind(this)}
                  />
                </div>
                <div className="form-control">
                  <input type="submit" />
                </div>
              </form>
            ) : (
              <p>Loading data</p>
            )}
          </div>
        </div>
      </Page>
    );
  }
}
