import React, { Component } from 'react'
import { ContactItem } from './ContactItem'
import { FootNote } from './FootNote'
import { ContactForm } from './ContactForm'
export default class Contact extends Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false,
			itemSize: null,
			message: null,
			messageBackup: null,
			servicesSelection: [],
			submitted: false,
			textareaText: ''
		}
	}

	componentDidMount() {
		this.sizes = {
			sm: 180,
			md: 240,
			lg: 360
		}
		this.setState({
			itemSize: this.sizes[this.props.size]
		})
		if (this.props.location.state) this.servicesSelection()
	}

	handleFormSubmit = e => {
		e.preventDefault()
		let submitted = true,
			message,
			error

		const email = document.getElementsByName('email')[0],
			firstName = document.getElementsByName('firstname')[0],
			lastName = document.getElementsByName('lastname')[0],
			subject = document.getElementsByName('subject')[0],
			body = document.getElementsByName('body')[0],
			vals = {
				email: email.value,
				firstName: firstName.value,
				lastName: lastName.value,
				subject: subject.value,
				body: body.value
			},
			filled = Object.values(vals).filter(v => !v).length === 0,
			messageBackup = vals.body

		if (filled) {
			fetch('/contact_submit', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(vals)
			})
				.then(res => res.json())
				.then(json => {
					;({ message, submitted } = json)
					error = false
				})
				.catch(err => {
					message = `Sorry, something went wrong. Contact me by <a href="mailto: jamison.rubino.com;" target="_blank" rel="noopener noreferrer" style="color: gold;">email</a> instead.`
					submitted = false
					error = true
				})
				.then(() => this.setState({ error, message, submitted, messageBackup },
					()=>{
						email.value = ''
						firstName.value = ''
						lastName.value = ''
						subject.value = ''
						body.value = ''
					}))
		} else {
			error = true
			message = 'Error: please ensure all form fields are filled.'
			this.setState({ error, message, submitted })
		}
	}

	servicesSelection = () => {
		if (this.props.location.state.services) {
			let textareaText = 'Hi! I want help with ',
				s = this.props.location.state.services
			s = [[...s[0]], [...s[1], ...s[2], ...s[3]]]

			function parseServices(a, j) {
				if (j > 0)
					textareaText +=
						s[0].length > 0
							? s[1].length > 0
								? ' for a project using '
								: ' for a project'
							: s[1].length > 0
							? 'a project using '
							: ''
				a.map(
					(x, i) =>
						(textareaText +=
							a.length === 1
								? j === a.length - 1
									? `${x}`
									: `${x} `
								: i === a.length - 1
								? `and ${x}`
								: a.length < 3 || i === a.length - 2
								? `${x} `
								: `${x}, `)
				)
				if (j > 0) textareaText += '.'
			}
			s.map((arr, i) => parseServices(arr, i))
			this.setState({ textareaText })
		}
	}

	render() {
		const ContactItems = props => {
			const items = props.contactArr.map((item, i) => (
				<ContactItem
					item={item}
					size={this.state.size}
					itemSize={this.state.itemSize}
					svg={this.props.svg[i]}
					index={i}
					key={i}
				/>
			))
			return <div className="contact__items">{items}</div>
		}

		const MessageBackup = props => (props.message ? <div className="message__backup">{props.message}</div> : null)

		const Alert = props => {
			let alertClass = 'alert' + (props.s ? (props.err ? ' failure' : ' success') : props.err ? ' failure' : '')
			return (
				<div className="alert__wrap">
					<span
						className={alertClass}
						style={this.state.messageBackup ? { borderRadius: '0.25rem 0.25rem 0 0' } : {}}
						dangerouslySetInnerHTML={{ __html: this.state.message }}
					/>
					<a
						className="alert__x"
						onClick={() => this.setState({ error: false, submitted: false, message: null, messageBackup: null })}
					>
						✕
					</a>
					<MessageBackup message={this.state.messageBackup} />
				</div>
			)
		}

		return (
			<div className="div__contact">
				<ContactItems contactArr={this.props.contactArr} />
				<Alert err={this.state.error} s={this.state.submitted} />
				<ContactForm
					services={this.state.contactServices}
					textareaText={this.state.textareaText}
					handleFormSubmit={this.handleFormSubmit}
				/>
				<FootNote />
			</div>
		)
	}
}
