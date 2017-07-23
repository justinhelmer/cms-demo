module.exports = function isServer() {
   return ! (typeof window != 'undefined' && window.document);
}