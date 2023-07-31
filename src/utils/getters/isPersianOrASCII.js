export default function check(s) {
  const PersianOrASCII = /[آ-ی]|([a-zA-Z])/;
  let m = [];
  if ((m = s.match(PersianOrASCII)) !== null) {
    if (m[1]) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}
