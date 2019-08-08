import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

export default class Pay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: "card"
    }
  }

  componentDidMount() {}
  componentDidUpdate(prevProps) {}

  handleTypeTab = e => {
    e.preventDefault();
    // this.setState({type: e.target.innerText});
    console.log(e.target, e.target.innerText);
  }

  render() {
    var payTabs = ['Card', 'Bank Account'].map((type, i) => (
      <li className={this.state.type===type.toLowerCase() ? 'selected' : ''} key={`tab-${i}`}>
        <a href="" onClick={e => this.handleTypeTab(e)}>{type}</a>
      </li>
    ));
    var PayTab = _ => (
      <ul className="stripe__type__container">
        {payTabs}
      </ul>
    );
    return (
      <div className="div__pay">
        <StripeProvider stripe={this.props.stripe}>
          <div className="pay__content">
            <h1>Pay for services</h1>
            <PayTab />
            <Elements>
              <CheckoutForm 
                type={this.state.type} 
              />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    )
  }
}
