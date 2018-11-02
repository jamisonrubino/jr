import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import "./App.css";
import Nav from "./Components/Nav";
import Portfolio from "./Components/portfolio/Portfolio";
import Services from "./Components/services/Services";
import Contact from "./Components/contact/Contact";
import About from "./Components/about/About";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavItem: "home",
      size: "lg",
      servicesSelection: false
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
  }

  resize = () => {
    if (
      window.innerWidth <= 840 &&
      window.innerWidth > 516 &&
      this.state.size !== "md"
    ) {
      this.setState({ size: "md" });
    } else if (window.innerWidth > 840 && this.state.size !== "lg") {
      this.setState({ size: "lg" });
    } else if (window.innerWidth <= 516 && this.state.size !== "sm") {
      this.setState({ size: "sm" });
    }
  };

  contactFill = servicesSelection => {
    this.setState({ servicesSelection });
  };

  render() {
    var NavWithRoute = withRouter(props => <Nav {...props} />),
      PortfolioWithProps = props => (
        <Portfolio {...props} size={this.state.size} />
      ),
      ServicesWithProps = props => (
        <Services
          {...props}
          size={this.state.size}
          contactFill={this.contactFill}
        />
      ),
      ContactWithProps = props => (
        <Contact
          {...props}
          size={this.state.size}
          servicesSelection={this.state.servicesSelection}
        />
      );

    return (
      <div className="App">
        <NavWithRoute />
        <div className="content">
          <Route exact path="/" component={About} />
          <Route path="/portfolio/:piece?" component={PortfolioWithProps} />
          <Route path="/services" component={ServicesWithProps} />
          <Route path="/contact" component={ContactWithProps} />
        </div>
      </div>
    );
  }
}
export default withRouter(App);
