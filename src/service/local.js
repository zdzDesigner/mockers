import fs from 'fs'
import { parseTpl, parsePair } from '../util'
import { creater } from './plugin'

export const createLocalMock = (rootPath) => {
  return function localMock(req, res, next) {
    var mockRemote = req.headers['mock-remote']

    var filePath = ''
    if (mockRemote) {
      mockRemote = mockRemote.replace(/\/?@mock/g, '')
      filePath = rootPath + mockRemote
      console.log('mock-local: ', filePath)

      if (fs.existsSync(filePath)) {
        tplToMock(filePath)
          .then(function (data) {
            res.writeHead(200, {
              'content-type': 'application/json;charset=utf8'
            })
            res.end(JSON.stringify(data))
          })
          .catch(function (error) {
            console.log(error)
          })
      } else {
        res.writeHead(404)
        res.end('error file path:' + filePath)
        console.log('error file path ', filePath)
      }
    } else {
      next()
    }
  }
}

export const tplToMock = (filePath) => {
  let data = fs.readFileSync(filePath)
  let codeAndComments = parseTpl(data.toString())
  data = JSON.parse(codeAndComments.code)

  return creater(data, filePath, '', validMock(codeAndComments.comments))
}

const validMock = (comments) => {
  const commentRE = /\/+/g
  const spaceRE = /\s/g
  return comments.reduce(function (pend, val) {
    val = val.replace(commentRE, '').replace(spaceRE, '')
    let { key, value } = parsePair(val)
    if (~['mock-length', 'mock-delay', 'no-mock'].indexOf(key)) {
      pend[key] = value
    }
    return pend
  }, {})
}

