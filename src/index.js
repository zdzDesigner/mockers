const { local, remote }  = require('./service')


module.exports = function(req,res,next){
    this.use(local)
    this.use(remote)
}