import b64 from "@tleef/b64-js";
import * as uuid from "uuid";

const pad = "0000000000000000";

const create = (ts?: Date): string => {
  ts = ts || new Date();
  let sts = new Date(ts).getTime().toString(16);
  sts = pad.substring(0, 16 - sts.length) + sts;
  const random = uuid.v4().replace(/-/g, "");
  const hexId = sts + random;
  let id = b64.from(hexId, "hex");
  id = id.replace(/\+/g, "-");
  id = id.replace(/\//g, ".");
  return id;
};

const getTimestamp = (id: string): Date => {
  id = id.replace(/\./g, "/");
  id = id.replace(/-/g, "+");
  const hexId = b64.to(id, "hex");
  const tsHex = hexId.substring(0, 16);
  const ts = parseInt(tsHex, 16);
  return new Date(ts);
};

export default create;

export { create, getTimestamp };
