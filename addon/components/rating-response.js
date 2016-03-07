import Ember from 'ember';
import layout from '../templates/components/rating-response';

export default Ember.Component.extend({
  layout: layout,

  classNames: ['rating_response'],

  ajax: Ember.inject.service(),
  ajaxPending: false,

  engagement: Ember.computed.alias('model.actionObject'),
  goals: Ember.computed.alias('engagement.goals'),
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
      goalRatingHash.answerType = goalComponent.get('ratingType');

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
          component = this,
          endpoint = this.get('apiEndpoint'),
          responses = this.gatherResponses(),
          payload = {
            disposition: 'respond',
            responses: responses
          };

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
