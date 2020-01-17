const bodyParser = require('body-parser')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    script: [
      { src: '//app.storyblok.com/f/storyblok-latest.js'},
      { src: 'https://www.google.com/recaptcha/api.js', async: true, defer: true}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/app.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/components'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    [
      '@nuxtjs/recaptcha', {
        hideBadge: true,
        siteKey: '6Lf7I9AUAAAAAFAhGT9eQKb2O2RmZRxPinz6sb7w',
        version:2
      }
    ],
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['storyblok-nuxt', {
      accessToken: '8KSchyQV1kPVztI8obRSqwtt',
      cacheProvider: 'memory'
  }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },  
  serverMiddleware: [
    // Will register redirect-ssl npm package
    // 'redirect-ssl',
    // Will register file from project api directory to handle /api/* requires
    bodyParser.json(),
    { path: '/api/download-pdf', handler: '~/api/index.js' },
    { path: '/api/mail', handler: '~/api/mail.js' }
  ]
}
