import React, { Component } from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
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
      <StripeProvider apiKey="pk_test_ohRtWqhSYEIcgdCJJ1ze7wBV">
        <div className="example">
          <h1>React Stripe Elements Example</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}
export default Pay;
