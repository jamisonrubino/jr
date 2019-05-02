import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class Pay extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {}
  componentDidUpdate(prevProps) {}

  render() {
    return (
      <div className="div__pay">
        <StripeProvider apiKey="pk_live_i8Rph5MEuY7ORXNiDX9UROCM00MzIwOKrO">
          <div className="pay__content">
            <h1>Pay for services</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    )
  }
}
export default Pay;
