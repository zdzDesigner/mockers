const { local, remote }  = require('./service')


module.exports = function(app){
    // console.log(Object.keys(app))
    app.use(remote)
    app.use(local)
}