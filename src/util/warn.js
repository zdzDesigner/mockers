import pc from 'picocolors'


export const warn = (cb, mock_path) => {
  var data

  try {
    data = cb()
  } catch (err) {
    if (mock_path) {
      console.log(pc.red(pc.bold('JSON 语法错误 ：' + mock_path)))
      console.log(pc.yellow(pc.underline('请用JSON解析工具查看 ：http://www.bejson.com')))
    }

    console.log(pc.red('Mock 参数错误 ：'))
    console.log(pc.red(err.stack))
    console.log(pc.gray('--------------'))
  }

  return data
}
