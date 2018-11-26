import React from 'react';
export function ContactForm(props) {
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
        defaultValue={props.textareaText}
      />
      <input
        type="submit"
        value="Submit"
        className="btn btn-primary btn-lg btn-block"
        onClick={props.handleFormSubmit}
      />
    </form>
  )
}
