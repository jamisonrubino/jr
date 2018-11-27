import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import portfolioData from './portfolioData'
import PortfolioPiece from './PortfolioPiece'

export default class Portfolio extends Component {
	constructor(props) {
		super(props)
		this.state = {
			itemSelected: this.props.itemSelected,
			pieceIndex: null
		}
		this.p = JSON.parse(JSON.stringify(portfolioData.portfolioPieces))
	}

	componentDidMount() {
		if (this.props.match.params.piece) {
			this.setState({
				pieceIndex: this.p.findIndex(piece => piece.slug === this.props.match.params.piece)
			})
		}
	}

	updateNav = _ => this.props.updateNav('portfolio')

	pieceIndex = index => this.setState({ pieceIndex: index })

	hidePortfolioPiece = _ => {
		this.history.pushState(null, 'portfolio')
		this.props.setItemSelected(true)
	}

	render() {
		const pData = this.p
		const PortfolioList = () => {
			const links = pData.map((pc, i, arr) => {
				let title = pc.name.slice(0).replace(/([a-z])([A-Z])/g, "$1 $2"),
				classes = {
					portfolioLiWrapper: 'portfolio__li__wrapper' + (this.state.pieceIndex !== null
							? (i > this.state.pieceIndex + (2 - (this.state.pieceIndex % 3))
								? ' hidden'
								: '')
							: ''),
					portfolioLiTitle: 'portfolio__li__title' + (this.state.pieceIndex === i ? '--selected' : ''),
					portfolioLi: 'portfolio__li' + (this.state.pieceIndex === i ? '--selected' : '')
				}

				return (
					<div
						className={classes.portfolioLiWrapper}
						onClick={_ => (this.state.pieceIndex !== i ? this.pieceIndex(i) : null)}
						key={i}
					>
						<Link
							to={'/portfolio/' + (this.state.pieceIndex === i ? '' : pc.slug + '/')}
							onClick={_ => this.props.setItemSelected(true)}
						>
							<li className={classes.portfolioLi} style={pc.style} />
							<span className={classes.portfolioLiTitle}>
								{title}
							</span>
						</Link>
					</div>
				)
			})
			return <div className="portfolio__ul__wrap">{links}</div>
		}

		let portfolioPiece, portfolioSource

		if (this.state.pieceIndex !== null) {
			portfolioPiece = (
				<PortfolioPiece
					numSlides={pData[this.state.pieceIndex].numSlides}
					piece={pData[this.state.pieceIndex]}
					index={this.state.pieceIndex}
					size={this.props.size}
					close={this.props.setItemSelected}
				/>
			)
			portfolioSource = null
		} else {
			portfolioPiece = null
			portfolioSource = (
				<a
					href="https://github.com/jamisonrubino/jr"
					className="portfolio__source"
					target="_blank"
					rel="noopener noreferrer"
				>Portfolio Source</a>
			)
		}

		return (
			<div className={'div__portfolio' + (this.state.itemSelected ? ' item__selected' : '')}>
				<PortfolioList />
				{portfolioSource}
				{portfolioPiece}
			</div>
		)
	}
}
