function curry(func) {
  return function curriedFunc(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function (...args2) {
        return curriedFunc.apply(this, args.concat(args2));
      };
    }
  };
}

export { curry };
