/**
 * [remote 线上mock数据]
 */
const url = require('url')
const {proxyServer} = require('./plugin')

module.exports = function remoteMock(req, res, next){
    
    var mockRemote = req.headers['mock-remote']
    if(!mockRemote) {
        next()
        return
    }
    
    var mockParsed = url.parse(mockRemote)
       
    // console.log('mockParsed.protocol: ', mockParsed.protocol)
    if(~['http:','https:'].indexOf(mockParsed.protocol)){
        console.log('mock-remote: ',mockRemote)
        // console.log({mockParsed})
        req.url = mockParsed.path
        
        delete req.headers.host
        delete req.headers.domain
        delete req.headers['mock-remote']

        let {protocol, hostname, port} = mockParsed
        
        let target = `${protocol}//${hostname}`
        port && (target = `${target}:${port}`)
        proxyServer.web(req, res,{ target })  
    }else{
        next()    
    }
}