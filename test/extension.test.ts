//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import { assert } from 'chai';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

import { HEXA_COLOR_SMALL, HEXA_COLOR } from '../src/utils/color-utils';

// Defines a Mocha test suite to group tests of similar kind together
describe("COLOR_REGEX Tests", () => {
  // Defines a Mocha unit test
  describe("Test CSS hexa shorthand color Regex", () => {
    it('Should match color with only integer', function() {
      assert.ok('#000'.match(HEXA_COLOR_SMALL));
    });
    it('Should match color with letters and integers', function() {
      assert.ok('#f0a'.match(HEXA_COLOR_SMALL));
    });
    it('Should match color with only letters', function() {
      assert.ok('#fff'.match(HEXA_COLOR_SMALL));
    });
    it('Regex should not care about the case', function() {
      assert.ok('#Abc'.match(HEXA_COLOR_SMALL));
    });
    it('Should match with different characters at the end', function() {
      assert.ok('#Abc'.match(HEXA_COLOR_SMALL));
      assert.ok('#Abc '.match(HEXA_COLOR_SMALL));
      assert.ok('#Abc,'.match(HEXA_COLOR_SMALL));
      assert.ok('#Abc;'.match(HEXA_COLOR_SMALL));
      assert.ok('#Abc\n'.match(HEXA_COLOR_SMALL));
    });
    it('Should not match', function() {
      assert.notOk('#AbG'.match(HEXA_COLOR_SMALL));
      assert.notOk('#AbcG'.match(HEXA_COLOR_SMALL));
      assert.notOk('#Ab'.match(HEXA_COLOR_SMALL));
    });
  });
  describe("Test CSS hexa color Regex", () => {
    it('Should match color with only integer', function() {
      assert.ok('#000000'.match(HEXA_COLOR));
    });
    it('Should match color with letters and integers', function() {
      assert.ok('#f0f0f0'.match(HEXA_COLOR));
    });
    it('Should match color with only letters', function() {
      assert.ok('#ffffff'.match(HEXA_COLOR));
    });
    it('Regex should not care about the case', function() {
      assert.ok('#Abc012'.match(HEXA_COLOR));
    });
    it('Should match with different characters at the end', function() {
      assert.ok('#ffffff '.match(HEXA_COLOR));
      assert.ok('#ffffff,'.match(HEXA_COLOR));
      assert.ok('#ffffff;'.match(HEXA_COLOR));
      assert.ok('#ffffff\n'.match(HEXA_COLOR));
    });
    it('Should not match', function() {
      assert.notOk('#fffffg'.match(HEXA_COLOR));
      assert.notOk('#ffffffg'.match(HEXA_COLOR));
      assert.notOk('#fffff'.match(HEXA_COLOR));
    });
  });
});

