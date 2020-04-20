const React = require("react");
const PropTypes = require("prop-types");
const hljs = require("highlight.js");

class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <div
        className={
          this.props.title ? "code-block-wrap with-title" : "code-block-wrap"
        }
      >
        {this.props.title && (
          <span class="code-block-title">{this.props.title}</span>
        )}
        <pre>
          <code ref={this.setRef} className={`language-${this.props.language}`}>
            {this.props.value}
          </code>
        </pre>
      </div>
    );
  }
}

CodeBlock.defaultProps = {
  language: "",
};

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};

module.exports = CodeBlock;
