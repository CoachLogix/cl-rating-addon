import Ember from 'ember';
import layout from '../templates/components/rating-response-goal';

export default Ember.Component.extend({
  ratingValue: null,
  ratingReview: null,

  layout,

  classNames: ['rating_response-goal'],

  init() {
    this._super(...arguments);
    this.sendAction('registerAction', this);
  },
});
