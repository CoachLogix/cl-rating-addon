import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('rating-response-goal-qualitative', 'Integration | Component | rating response goal qualitative', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{rating-response-goal-qualitative}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#rating-response-goal-qualitative}}
      template block text
    {{/rating-response-goal-qualitative}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
