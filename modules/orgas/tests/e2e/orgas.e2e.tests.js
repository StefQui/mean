'use strict';

describe('Orgas E2E Tests:', function () {
  describe('Test orgas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/orgas');
      expect(element.all(by.repeater('orga in orgas')).count()).toEqual(0);
    });
  });
});
