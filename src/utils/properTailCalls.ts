/**
 * Limitations:
 * Obviously, if objects ({}) are reintroduced,
 * we have to change this for a more stringent check,
 * as isTail and transformedFunctions are properties
 * and may be added by Source code.
 */
export const callIteratively = (f: any, ...args: any[]) => {
  // console.log('fcall');
  while (true) {
    if (typeof f !== 'function') {
      throw new TypeError('Calling non-function value ' + f)
    }
    if (f.transformedFunction! !== undefined) {
      f = f.transformedFunction
    }
    const res = f(...args)
    if (res === null || res === undefined) {
      return res
    } else if (res.isTail === true) {
      f = res.function
      args = res.arguments
    } else if (res.isTail === false) {
      return res.value
    } else {
      return res
    }
  }
}

export const wrap = (f: (...args: any[]) => any) => {
  const wrapped = (...args: any[]) => callIteratively(f, ...args)
  wrapped.transformedFunction = f
  return wrapped
}
