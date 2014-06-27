module.exports = cancelGroup;

function cancelGroup() {

	var cancelled = false;
	var callbacks = [];

	return function(cb) {

		if (cancelled) {
			if (cb) cb();
			return;
		}

		if (cb === void 0) {
			cancelled = true;
			for (var i = 0, l = callbacks.length; i < l; ++i) {
				callbacks[i]();
			}
		} else {
			callbacks.push(cb);
		}

	};

}