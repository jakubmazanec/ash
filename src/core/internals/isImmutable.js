import constants from '../internals/constants';



const IMMUTABLE_TAG = constants.IMMUTABLE_TAG;

export default function isImmutable(value) {
	return value && value[IMMUTABLE_TAG];
}
