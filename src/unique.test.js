/* eslint-env mocha */

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import uuid from 'uuid'
import unique, { create, getTimestamp } from './unique'

const expect = chai.expect

chai.use(sinonChai)

describe('unique', () => {
  describe('create()', () => {
    it('should return a string', () => {
      const id = create()

      expect(id).to.be.a('string')
    })

    it('should return unique strings', () => {
      const id1 = create()
      const id2 = create()

      expect(id1).to.not.equal(id2)
    })

    it('should accept a Date', () => {
      sinon.stub(uuid, 'v4').returns('00000000000000000000000000000000')
      const id = create(new Date(0))
      uuid.v4.restore()

      expect(id).to.equal('--------------------------------')
    })
  })

  describe('getTimestamp()', () => {
    it('should return a Date', () => {
      const id = create()
      const ts = getTimestamp(id)

      expect(ts).to.be.an.instanceof(Date)
    })

    it('should return epoch', () => {
      const epoch = new Date(0)
      const id = create(epoch)
      const ts = getTimestamp(id)

      expect(ts.getTime()).to.equal(epoch.getTime())
    })

    it('should return now', () => {
      const now = new Date()
      const id = create(now)
      const ts = getTimestamp(id)

      expect(ts.getTime()).to.equal(now.getTime())
    })
  })

  describe('unique()', () => {
    it('should be equal to create()', () => {
      expect(unique).to.equal(create)
    })
  })
})
