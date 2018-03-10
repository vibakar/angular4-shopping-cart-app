var assert = require('assert');

describe('Cart CRUD operaion', function() {
	
	let cart = [];

	it('should add 1 item to the cart', function() {
	  cart.push({id:'1', item: 'mango', price: '60', quantity: 2});
	  assert.equal(1, cart.length);
	});

	it('should edit the item in the cart', function() {
	  cart[0].quantity = 1;
	  assert.equal(1, cart[0].quantity);
	});

	it('should not have the item in the cart', function() {
	  assert.notEqual('apple', cart[0].item);
	});

	it('should delete the item in the cart', function() {
	  cart.splice(0, 1);
	  assert.equal(0, cart.length);
	});

 });
