function relativePath(path) {
  // console.log({path})
  path[0] != '.' && (path = '.' + path)
  path = clearLastToken(path).join('/')
  return path
}

function clearLastToken(path) {
  return path.split('/').filter(function (item) {
    if (!!item) return item
  })
}
