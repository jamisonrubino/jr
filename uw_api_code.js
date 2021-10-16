// FREELANCER PROFILE
var Profile = require('upwork-api/lib/routers/freelancers/profile.js').Profile;

var freelancers = new Profile(api);
freelancers.getSpecific('~0180302a9d35e1993e', function(error, data) {
  console.log(data);
});



// NEW OFFER
var Offers = require('upwork-api/lib/routers/hr/clients/offers.js').Offers;

handleOfferSubmit = event => {
    event.preventDefault();
    var offers = new Offers(api);
    var {title, job_type, charge_rate, message_to_contractor, team_reference} = event.target.elements;
    var params = {title, job_type, charge_rate, message_to_contractor, team_reference};
    offers.makeOffer(params, function(error, data) {
      console.log(data);
    });
}
