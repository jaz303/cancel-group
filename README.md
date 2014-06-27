# cancel-group

Queue up a list of cancellation functions to be called at later time.

A common pattern I use is to return a "cancellation function" from e.g. event binders:

```javascript
function bind(el, evt, cb) {
	el.addEventListener(evt, cb);
	var cancelled = false;
	return function() {
		if (cancelled) return;
		cancelled = true;
		el.removeEventListener(cb);
		el = null;
	}
}
```

Then I can do something like this:

```javascript
// Setup
var cancel1 = bind(document.body, 'click', function() { ... });
var cancel2 = bind(document.body, 'mousedown', function() { ... });

// ...
// ...

// To unbind later:
cancel1();
cancel2();
```

However keeping track of all these cancellation functions is fiddly. Enter `cancel-group`:

```javascript
var cancelGroup = require('cancel-group');

var cancel = cancelGroup();

cancel(bind(document.body, 'click', function() { ... }));
cancel(bind(document.body, 'mousedown', function() { ... }));
cancel(bind(document.body, 'mousemove', function() { ... }));
cancel(bind(document.body, 'mouseup', function() { ... }));

// ...
// ...

// Unbind them all at once:
cancel();
```

## Installation

Get it:

	$ npm install cancel-group

Require it:

```javascript
var cancelGroup = require('cancel-group');
```

## API

#### `var cancel = cancelGroup()`

Create a new cancel-group.

#### `cancel(cb)`

Register function `cb` to be called when this group is cancelled. If this group has already been cancelled `cb` is invoked immediately.

#### `cancel()`

Cancel this group, immediately invoking all registered cancellation functions.

## Copyright &amp; License

&copy; 2014 Jason Frame [ [@jaz303](http://twitter.com/jaz303) / [jason@onehackoranother.com](mailto:jason@onehackoranother.com) ]

Released under the ISC license.
