import React, { Component } from 'react';

export default class Contact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitted: false,
      error: false,
      itemSize: null,
      servicesSelection: [],
      textareaText: ""
    }
  }

  componentWillMount() {
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
    if (this.props.location.state)
      this.servicesSelection()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    let alert = document.querySelector('.alert')

    const email = document.getElementsByName("email")[0],
      subject = document.getElementsByName("subject")[0],
      body = document.getElementsByName("body")[0]

    console.log(email, subject, body)

    if (email.value.length > 0 && subject.value.length > 0 && body.value.length > 0) {
      fetch('/contact_submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.value,
          subject: subject.value,
          body: body.value
        })
      })

      email.value = ""
      subject.value = ""
      body.value = ""

      this.setState({submitted: true}, ()=>alert.innerHTML = "Success! Your message was delivered.")
    } else {
      this.setState({error: true, submitted: false}, ()=>alert.innerHTML = "Error: please ensure all form fields are filled.")
    }
  }

  servicesSelection = () => {
    if (this.props.location.state.services) {
      let textareaText = "Hi! I want help with ",
        s = this.props.location.state.services
        s = [[...s[0]], [...s[1], ...s[2], ...s[3]]]
        // s: [[consulting], [...full-stack-tech, ...student-work]]

      function parseServices(a, j) {
        if (j > 0)
          textareaText += (s[0].length > 0) ?
            ((s[1].length > 0) ?
              " for a project using "
              : " for a project")
            : ((s[1].length > 0) ?
              "a project using "
              : "")
        a.map((x,i)=>textareaText += (a.length === 1) ?
          ((j===a.length-1) ?
            `${x}`
            : `${x} `)
          : ((i===a.length-1) ?
            `and ${x}`
            : ((a.length<3 || i===a.length-2) ?
              `${x} `
              : `${x}, `)))
        if (j > 0) textareaText += "."
      }

      s.map((arr, i)=>parseServices(arr, i))
      this.setState({textareaText})
    }
  }

  //["Phone", "(208) 310-4170"]

  render() {
    const ContactItem = props =>
          <div className={"contact__menu--" + props.item[0].toLowerCase()}>
            <div className="contact__menu__item__wrapper">
              <div className="contact__menu__info">
                <span className="contact__menu__info--info">
                  <a href={props.item[2]} target={props.item[3] ? "" : "_blank"}>
                    {props.item[0] === "Email" && this.props.size === "sm" ? (props.item[1].slice(0,props.item[1].indexOf("@")) + "\n" + props.item[1].slice(props.item[1].indexOf("@"))) : props.item[1]}
                  </a>
                </span>
                <span className="contact__menu__info--back" onClick={()=>document.querySelector(".contact__menu--" + props.item[0].toLowerCase() + " .contact__menu__item__wrapper").style.marginLeft=`-${this.state.itemSize}px`}>
                  ›
                </span>
              </div>
              <div className="contact__menu__item" onClick={()=>document.querySelector(".contact__menu--" + props.item[0].toLowerCase() + " .contact__menu__item__wrapper").style.marginLeft="0"}>
                <img src={"/img/contact/" + props.item[0].toLowerCase() + ".svg"} />
                <a href="javascript:;">{props.item[0]}</a>
              </div>
            </div>
          </div>,


    items = [["Email", "jamison.rubino@gmail.com", "mailto: jamison.rubino@gmail.com", true], ["LinkedIn", "/in/jamison-rubino-98545a133/", "https://linkedin.com/in/jamison-rubino-98545a133/"], ["Github", "jamisonrubino", "https://github.com/jamisonrubino"]].map((item,i)=><ContactItem item={item} index={i} key={i} />),

    ContactForm = props =>
      <form method="post" action="/contact_submit">
        <input type="email" name="email" placeholder="Your email" className="form-control" />
        <input type="text" name="subject" placeholder="Subject" className="form-control" />
        <textarea name="body" placeholder="Enter your question here" cols="60" rows="8" className="form-control" defaultValue={this.state.textareaText}></textarea>
        <input type="submit" value="Submit" className="btn btn-primary btn-lg btn-block" onClick={this.handleFormSubmit} />
      </form>,


    FootNote = _ =>
      <div className="footnote">
        <div>
          Icons made by <a href="https://www.flaticon.com/authors/epiccoders" title="EpicCoders">EpicCoders</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>
        </div>
      </div>

    let alertStyle
    if (this.state.submitted === true) {
      alertStyle = " success"
    } else if (this.state.error === false) {
      alertStyle = ""
    } else {
      alertStyle = " failure"
    }


    return (
      <div className="div__contact">
        <div className="contact__items">
          {items}
        </div>
        <div className={"alert" + alertStyle}></div>

        <ContactForm services={this.state.contactServices} />
        <FootNote />
      </div>
    );

  }
}
