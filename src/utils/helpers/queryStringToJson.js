export default function queryStringToJSON(qs) {
  if (!qs || qs === "") {
    return "";
  }
  if (qs.indexOf("?") > -1) {
    qs = qs.split("?")[1];
  }
  var pairs = qs.split("&");
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });
  return result;
}
