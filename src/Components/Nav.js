import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTop: true
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", () => {
      let isTop = window.scrollY <= 130;
      if (this.state.headerTop !== isTop) this.setState({ headerTop: isTop });
    });
    window.scrollTo(0, 0);
  }

  render() {
    const path = this.props.location.pathname
      .split("/")
      .filter(x => x.length > 0)[0];
    return (
      <div
        className="header__wrap"
        style={this.state.headerTop ? {} : { paddingTop: "130px" }}
      >
        <header className={"header" + (this.state.headerTop ? "" : "--fixed")}>
          <div className="header__home">
            <h1 className="header__home__link">
              <Link to="/">Jamison Rubino</Link>
            </h1>
            <span
              className={
                "header__home__tagline" +
                (this.props.location.pathname.length <= 1 ? "--selected" : "")
              }
            >
              JUNIOR WEB DEVELOPER
            </span>
          </div>
          <nav>
            <ul>
              <Link to="/portfolio/">
                <li className={path === "portfolio" ? "selected" : ""}>
                  Portfolio
                </li>
              </Link>
              <Link to="/services/">
                <li className={path === "services" ? "selected" : ""}>
                  Services
                </li>
              </Link>
              <Link to="/contact/">
                <li className={path === "contact" ? "selected" : ""}>
                  Contact
                </li>
              </Link>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}
