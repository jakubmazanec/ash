'use strict';

module.exports =
{
	test: function () {
		return true;
	},

	install: function (t) {
		return function () {
			setTimeout(t, 0);
		};
	}
};