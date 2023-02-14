export const clearComments = (code) => {
  const commentRE = /(\/\/.*)?|(\/\*[\s\S]*?\*\/)/g
  let comments = []

  {
    // http://xxx => http@:@/@/@xxx
    let errRE = /:\/\//g
    let displace = '@:@/@/@'
    code = code.replace(errRE, displace)
  }

  code = code.replace(commentRE, function (val) {
    val && comments.push(val)
    return ''
  })

  {
    // http@:@/@/@xxx  => http://xxx
    let displaceRE = /@:@\/@\/@/g
    let err = '://'
    code = code.replace(displaceRE, err)
  }

  return {
    code,
    comments
  }
}
