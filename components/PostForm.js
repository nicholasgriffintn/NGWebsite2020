import React from "react";

const ReactMarkdown = require("react-markdown");

export default class PostForm extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
        <div className="form-control">
          <input
            autoComplete="off"
            style={{ marginBottom: 24 }}
            placeholder="Post Title"
            onChange={this.props.onTitleChange}
            value={this.props.title}
          />
        </div>
        <div className="form-control">
          <textarea
            autoComplete="off"
            style={{ marginBottom: 24 }}
            placeholder="Post Description"
            onChange={this.props.onDescriptionChange}
            value={this.props.description}
          />
        </div>
        <div className="form-control">
          <input
            autoComplete="off"
            style={{ marginBottom: 24 }}
            placeholder="Post Tags"
            onChange={this.props.onTagsChange}
            value={this.props.tags}
          />
        </div>
        <div className="form-control">
          <input
            autoComplete="off"
            style={{ marginBottom: 24 }}
            placeholder="Post Thumbnail"
            onChange={this.props.onThumbnailChange}
            value={this.props.thumbnail}
          />
        </div>
        <div className="form-control">
          <input
            autoComplete="off"
            style={{ marginBottom: 24 }}
            placeholder="Post Header"
            onChange={this.props.onHeaderChange}
            value={this.props.header}
          />
        </div>
        <div className="form-control post-editor markdown-editor">
          <textarea
            autoComplete="off"
            style={{ height: 640, marginBottom: 24 }}
            placeholder="Post Content"
            onChange={this.props.onContentChange}
            value={this.props.content}
          />
          <div id="post-content" className="preview">
            <ReactMarkdown source={this.props.content} />
          </div>
        </div>
      </div>
    );
  }
}
