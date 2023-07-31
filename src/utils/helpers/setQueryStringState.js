export default function(queryString) {
  var newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    queryString;
  window.history.pushState({ path: newurl }, "", newurl);
}
