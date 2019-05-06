import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import './App.css'
import Nav from './Components/Nav'
import Portfolio from './Components/portfolio/Portfolio'
import Services from './Components/services/Services'
import Contact from './Components/contact/Contact'
import About from './Components/about/About'
// import Pay from './Components/pay/Pay'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      portfolioItemSelected: false,
      selectedNavItem: 'home',
      size: 'lg',
      servicesSelection: false,
      contactSVG: [],
      prevNavRoute: null,
      navRoute: null
    }
    this.contactArr = [
      ['Email', 'jamison.rubino@gmail.com', 'mailto: jamison.rubino@gmail.com', true],
      [
        'LinkedIn',
        '/in/jamison-rubino-98545a133/',
        'https://linkedin.com/in/jamison-rubino-98545a133/'
      ],
      ['Github', 'jamisonrubino', 'https://github.com/jamisonrubino'],
      ['Codewars', 'jamisonrubino', 'https://www.codewars.com/users/jamisonrubino']
    ]
		//			['Phone', '(208) 596-4065', 'tel:208-596-4065'],
    this.contactSVG = [...Array(this.contactArr.length)]
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
    setTimeout(this.resize(), 1000)

    this.asyncForEach(this.contactArr, async (item, i, arr) => {
      await this.fetchSVG(item[0].toLowerCase(), i)
    }).then(_ => this.setState({ contactSVG: this.contactSVG }))
  }

  componentDidUpdate(prevProps) {
    if (this.pathRoot(prevProps) === 'portfolio' && this.pathRoot(this.props) !== 'portfolio')
      this.setState({ portfolioItemSelected: false, prevNavRoute: prevProps.navRoute })
  }

  pathRoot = props => props.location.pathname.split('/').filter(x => x.length > 0)[0]

  changeRoute = route => {
    if (route !== this.state.prevNavRoute) {
      this.props.history.replace(`/${route}/`)
      this.setState({ navRoute: route })
    }
  }

  resize = () => {
    if (window.innerWidth <= 840 && window.innerWidth > 516 && this.state.size !== 'md') {
      this.setState({ size: 'md' })
    } else if (window.innerWidth > 840 && this.state.size !== 'lg') {
      this.setState({ size: 'lg' })
    } else if (window.innerWidth <= 516 && this.state.size !== 'sm') {
      this.setState({ size: 'sm' })
    }
  }

  contactFill = servicesSelection => this.setState({ servicesSelection })

  asyncForEach = async (arr, callback) => {
    for (let i = 0; i < arr.length; i++) await callback(arr[i], i, arr)
  }

  fetchSVG = async (site, i, arr) => {
    await fetch(`/img/contact/${site}`)
      .then(res => res.text())
      .then(text => (this.contactSVG[i] = text))
  }

  setPortfolioItemSelected = (closed = false, path = null) => {
    path = path || this.props.location.pathname.split('/').filter(x => x.length > 0)
    let portfolioItemSelected = closed || path.length > 1
    this.setState({ portfolioItemSelected })
  }

  debounce = (func, wait, immediate) => {
	  var timeout;
	  return function executedFunction() {
	    var context = this;
	    var args = arguments;
	    var later = function() {
	      timeout = null;
	      if (!immediate) func.apply(context, args);
	    };
	    var callNow = immediate && !timeout;
	    clearTimeout(timeout);
	    timeout = setTimeout(later, wait);
	    if (callNow) func.apply(context, args);
	  };
  };

  render() {
    var NavWithRoute = withRouter(props => (
        <Nav {...props} size={this.state.size} changeRoute={this.changeRoute} route={this.state.navRoute} />
      )),
      AboutWithProps = props => (
        <About
          {...props}
          debounce={this.debounce}
        />
      ),
      PortfolioWithProps = props => (
        <Portfolio
          {...props}
          size={this.state.size}
          setItemSelected={this.setPortfolioItemSelected}
          itemSelected={this.state.portfolioItemSelected}
        />
      ),
      ServicesWithProps = props => (
        <Services {...props} size={this.state.size} contactFill={this.contactFill} />
      ),
      ContactWithProps = props => (
        <Contact
          {...props}
          asyncForEach={this.asyncForEach}
          contactArr={this.contactArr.slice(0)}
          servicesSelection={this.state.servicesSelection}
          size={this.state.size}
          svg={this.state.contactSVG}
        />
      )
/* ,
      PayWithProps = props => (
        <Pay
          {...props}
          size={this.state.size}
        />
      )
*/
//    <Route path="/pay" component={PayWithProps} />

    return (
      <div className="App">
        <NavWithRoute />
        <div className="content">
          <Route exact path="/" component={AboutWithProps} />
          <Route path="/portfolio/:piece?" component={PortfolioWithProps} />
          <Route path="/services" component={ServicesWithProps} />
          <Route path="/contact" component={ContactWithProps} />
        </div>
      </div>
    )
  }
}
export default withRouter(App)
