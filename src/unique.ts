import b64 from "@tleef/b64-js";
import * as uuid from "uuid";

const tsPad = "0000000000000000";
const idPad = "--------------------------------";

const create = (ts?: Date): string => {
  ts = ts || new Date();
  let tsHex = Math.floor(new Date(ts).getTime() / 1000).toString(16);
  tsHex = tsPad.substring(0, 16 - tsHex.length) + tsHex;
  const random = uuid.v4().replace(/-/g, "");
  const hexId = tsHex + random;
  let id = b64.from(hexId, "hex");
  id = id.replace(/\+/g, "-");
  id = id.replace(/\//g, ".");
  id = id.replace(/^-+/, "");
  return id;
};

const getTimestamp = (id: string): Date => {
  id = idPad.substring(0, 32 - id.length) + id;
  id = id.replace(/\./g, "/");
  id = id.replace(/-/g, "+");
  const hexId = b64.to(id, "hex");
  const tsHex = hexId.substring(0, 16);
  const ts = parseInt(tsHex, 16) * 1000;
  return new Date(ts);
};

export default create;

export { create, getTimestamp };
