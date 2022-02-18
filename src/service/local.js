const fs = require('fs')
const path = require('path')
const { clearComments } = require('../util')
const { creater } = require('./plugin')
const { relativePath } = require('./base')


module.exports = function(mockPath){
    let rootPath = path.resolve(process.cwd(), relativePath(mockPath))
    return function (mockRemote){
        return new Promise(function(resolve, reject){
            mockRemote = mockRemote.replace('/@mock','').replace('@mock','')
            let filePath = rootPath + mockRemote
            console.log('mock-local: ', filePath)
            
            if(fs.existsSync(filePath)){
                let data = fs.readFileSync(filePath)
                let dataObj = clearComments(data.toString())
                data = JSON.parse(dataObj.code)
                
                creater(data, filePath, '', validMock(dataObj.comments))
                    .then(function(data){
                        resolve(data)
                    }).catch(function(error){
                        console.log(error)
                        reject(error)
                    })
            }else{
                reject(`error file path: ${filePath}`)
            }
                
        })
    }
}
function validMock(comments) {
    const commentRE = /\/+/g
    const spaceRE = /\s/g
    return comments.reduce(function(pend, val){
        val = val.replace(commentRE,'').replace(spaceRE,'')    
        let {key,value} = parseColone(val)
        if(~['mock-length' ,'mock-delay' ,'no-mock'].indexOf(key)){
            pend[key] = value
        }
        return pend
    },{})
    
}

function parseColone(val){
    let arr = val.split(':')
    return {
        key:arr[0],
        value:arr[1]
    }
}
