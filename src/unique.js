import uuid from 'uuid'
import {Buffer} from 'buffer'

const pad = '0000000000000000'

const create = (ts) => {
  ts = ts || (new Date())
  ts = (new Date(ts)).getTime().toString(16)
  ts = pad.substring(0, 16 - ts.length) + ts
  const random = uuid.v4().replace(/-/g, '')
  const hexId = ts + random
  let id = Buffer.from(hexId, 'hex').toString('base64')
  id = id.replace(/\+/g, '-')
  id = id.replace(/\//g, '_')
  return id
}

const getTimestamp = (id) => {
  id = id.replace(/_/g, '/')
  id = id.replace(/-/g, '+')
  const hexId = Buffer.from(id, 'base64').toString('hex')
  const tsHex = hexId.substring(0, 16)
  const ts = parseInt(tsHex, 16)
  return new Date(ts)
}

export default create

export {
  create,
  getTimestamp
}
