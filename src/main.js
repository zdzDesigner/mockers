import { createLocalMock, remoteMock } from './service/index.js'

export default function mockers(app, rootPath) {
  app.use(remoteMock)
  app.use(createLocalMock(rootPath))
}
