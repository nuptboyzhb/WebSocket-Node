/*
 * A battery of tests to help us read a series of uints
 */

var mod_ctype = require('../../../ctio.js');
var ASSERT = require('assert');

/*
 * We need to check the following things:
 *  - We are correctly resolving big endian (doesn't mean anything for 8 bit)
 *  - Correctly resolving little endian (doesn't mean anything for 8 bit)
 *  - Correctly using the offsets
 *  - Correctly interpreting values that are beyond the signed range as unsigned
 */
function test8()
{
	var data = new Buffer(4);
	mod_ctype.wuint8(23, 'big', data, 0);
	mod_ctype.wuint8(23, 'big', data, 1);
	mod_ctype.wuint8(23, 'big', data, 2);
	mod_ctype.wuint8(23, 'big', data, 3);
	ASSERT.equal(23, data[0]);
	ASSERT.equal(23, data[1]);
	ASSERT.equal(23, data[2]);
	ASSERT.equal(23, data[3]);
	mod_ctype.wuint8(23, 'little', data, 0);
	mod_ctype.wuint8(23, 'little', data, 1);
	mod_ctype.wuint8(23, 'little', data, 2);
	mod_ctype.wuint8(23, 'little', data, 3);
	ASSERT.equal(23, data[0]);
	ASSERT.equal(23, data[1]);
	ASSERT.equal(23, data[2]);
	ASSERT.equal(23, data[3]);
	mod_ctype.wuint8(255, 'big', data, 0);
	ASSERT.equal(255, data[0]);
	mod_ctype.wuint8(255, 'little', data, 0);
	ASSERT.equal(255, data[0]);
}

function test16()
{
	var value = 0x2343;
	var data = new Buffer(4);
	mod_ctype.wuint16(value, 'big', data, 0);
	ASSERT.equal(0x23, data[0]);
	ASSERT.equal(0x43, data[1]);
	mod_ctype.wuint16(value, 'big', data, 1);
	ASSERT.equal(0x23, data[1]);
	ASSERT.equal(0x43, data[2]);
	mod_ctype.wuint16(value, 'big', data, 2);
	ASSERT.equal(0x23, data[2]);
	ASSERT.equal(0x43, data[3]);

	mod_ctype.wuint16(value, 'little', data, 0);
	ASSERT.equal(0x23, data[1]);
	ASSERT.equal(0x43, data[0]);

	mod_ctype.wuint16(value, 'little', data, 1);
	ASSERT.equal(0x23, data[2]);
	ASSERT.equal(0x43, data[1]);

	mod_ctype.wuint16(value, 'little', data, 2);
	ASSERT.equal(0x23, data[3]);
	ASSERT.equal(0x43, data[2]);

	value = 0xff80;
	mod_ctype.wuint16(value, 'little', data, 0);
	ASSERT.equal(0xff, data[1]);
	ASSERT.equal(0x80, data[0]);

	mod_ctype.wuint16(value, 'big', data, 0);
	ASSERT.equal(0xff, data[0]);
	ASSERT.equal(0x80, data[1]);
}

function test32()
{
	var data = new Buffer(6);
	var value = 0xe7f90a6d;

	mod_ctype.wuint32(value, 'big', data, 0);
	ASSERT.equal(0xe7, data[0]);
	ASSERT.equal(0xf9, data[1]);
	ASSERT.equal(0x0a, data[2]);
	ASSERT.equal(0x6d, data[3]);

	mod_ctype.wuint32(value, 'big', data, 1);
	ASSERT.equal(0xe7, data[1]);
	ASSERT.equal(0xf9, data[2]);
	ASSERT.equal(0x0a, data[3]);
	ASSERT.equal(0x6d, data[4]);

	mod_ctype.wuint32(value, 'big', data, 2);
	ASSERT.equal(0xe7, data[2]);
	ASSERT.equal(0xf9, data[3]);
	ASSERT.equal(0x0a, data[4]);
	ASSERT.equal(0x6d, data[5]);

	mod_ctype.wuint32(value, 'little', data, 0);
	ASSERT.equal(0xe7, data[3]);
	ASSERT.equal(0xf9, data[2]);
	ASSERT.equal(0x0a, data[1]);
	ASSERT.equal(0x6d, data[0]);

	mod_ctype.wuint32(value, 'little', data, 1);
	ASSERT.equal(0xe7, data[4]);
	ASSERT.equal(0xf9, data[3]);
	ASSERT.equal(0x0a, data[2]);
	ASSERT.equal(0x6d, data[1]);

	mod_ctype.wuint32(value, 'little', data, 2);
	ASSERT.equal(0xe7, data[5]);
	ASSERT.equal(0xf9, data[4]);
	ASSERT.equal(0x0a, data[3]);
	ASSERT.equal(0x6d, data[2]);
}

test8();
test16();
test32();
