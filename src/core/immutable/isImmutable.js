import constants from '../internal/constants';

const IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}

export default isImmutable;
