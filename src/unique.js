import uuid from 'uuid'
import b64 from '@tleef/b64-js'

const pad = '0000000000000000'

const create = (ts) => {
  ts = ts || (new Date())
  ts = (new Date(ts)).getTime().toString(16)
  ts = pad.substring(0, 16 - ts.length) + ts
  const random = uuid.v4().replace(/-/g, '')
  const hexId = ts + random
  let id = b64.from(hexId, 'hex')
  id = id.replace(/\+/g, '-')
  id = id.replace(/\//g, '.')
  return id
}

const getTimestamp = (id) => {
  id = id.replace(/\./g, '/')
  id = id.replace(/-/g, '+')
  const hexId = b64.to(id, 'hex')
  const tsHex = hexId.substring(0, 16)
  const ts = parseInt(tsHex, 16)
  return new Date(ts)
}

export default create

export {
  create,
  getTimestamp
}
