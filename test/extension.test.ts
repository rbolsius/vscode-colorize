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

import { COLOR_REGEX } from '../src/utils/color-utils';

const { HEXA_COLOR_SMALL } = COLOR_REGEX

// Defines a Mocha test suite to group tests of similar kind together
describe("COLOR_REGEX Tests", () => {

    // Defines a Mocha unit test
    // describe("css hexa shorthand color", () => {
      it('Should match color with only integer', function() {
        return assert.equal(HEXA_COLOR_SMALL.test('#000'), true);
      });

      it('Should match color with letters and integers', function() {
        return assert.equal(HEXA_COLOR_SMALL.test('#f0a'), true);
      });

      it('Should match color with only letters', function() {
        return assert.equal(HEXA_COLOR_SMALL.test('#fff'), true);
      });

      it('Regex should not care about the case', function() {
        return assert.equal(HEXA_COLOR_SMALL.test('#Abc'), true);
      });

      it('Should not match', function() {
        return assert.equal(HEXA_COLOR_SMALL.test('#AbG'), false);
      });
    // });
});

