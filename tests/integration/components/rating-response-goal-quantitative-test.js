import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rating-response-goal-quantitative', 'Integration | Component | rating response goal quantitative', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rating-response-goal-quantitative}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rating-response-goal-quantitative}}
      template block text
    {{/rating-response-goal-quantitative}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
