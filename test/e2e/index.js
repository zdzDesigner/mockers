import fs from 'fs'
import { resolve } from 'path'
import { tplToMock } from '../../src/service/local.js'

const filepath = resolve(__dirname,'../test/e2e/source/range.json')
console.log(tplToMock(filepath))
