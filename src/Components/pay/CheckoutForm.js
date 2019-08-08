import React, { Component } from 'react';
import { CardElement, IbanElement, IdealBankElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false      
    };
  }

  submitCard = async ev => {
    ev.preventDefault();
  /*
    NAMES
      card-number
      exp-date
      cvc
  */
    let { token } = await this.props.stripe.createToken({ name: "Name" });
 
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
  }

  submitBankAccount = async ev => {
    ev.preventDefault();
    // var form = document.querySelector('form[name="stripe-bank-account"]');
    // var bankAccount = {
    // }

    let { token } = await this.props.stripe.createToken('bank_account', {
      country: 'US',
      currency: 'usd',
      routing_number: '110000000',
      account_number: '000123456789',
      account_holder_name: 'Jenny Rosen',
      account_holder_type: 'individual',
    }).then(function(result) {
      // Handle result.error or result.token
    });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    if (response.ok) console.log("Purchase Complete!")
  }


  // jquery carousel with two forms
  // names: stripe-card, stripe-bank-account
  // look up stripe createToken field names
  render() {
    var PayForm = _ => {
      let cardForm = (
        <div className="form-group">
          <CardElement style={{base: {fontSize: '24px'}}} />
          <button className="btn btn-success" onClick={this.submit} style={{marginTop: "15px"}}>Pay</button>
        </div>
      ),
        bankAccountForm = (
          <div className="form-group">
            <IbanElement style={{base: {fontSize: '24px'}}} />
            <IdealBankElement style={{base: {fontSize: '24px'}}} />
            <button className="btn btn-success" onClick={this.submitBankAccount} style={{marginTop: "15px"}}>Pay</button>
          </div>
          );
      return (this.props.type==="Bank Account" ? bankAccountForm : cardForm);
    }

    return (
      <form name="stripe">
        <p>Enter your card information to complete your purchase.</p>
        <PayForm />
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);