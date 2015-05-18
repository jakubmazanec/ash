import isFunction from './isFunction';



/**
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */
function autobind(...args) {
  if (args.length === 1) {
    return boundClass(...args);
  } else {
    return boundMethod(...args);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  Reflect.ownKeys(target.prototype).forEach((key) => {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (isFunction(descriptor.value)) {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });

  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;
  var newKey;

  if (!isFunction(fn)) {
    throw new Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`);
  }

  if (typeof key === 'string') {
    // Add the key to the symbol name for easier debugging
    newKey = Symbol(`@autobind method: ${key}`);
  } else if (typeof key === 'symbol') {
    // A symbol cannot be coerced to a string
    newKey = Symbol('@autobind method: (symbol)');
  } else {
    throw new Error(`Unexpected key type: ${typeof key}`);
  }

  return {
    configurable: true, // must be true or we could not be changing it
    get() {
      if (!this.hasOwnProperty(newKey)) {
        this[newKey] = fn.bind(this);
      }
      return this[newKey];
    }
  };
}

export default autobind;
