import React, { Component } from "react";
import { Link } from "react-router-dom";
import portfolioData from "./portfolioData";
import PortfolioPiece from "./PortfolioPiece";

export default class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolioPiece: null,
      pieceIndex: null
    };
    this.updateNav = this.updateNav.bind(this);
    this.pieceIndex = this.pieceIndex.bind(this);
    this.hidePortfolioPiece = this.hidePortfolioPiece.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.piece) {
      this.setState({
        portfolioPiece: this.props.match.params.piece,
        pieceIndex: portfolioData.portfolioPieces.findIndex(
          piece => piece.slug === this.props.match.params.piece
        )
      });
    }
  }

  updateNav() {
    this.props.updateNav("portfolio");
  }

  pieceIndex(index) {
    this.setState({ pieceIndex: index });
  }

  hidePortfolioPiece() {
    this.history.pushState(null, "portfolio");
  }

  render() {
    const links = portfolioData.portfolioPieces.map((pc, i) => (
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
      >
        <Link
          to={
            "/portfolio/" + (this.state.pieceIndex === i ? "" : pc.slug + "/")
          }
        >
          <li
            className={
              "portfolio__li" +
              (this.state.pieceIndex === i ? "--selected" : "")
            }
            style={pc.style}
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
    ));

    console.log(portfolioData.portfolioPieces);

    let portfolioPiece, portfolioSource;

    if (this.state.portfolioPiece) {
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
      portfolioSource = (
        <a
          href="https://github.com/jamisonrubino/jr"
          className="portfolio__source"
          target="_blank"
        >
          Portfolio Source
        </a>
      );
      portfolioPiece = null;
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
