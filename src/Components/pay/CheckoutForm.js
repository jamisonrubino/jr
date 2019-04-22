import React, { Component } from 'react';
import { CardElement, IbanElement, IdealBankElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
  }

  submit = async ev => {
    ev.preventDefault();
  /*
    NAMES
      card-number
      exp-date
      cvc
  */
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    // let {token} = await this.props.stripe.createToken('bank_account', {
    //   country: 'US',
    //   currency: 'usd',
    //   routing_number: '110000000',
    //   account_number: '000123456789',
    //   account_holder_name: 'Jenny Rosen',
    //   account_holder_type: 'individual',
    // }).then(function(result) {
    //   // Handle result.error or result.token
    // });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
  }

  render() {
    return (
      <form name="stripe">
        <div className="form-group">
          <div className="checkout">
            <p>Enter your card information to complete your purchase.</p>
            <CardElement style={{base: {fontSize: '24px'}}} />
            <IbanElement style={{base: {fontSize: '24px'}}} />
            <IdealBankElement style={{base: {fontSize: '24px'}}} />
            <button className="btn btn-success" onClick={this.submit} style={{marginTop: "15px"}}>Send</button>
          </div>
        </div>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);
