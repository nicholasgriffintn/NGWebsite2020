import React, { PureComponent } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import PropTypes from "prop-types";

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: null,
  };

  render() {
    const { language, value } = this.props;
    const codeString = "(num) => num + 1";
    return (
      <figure className="highlight">
        <SyntaxHighlighter language={language} style={docco}>
          {codeString}
          {value}
        </SyntaxHighlighter>
      </figure>
    );
  }
}

export default CodeBlock;
