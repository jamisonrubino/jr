import React, { Component } from "react";
import { Link } from "react-router-dom";
import portfolioData from "./portfolioData";
import PortfolioPiece from "./PortfolioPiece";

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pieceIndex: null
    };
  }

  componentDidMount() {
    if (this.props.match.params.piece) {
      this.setState({
        pieceIndex: portfolioData.portfolioPieces.findIndex(
          piece => piece.slug === this.props.match.params.piece
        )
      });
    }
  }

  updateNav = _ => this.props.updateNav("portfolio");

  pieceIndex = index => this.setState({ pieceIndex: index });

  hidePortfolioPiece = _ => this.history.pushState(null, "portfolio");

  render() {
    const lastRow = (i, arr) =>
        i >= arr.length - 1 - ((arr.length - 1) % 3) ? { marginBottom: 0 } : {},
      links = portfolioData.portfolioPieces.map((pc, i, arr) => {
        let lastRowStyle = lastRow(i, arr);
        return (
          <div
            className={
              "portfolio__li__wrapper" +
              (this.state.pieceIndex !== null
                ? i > this.state.pieceIndex + (2 - (this.state.pieceIndex % 3))
                  ? " hidden"
                  : ""
                : "")
            }
            onClick={() =>
              this.state.pieceIndex !== i ? this.pieceIndex(i) : null
            }
            key={i}
            style={lastRowStyle}
          >
            <Link
              to={
                "/portfolio/" +
                (this.state.pieceIndex === i ? "" : pc.slug + "/")
              }
            >
              <li
                className={
                  "portfolio__li" +
                  (this.state.pieceIndex === i ? "--selected" : "")
                }
                style={{ ...pc.style, ...lastRowStyle }}
              />
              <span
                className={
                  "portfolio__li__title" +
                  (this.state.pieceIndex === i ? "--selected" : "")
                }
              >
                {(() =>
                  pc.name
                    .split("")
                    .map(l => (l === l.toUpperCase() ? " " + l : l))
                    .join(""))()}
              </span>
            </Link>
          </div>
        );
      });

    console.log(portfolioData.portfolioPieces);

    let portfolioPiece, portfolioSource;

    if (this.state.pieceIndex != null) {
      portfolioPiece = (
        <PortfolioPiece
          numSlides={
            portfolioData.portfolioPieces[this.state.pieceIndex].numSlides
          }
          piece={portfolioData.portfolioPieces[this.state.pieceIndex]}
          index={this.state.pieceIndex}
          size={this.props.size}
        />
      );
      portfolioSource = null;
    } else {
      portfolioPiece = null;
      portfolioSource = (
        <a
          href="https://github.com/jamisonrubino/jr"
          className="portfolio__source"
          target="_blank"
        >
          Portfolio Source
        </a>
      );
    }

    return (
      <div className="div__portfolio">
        <div className="portfolio__ul__wrap">{links}</div>
        {portfolioSource}
        {portfolioPiece}
      </div>
    );
  }
}
