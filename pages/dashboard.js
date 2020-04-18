import React from "react";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

import Page from "../components/Page";

import PostForm from "../components/PostForm";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      title: "",
      description: "",
      tags: "",
      thumbnail: "",
      header: "",
      content: "",
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

  _handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  _handleChangeDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  _handleChangeTags = (e) => {
    this.setState({ tags: e.target.value });
  };

  _handleChangeThumbnail = (e) => {
    this.setState({ thumbnail: e.target.value });
  };

  _handleChangeHeader = (e) => {
    this.setState({ header: e.target.value });
  };

  _handleChangeContent = (e) => {
    this.setState({ content: e.target.value });
  };

  _handleSave = () => {
    //PUT SAVE HERE
  };

  render() {
    return (
      <Page displayHeader={true} title="Dashboard">
        <div className="content-wrap">
          <div className="container-main">
            <div className="page-header-spacer"></div>

            <h1>Welcome to the dashboard</h1>

            {this.state.user && this.state.user.idToken ? (
              <React.Fragment>
                <div className="userData">
                  <p>
                    <strong>User Data:</strong>
                  </p>
                  <p>Sub: {this.state.user.idToken.payload.sub}</p>
                  <p>Email: {this.state.user.idToken.payload.email}</p>
                  <p>
                    <strong>Token:</strong>
                  </p>
                  <pre>{this.state.user.idToken.jwtToken}</pre>
                </div>

                <h2>Create a post</h2>

                <PostForm
                  title={this.state.title}
                  description={this.state.description}
                  tags={this.state.tags}
                  thumbnail={this.state.thumbnail}
                  header={this.state.header}
                  content={this.state.content}
                  onTitleChange={this._handleChangeTitle}
                  onDescriptionChange={this._handleChangeDescription}
                  onTagsChange={this._handleChangeTags}
                  onThumbnailChange={this._handleChangeThumbnail}
                  onHeaderChange={this._handleChangeHeader}
                  onContentChange={this._handleChangeContent}
                />
                <button className="btn btn-primary" onClick={this._handleSave}>
                  Publish
                </button>
              </React.Fragment>
            ) : (
              <p>Loading data</p>
            )}
          </div>
        </div>
      </Page>
    );
  }
}
