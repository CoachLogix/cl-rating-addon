import Ember from 'ember';
import layout from '../templates/components/rating-response-goal';

export default Ember.Component.extend({
  ratingValue: null,
  ratingType: Ember.computed.alias('model.type.slug'),

  layout: layout,

  classNames: ['rating_response-goal'],
  
});
