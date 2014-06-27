var test = require('tape');
var cancelGroup = require('../');

test("all cancellation functions called", function(assert) {

    var cancel = cancelGroup();

    var x = 0;
    cancel(function() { x += 1; });
    cancel(function() { x += 2; });
    cancel(function() { x += 4; });

    assert.ok(x === 0);

    cancel();

    assert.ok(x === 7);
    assert.end();

});

test("cancellation function called immediately when already cancelled", function(assert) {

    var cancel = cancelGroup();

    cancel();

    var x = 0;
    cancel(function() { x += 1; });

    assert.ok(x === 1);
    assert.end();

});