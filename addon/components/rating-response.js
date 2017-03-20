import Ember from 'ember';
import layout from '../templates/components/rating-response';

export default Ember.Component.extend({
  layout,

  classNames: ['rating_response'],

  ajax: Ember.inject.service(),
  ajaxPending: false,
  errors: Ember.A(),

  engagement: Ember.computed.alias('model.actionObject.engagement'),
  goals: Ember.computed.alias('model.actionObject.goals'),

  goalComponents: Ember.computed(function() {
    return Ember.A([]);
  }),

  gatherResponses: function() {
    let goalRatingsArray = Ember.A([]),
        goalComponents = this.get('goalComponents');

    goalComponents.forEach(function(goalComponent) {
      let goalRatingHash = {};

      goalRatingHash.id = goalComponent.get('model.id');
      goalRatingHash.answer = goalComponent.get('ratingValue');
      goalRatingHash.review = goalComponent.get('ratingReview');

      if (!goalRatingHash.review) {
        return;
      }

      goalRatingsArray.pushObject(goalRatingHash);
    });

    return goalRatingsArray;
  },

  apiEndpoint: function() {
    let modelId = this.get('model.id');
    return `/api/pendingActions/${modelId}/set_disposition`;
  }.property('model'),

  actions: {
    registerGoalComponent: function(component) {
      this.get('goalComponents').pushObject(component);
    },

    submit: function() {
      // gather responses, build payload
      let ajax = this.get('ajax'),
          payload,
          component = this,
          endpoint = this.get('apiEndpoint'),
          responses = this.gatherResponses();

      if (!Ember.isEmpty(responses)) {
          payload = {
            disposition: 'respond',
            responses: responses
          };
      } else {
        this.set('errors', ['Unable to send rating. Feedback comments are required. Please add feedback and try again.']);
        return;
      }

      component.set('ajaxPending', true);

      // post to pendingActions/set_disposition endpoint
      let request = ajax.request(endpoint, {
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({pendingAction:payload})
      });

      // catch success/failure and bubble actions appropriately
      let onSuccess = function() {
            component.set('ajaxPending', false);
            component.sendAction('successAction');
          },
          onError = function() {
            component.set('ajaxPending', false);
            component.sendAction('errorAction');
          };

      request.then(onSuccess, onError);
    },

    testSuccess: function() {
      this.sendAction('successAction');
    },
    testFailure: function() {
      this.sendAction('errorAction');
    }
  }
});
