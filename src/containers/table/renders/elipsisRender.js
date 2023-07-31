import textDots from "utils/getters/textDots";

export function elipsisRender(article, number = 20) {
  return textDots(article, number);
}
