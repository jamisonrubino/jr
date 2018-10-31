module.exports = {
   stripPrefix: 'build/',
   staticFileGlobs: [
     'build/*',
     'build/static/**/!(*map*)',
     'build/img/*',
     'build/img/**/*',
     'build/img/**/**/**/*',
     'build/include/*'
   ],
   dontCacheBustUrlsMatching: /\.\w{8}\./,
   swFilePath: 'build/service-worker.js'
};
