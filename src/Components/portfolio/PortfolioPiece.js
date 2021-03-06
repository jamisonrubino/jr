import React, { Component } from 'react'
import Carousel from './Carousel'
import { Link } from 'react-router-dom'

export default class PortfolioPiece extends Component {
	constructor(props) {
		super(props)
		this.state = {
			summary: null,
			diamondOffset: null
		}
	}

	componentDidMount() {
		const li = document.querySelector('.portfolio__li__wrap'),
			piece = JSON.parse(JSON.stringify(this.props.piece)),
			summary = piece.summary
		let ulItemWidth = Number(window.getComputedStyle(li).width.slice(0, -2)),
			ulItemMargin = Number(window.getComputedStyle(li).marginRight.slice(0, -2))
		this.setState({ summary })
		if (this.props.index === 0 || this.props.index % 3 === 0) {
			this.setState({
				diamondOffset: `calc(50% - ${ulItemWidth + ulItemMargin + 14}px)`
			})
		} else if (this.props.index % 3 === 2) {
			this.setState({
				diamondOffset: `calc(50% + ${ulItemWidth + ulItemMargin - 14}px)`
			})
		} else if (this.props.index % 3 === 1) {
			this.setState({ diamondOffset: 'calc(50% - 14px)' })
		}
	}

	render() {
		const diamondStyle = {
				width: '30px',
				height: '30px',
				transform: 'rotate(45deg)',
				background: 'var(--gray-dark)',
				position: 'absolute',
				left: this.state.diamondOffset,
				top: '-45px'
			},
			demo = this.props.piece.demo,
			source = this.props.piece.source,
			demoLen = demo.length > 0,
			sourceLen = source.length > 0
		return (
			<section className="portfolio__item__wrap">
				<div className="portfolio__item__body">
					<Link to="/portfolio" className="portfolio__item__body__x" onClick={_ => this.props.close(true)}>
						&#x2715;
					</Link>
					<section className={this.props.piece.slug}>
						<div className="portfolio__item__summary">
							<p className="portfolio__p">{this.state.summary}</p>
							<a
								href={demoLen ? demo : ''}
								onClick={e => (!sourceLen ? e.preventDefault() : null)}
								className={'portfolio__item__link--demo' + (demoLen ? '' : ' missing')}
								target={demoLen ? '_blank' : ''}
							>
								Open Demo
							</a>
							<a
								href={sourceLen ? source : ''}
								onClick={e => (!sourceLen ? e.preventDefault() : null)}
								className={'portfolio__item__link--source' + (sourceLen ? '' : ' missing')}
								target={sourceLen ? '_blank' : ''}
							>
								View Source
							</a>
						</div>
						<Carousel data={this.props.piece} size={this.props.size} />
						<div className="portfolio__item__body__diamond" style={diamondStyle} />
					</section>
				</div>
			</section>
		)
	}
}
