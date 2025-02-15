import { nanoid } from "nanoid";

function generateShortId(url) {
  return nanoid(6);
}
export default generateShortId;
