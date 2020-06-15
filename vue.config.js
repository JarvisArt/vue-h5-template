
module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/rest': {
        target: 'http://dmp.test.seewo.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
