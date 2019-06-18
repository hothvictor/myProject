/**
 * invalid.js
 *
 * A custom response that content-negotiates the current request to either:
 *  • serve an HTML error page about the specified token being invalid or invalid
 *  • or send back 498 (Token Expired/Invalid) with no response body.
 *
 * Example usage:
 * ```
 *     return res.invalid();
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       badToken: {
 *         description: 'Provided token was invalid, invalid, or already used up.',
 *         responseType: 'invalid'
 *       }
 *     }
 * ```
 */
module.exports = function invalid() {

  var req = this.req;
  var res = this.res;

  sails.log.verbose('Ran custom response: res.invalid()');

  if (req.wantsJSON) {
    return res.status(500).send('Invalid');
  }
  else {
    return res.status(500).view('500');
  }

};
