import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (this.props.textareaText.length > 0)
      document.querySelector('textarea').value = this.props.textareaText
  }

  componentDidUpdate(prevProps) {
    if (this.props.textareaText.length > 0)
      document.querySelector('textarea').value = this.props.textareaText
  }

  render() {
    return (
      <form method="post" action="/contact_submit">
        <input type="email" name="email" placeholder="Email" className="form-control" />
        <input type="text" name="firstname" placeholder="First Name" className="form-control half" />
        <input type="text" name="lastname" placeholder="Last Name" className="form-control half" />
        <input type="text" name="subject" placeholder="Subject" className="form-control" />
        <textarea
          name="body"
          placeholder="Write your message here"
          cols="60"
          rows="8"
          className="form-control"
          defaultValue={this.props.textareaText}
        />
        <input
          type="submit"
          value="Submit"
          className="btn btn-primary btn-lg btn-block"
          onClick={this.props.handleFormSubmit}
        />
      </form>
    )
  }
}
