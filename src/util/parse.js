export const parseTpl = (code) => {
  const commentRE = /(\/\/.*)?|(\/\*[\s\S]*?\*\/)/g
  let comments = []

  {
    // http://xxx => http@:@/@/@xxx
    let errRE = /:\/\//g
    let displace = '@:@/@/@'
    code = code.replace(errRE, displace)
  }

  code = code.replace(commentRE, function (val) {
    if (val) comments.push(val)
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

export const parsePair = (val) => {
  let arr = val.split(':')
  return { key: arr[0], value: arr[1] }
}
