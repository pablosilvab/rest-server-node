'use strict'

const jwt = require('jsonwebtoken')
const { verificaToken } = require('../src/middlewares/auth.js');


describe('verificaToken', () => {
    test('verificar token ', () => {
        expect(1).toBe(1)
    });
});