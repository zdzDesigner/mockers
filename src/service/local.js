import fs from 'fs'
import { clearComments } from '../util'
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
        var data = fs.readFileSync(filePath)
        var dataObj = clearComments(data.toString())
        data = JSON.parse(dataObj.code)

        creater(data, filePath, '', validMock(dataObj.comments))
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
const validMock = (comments) => {
  const commentRE = /\/+/g
  const spaceRE = /\s/g
  return comments.reduce(function (pend, val) {
    val = val.replace(commentRE, '').replace(spaceRE, '')
    let { key, value } = parseColone(val)
    if (~['mock-length', 'mock-delay', 'no-mock'].indexOf(key)) {
      pend[key] = value
    }
    return pend
  }, {})
}

const parseColone = (val) => {
  let arr = val.split(':')
  return { key: arr[0], value: arr[1] }
}
