import React, { Component } from 'react'
import aboutData from './aboutData'

export default class About extends Component {
	constructor(props) {
		super(props)
		this.state = {
			height: window.innerWidth < window.innerHeight,
			width: window.innerWidth > window.innerHeight,
			bgSize: window.innerWidth > window.innerHeight ? `100% auto` : `auto 100%`,
			tsBgSize: window.innerWidth > window.innerHeight ? `${window.innerWidth}px auto` : `auto 100%`,
			arrowDown: true
		}
		this.unload = _ => {
			window.removeEventListener('resize', this.resize)
			window.removeEventListener('scroll', this.handleScroll, false)
			window.removeEventListener('touchend', this.handleScroll, false)
			window.removeEventListener('mousewheel', this.handleScroll, false)
			window.removeEventListener('unload', this.unload)
		}
		this.titleSkillsBackgroundStyle = JSON.parse(JSON.stringify(aboutData.aboutSections[0].style))
		this.educationBackgroundStyle = null
		this.personalPathBackgroundStyle = null
		this.setWTimeout = null
		this.sNum = -1
		this.oldScroll = 0
		this.sections = null
		this.scrollable = true
		this.scrollTimeout = null
		this.scrollCaptureTimeout = null
		this.arrowWrap = null
	}

	componentDidMount() {
		setTimeout(_ => {
			this.resize()
			window.addEventListener('resize', this.resize)
			window.addEventListener('scroll', this.handleScroll, false)
			window.addEventListener('touchend', this.handleScroll, false)
			window.addEventListener('mousewheel', this.handleScroll, false)
			window.addEventListener('beforeunload', this.unload)
		}, 750)
		this.sections = document.getElementsByClassName('about__section__wrap')
		this.arrowWrap = document.getElementsByClassName('about__arrow__wrap')[0].classList
	}

	componentWillUnmount() {
		this.unload()
	}

	handleScroll = (e, down) => {
		var that = this
		const scrollSection = down => {
			if ((down !== undefined && !down) || that.oldScroll > window.scrollY) {
				if (that.sNum > 0) {
					that.sections[--that.sNum].scrollIntoView({
						alignToTop: true,
						behavior: 'smooth'
					})
				} else if (that.sNum === 0) {
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
					that.sNum--
				}
			} else if ((down !== undefined && down) || that.oldScroll < window.scrollY) {
				if (that.sNum < that.sections.length - 1) {
					that.sections[++that.sNum].scrollIntoView({
						alignToTop: true,
						behavior: 'smooth'
					})
					if (that.sNum === that.sections.length - 1)
						this.setState({ arrowDown: false }, () => that.arrowWrap.add('pending'))
				}
			}
		}
		if (this.scrollable) {
			this.scrollable = false
			clearTimeout(this.scrollTimeout)
			clearTimeout(this.scrollCaptureTimeout)
			this.scrollCaptureTimeout = setTimeout(function() {
				that.arrowWrap.add('pending')
				scrollSection(down)
				that.scrollTimeout = setTimeout(function() {
					that.scrollable = true
					that.oldScroll = window.pageYOffset
					that.arrowWrap.remove('pending')
					if (that.sNum <= 0 && that.state.arrowDown === false) that.setState({ arrowDown: true })
				}, 800)
			}, 200)
		}
	}

	resize = _ => {
		if (this.state.height !== this.state.width) {
			if (window.innerWidth > window.innerHeight && !this.state.width) {
				this.setState({ height: false, width: true, bgSize: '100% auto' })
			} else if (window.innerWidth < window.innerHeight && !this.state.height) {
				this.setState({ height: true, width: false, bgSize: 'auto 100%' })
			}
		}
		this.setWidth()
	}

	setWidth = _ => {
		clearTimeout(this.setWTimeout)
		this.setWTimeout = setTimeout(
			_ =>
				this.setState({
					tsBgSize: this.state.width ? `${window.innerWidth}px auto` : 'auto 100%'
				}),
			300
		)
	}

	render() {
		const about = JSON.parse(JSON.stringify(aboutData.aboutSections)),
			title = about[0].title,
			skills = about[0].skills.map((s, i) => (
				<div
					className={
						'skills--' +
						s[0]
							.slice(0)
							.split(' ')
							.join('_')
							.toLowerCase()
					}
					key={i}
				>
					<h3 className={s[2]}>{s[0]}</h3>
					<h4 className={s[2]}>{s[1]}</h4>
				</div>
			)),
			education = about[1].education.map((track, i) => {
				if (track.indexOf(':') > -1) track = [track.slice(0, track.indexOf(':')), track.slice(track.indexOf(':'))]
				if (Array.isArray(track)) {
					return (
						<h4 className="education__h4" key={i}>
							<b>{track[0]}</b>
							{track[1]}
						</h4>
					)
				} else {
					return <h4 className="education__h4">{track}</h4>
				}
			}),
			path = about[2].path.map((p, i, arr) => {
				let cBeg = null,
					cLink = null,
					cEnd = null
				if (i === arr.length - 1) {
					cBeg = p.slice(0, p.indexOf('.') + 2)
					cLink = <a href="/contact/">Contact me</a>
					cEnd = p.slice(p.indexOf('me') + 2)
				}
				return (
					<blockquote className="personal__path__p" key={i}>
						{!cBeg ? p : ''}
						{cBeg}
						{cLink}
						{cEnd}
					</blockquote>
				)
			})

		this.titleSkillsBackgroundStyle = {
			...this.titleSkillsBackgroundStyle,
			backgroundSize: this.state.tsBgSize
		}
		this.educationBackgroundStyle = about[1].style
		this.personalPathBackgroundStyle = {
			...about[2].style,
			backgroundSize: this.state.bgSize
		}

		return (
			<div className="div__about">
				<div className="about__section__wrap">
					<section className="title__skills">
						<div className="title__skills__background" style={this.titleSkillsBackgroundStyle} />
						<div className="title__skills__content">
							<h2 className="title__skills__heading">Skills</h2>
							<h2 className="title__h2">{title}</h2>
							{skills}
						</div>
					</section>
				</div>

				<div className="about__section__wrap">
					<section className="education">
						<div className="education__background" style={this.educationBackgroundStyle} />
						<div className="education__content">
							<h2 className="education__heading">Education</h2>
							{education}
						</div>
					</section>
				</div>

				<div className="about__section__wrap">
					<section className="personal__path">
						<div className="personal__path__background" style={this.personalPathBackgroundStyle} />
						<div className="personal__path__content">
							<h2 className="personal__path__heading">My Path</h2>
							{path}
						</div>
					</section>
					<div
						className={'about__arrow__wrap' + (this.state.arrowDown ? ' down' : ' up')}
						onClick={e => this.handleScroll(e, this.state.arrowDown)}
					>
						<span className="about__arrow" />
					</div>
				</div>
			</div>
		)
	}
}
