
import escapeHtml from "escape-html"
import { Node, Text } from "slate"

require("es6-promise").polyfill()

export const serializeNode = node => {
  if (Text.isText(node)) {
    if (node['heading-one']) {
      return `<h1>${node.text}</h1>`
    }

    if (node['heading-two']) {
      return `<h2>${node.text}</h2>`
    }
    return escapeHtml(node.text)
  }

  if (node.children) {
    const children = node.children.map(n => serializeNode(n)).join("")

    switch (node.type) {
      case "quote":
        return `<blockquote><p>${children}</p></blockquote>`
      case "paragraph":
        return `<p>${children}</p>`
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`
      case "image":
        return `<img src="${children}" alt="" />`
      default:
        return children
    }
  }
}

export const isJsonString = function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}