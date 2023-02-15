## mock 配置

- 1. 远程 mock
- 2. 本地 mock(根据 url 匹配)
- 3. 本地 mock(根据配置指定)

### 远程 mock

- 每个接口均可配置

```js
setRequestHeader('mock-remote', 'http://www.mockdomain.com/user/info')
```

### 本地 mock(根据 url 匹配)

- 每个接口均可配置

```js
setRequestHeader('mock-local', 'user/info.json')
```

### 本地 api(根据 url 匹配)

**mockroot(全局根路径)**
_根 mock 路径为"/dev/mock", 请求接口为"/user/info"
那要在"/dev/mock"目录下新建"active"目录，新建"info.json"文件
即最终目录为"/dev/mock/user/info.json"_

- 全局配置根路径: 结合 webpack-dev-middlewave 使用

```js
const mockers = require('mockers')
...
{
  ...
  devServer: {
    setupMiddlewares: function (middlewares,devServer) {
      mockers(devServer.app, path.resolve(__dirname, '/dev/mock'))
      return middlewares
    },
    ...
  }
}
```

- 独立配置根路径: 在请求投中加入"mock-root"字段

```js
setRequestHeader('mock-root', '/dev/mock')
```

_备注:如果同时配置,独立根路径会覆盖全局根路径_

### 配置传参

_有些请求会在 URL 添加 query 参数,即：
url: "/get/user/info?id=323423"
针对这种请求文件路径如下_

```js
此时 服务接收的请求依然是/get/user/info?id=323423
会根据 ? 分割,读取 /dev/mock/get/user/info.json规则文件，
同时会把参数 {id:323423} compile到文件配置规则中
```

### DEMO

_其中 info.json 中的数据即是接口文档中约定的数据 dome 如下_

```json
{
  "mock-length": "[2,3]",
  "message": "{{['请求成功']}}",
  "result": {
    "act_desc": "{\"expire\":\"有效期:{{yyyy-mm-dd}} 领取后,{{$range|[3,22]}}天有效\",\"store\":{\"pre_show\":\"适用全部门店\",\"choose_store\":[\"{{cname}}\",\"{{cname}}\"]},\"desc\":\"222\"}",
    "act_title": "{{cname}}活动",
    "act_start": "{{yyyy-mm-dd HH:mm:ss}}",
    "act_end": "{{yyyy-mm-dd HH:mm:ss}}",
    "act_limit": "{{['到店消费即可用']}}",
    "use_amount": "{{[22.0]}}",
    "max_amount": "{{$range|[22,100]}}",
    "act_status": "{{[1,-1,0]}}",
    "rush_times": [{ "start": "{{A hh:mm:ss}}", "end": "{{HH:mm:ss}}" }],
    "act_value": "{{[222.00]}}",
    "act_type": "{{[14,12,13,21,22]}}",
    "act_expire_desc": "活动已结束",
    "act_stores": "全部门店"
  },
  "code": "{{[10000]}}"
}
```

## mock 规则

- no-mock : true
  禁止 mock 直接返回当前文件数据

- mock-delay:2000
  接口响应的时长(单位:ms, 用来测试延迟)

- mock-length:"[10,30]"
  mock 中的数组长度，随机 10 到 30 之间

- $length
  每条数组长度控制

```js
["{{$length|[2,9]}}",{key:'val',...}]

针对这条规则的数组长度为[2,9]随机值（如果想设定具体值，设置相同即可。如：[3,3]）
{key:'val',...} 为要 mock 的数据（可为满足一下规则数值,也可继续嵌套）
```

_列：想输出 1 到 10 中的任意 5 个非重复数，返回数组_

```js
['{{$length|[5,5]}}', '{{$range|[1,10]}}']
```

- $range
  区间

_1 到 10 中随机取一个数_

```js
'{{$range|[1,10]}}'
```

- {{}}
  规则标示符

  - 1. 随机固定值
       {{[3,4,5,6]}}

  - 2. 范围

    - 随机范围中的整数值
      {{$range|[1,100]}}

    - 随机范围中的带一个小数值 22.2
      {{$range:1|[1,100]}}

    - 随机范围中的带两个小数值 22.22
      {{$range:2|[1,100]}}
    - ….. 一次类推

  - 3.手机号
    {{phone}}

  - 4.资源地址
    {{url}}

  - 5.地区名
    {{region}}

  - 6.中文名
    {{cname}}

  - 7.英文名
    {{ename}}

  - 8.段落
    {{paragraph}}

  - 9.颜色
    {{color}}

  - 10.序列
    {{index}}

  - 11.日期

```
      yyyy-mm-dd
      yyyy.mm.dd
      mm-dd
      mm.dd
      yyyy-MM-dd A HH:mm:ss     2011-07-11 PM 14:00:34
      yy-MM-dd a HH:mm:ss       80-01-14 pm 13:43:31
      y-MM-dd HH:mm:ss          73-04-21 05:35:55
      y-M-d H:m:s               74-6-2 17:6:16
      yyyy-MM-dd                1994-12-19
      yy-MM-dd                  87-04-18
      y-MM-dd                   04-10-29
      y-M-d                     78-1-19
      A HH:mm:ss                AM 09:06:50
      a HH:mm:ss                am 06:00:15
      HH:mm:ss                  02:52:32
      H:m:s                     1:35:37
```
