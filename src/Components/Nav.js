import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerTop: true
    }
    this.headerTimeout = null
    this.links = ['portfolio', 'services', 'contact']
		// pay
  }

  componentDidMount() {
    document.addEventListener('scroll', () => {
      clearTimeout(this.headerTimeout)
      let isTop = window.scrollY <= 110
      if (this.state.headerTop !== isTop) {
        if (!isTop) {
          this.headerTimeout = setTimeout(
            () => this.setState({ headerTop: isTop }),
            window.scrollY > 400 ? 0 : 400
          )
        } else {
          this.setState({ headerTop: isTop })
        }
      }
    })
    window.scrollTo(0, 0)
  }

  selectNavItem = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    let link = e.target.parentNode
    link.focus()
    setTimeout(() => this.props.changeRoute(item), 600)
  }

  render() {
    const path = this.props.location.pathname.split('/').filter(x => x.length > 0)[0]
    let sm = this.props.size === 'sm' && !this.state.headerTop,
      home = this.props.location.pathname.length <= 1

    const HeaderHome = props => (
      <div className="header__home">
        <h1 className={"header__home__link" + (this.props.location.pathname !== '/' ? '' : ' selected')}>
          <Link to="/" style={home && sm ? { color: 'gold' } : {}}>{`${
            sm ? 'JR' : 'Jamison Rubino'
          }`}</Link>
        </h1>
        <span
          className={'header__home__tagline' + (home ? '--selected' : '')}
          style={sm ? { display: 'none' } : {}}
        >
          JUNIOR WEB DEVELOPER
        </span>
      </div>
    )

    const NavLinks = props => {
      const Links = () =>
        props.links.map((link, i) => (
          <Link to="" onClick={e => this.selectNavItem(e, link)} key={i}>
            <li className={path === link ? 'selected' : ''} key={i}>
              {link
                .split(' ')
                .map(w => w[0].toUpperCase() + w.slice(1))
                .join(' ')}
            </li>
          </Link>
        ))
      return (
        <nav>
          <ul>
            <Links />
          </ul>
        </nav>
      )
    }

    return (
      <div className="header__wrap" style={this.state.headerTop ? {} : { paddingTop: '110px' }}>
        <header className={'header' + (this.state.headerTop ? '' : '--fixed')}>
          <HeaderHome />
          <NavLinks links={this.links} />
        </header>
      </div>
    )
  }
}
