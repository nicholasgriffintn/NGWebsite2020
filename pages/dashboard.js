import React from "react";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

import Page from "../components/Page";

import PostForm from "../components/PostForm";

import { config } from "../config/config";

class Dashboard extends React.Component {
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
      postData: {},
      id: "",
      isEditing: false,
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

    if (this.props.postData && this.props.postData.article) {
      this.setState({
        isEditing: true,
        title: this.props.postData.article.title || "",
        description: this.props.postData.article.description || "",
        content: this.props.postData.article.content || "",
        header: this.props.postData.article.header || "",
        thumbnail: this.props.postData.article.thumbnail || "",
        tags: this.props.postData.article.tags || "",
        id: this.props.postData.article.id || "",
      });
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
    console.log(e);
    this.setState({ content: e });
  };

  _slugify = (text) => {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    const to = "aaaaaeeeeeiiiiooooouuuunc------";

    const newText = text
      .split("")
      .map((letter, i) =>
        letter.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
      );

    return newText
      .toString() // Cast to string
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/&/g, "-y-") // Replace & with 'and'
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
  };

  _handleSave = () => {
    if (
      this.state &&
      this.state.user &&
      this.state.user.idToken &&
      this.state.user.idToken.jwtToken
    ) {
      if (
        this.state.title &&
        this.state.description &&
        this.state.tags &&
        this.state.thumbnail &&
        this.state.header &&
        this.state.content
      ) {
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Bearer " + this.state.user.idToken.jwtToken
        );
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          slug: this._slugify(this.state.title),
          title: this.state.title,
          published: true,
          description: this.state.description,
          tags: this.state.tags,
          thumbnail: this.state.thumbnail,
          header: this.state.header,
          content: this.state.content,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch("/api/admin/content", requestOptions)
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      } else {
        console.error("incorrect params");
      }
    } else {
      redirect({}, "/login");
    }
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

                {this.state.isEditing &&
                this.props.postData &&
                this.props.postData.article ? (
                  <h2>Edit the post: {this.props.postData.article.title}</h2>
                ) : (
                  <h2>Create a post</h2>
                )}

                <PostForm
                  isEditing={this.state.isEditing}
                  id={this.state.id}
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

Dashboard.getInitialProps = async (context) => {
  let error = false;
  let loading = true;
  let postData = {};

  if (context.query && context.query.article) {
    console.log(context.query.article);

    return fetch(config.websiteUrl + "/api/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetArticle",
        variables: { id: context.query.article },
        query: `query GetArticle {
        article(id: "${context.query.article}") {
          id
          title
          content
          description
          tags
          thumbnail
          header
          createdAt
          updatedAt
        }
      }`,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseAsJson) => {
        loading = false;

        // Pass data to the page via props
        return { postData: responseAsJson.data };
      })
      .catch((e) => {
        console.error("error generating server side code");
        console.error(e);
        return { postData: { message: "No article id found" } };
      });
  } else {
    error = {
      message: "No article id found",
    };
    loading = false;
    return { postData: { message: "No article id found" } };
  }
};

export default Dashboard;
