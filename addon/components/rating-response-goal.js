import Ember from 'ember';
import layout from '../templates/components/rating-response-goal';

export default Ember.Component.extend({
  ratingValue: null,
  ratingReview: null,

  layout: layout,

  classNames: ['rating_response-goal'],

  init: function() {
    this._super();
    this.sendAction('registerAction', this);
  },
});
