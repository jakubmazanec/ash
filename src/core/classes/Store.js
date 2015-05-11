import Observable from './Observable';

const TRIGGER_OPTIONS = {
	noEventArgument: true
};

class Store extends Observable {
	trigger(/*data*/) {
		if (arguments.length === 10) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], TRIGGER_OPTIONS);
		} else if (arguments.length === 9) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], TRIGGER_OPTIONS);
		} else if (arguments.length === 8) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], TRIGGER_OPTIONS);
		} else if (arguments.length === 7) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], TRIGGER_OPTIONS);
		} else if (arguments.length === 6) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], TRIGGER_OPTIONS);
		} else if (arguments.length === 5) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], TRIGGER_OPTIONS);
		} else if (arguments.length === 4) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], arguments[3], TRIGGER_OPTIONS);
		} else if (arguments.length === 3) {
			super.trigger('all', arguments[0], arguments[1], arguments[2], TRIGGER_OPTIONS);
		} else if (arguments.length === 2) {
			super.trigger('all', arguments[0], arguments[1], TRIGGER_OPTIONS);
		} else if (arguments.length) {
			super.trigger('all', arguments[0], TRIGGER_OPTIONS);
		} else {
			super.trigger('all', TRIGGER_OPTIONS);
		}

		return this;
	}
}

module.exports = Store;
