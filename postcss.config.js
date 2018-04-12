module.exports = ({ file, options, env }) => ({

  plugins: {
    'css-mqpacker': {},
    'autoprefixer': {
        // grid: true,
        browsers: ['last 2 versions']
    },
    'cssnano': env === 'production' ? options.cssnano : false
  }

})
