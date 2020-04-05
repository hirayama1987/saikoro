module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "./src/assets/main.scss";'
      }
    }
  }
};