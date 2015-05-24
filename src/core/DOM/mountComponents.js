import isComponentAshElement from '../internals/isComponentAshElement';
import isAshNodeAshElement from '../internals/isAshNodeAshElement';
import constants from '../internals/constants';



const LIFECYCLE_MOUNTING = constants.LIFECYCLE_MOUNTING;
const LIFECYCLE_MOUNTED = constants.LIFECYCLE_MOUNTED;

export default function mountComponents(ashElement) {
	if (isAshNodeAshElement(ashElement)) {
		for (let i = 0; i < ashElement.children.length; i++) {
			if (ashElement.children[i]) {
				mountComponents(ashElement.children[i]);
			}
		}
	} else if (isComponentAshElement(ashElement)) {
		if (ashElement.instance && ashElement.instance.__lifecycle === LIFECYCLE_MOUNTING) {
			ashElement.instance.__lifecycle = LIFECYCLE_MOUNTED;
		}

		if (ashElement.children[0]) {
			mountComponents(ashElement.children[0]);
		}
	}
}
