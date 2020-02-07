module.exports = function(eleventyConfig) {
  let env = process.env.ELEVENTY_ENV;

  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');
  eleventyConfig.addWatchTarget('./src/scripts/');
  eleventyConfig.addWatchTarget('./src/styles/');

  eleventyConfig.addPassthroughCopy('./src/images');

  // compress and combine js files
  eleventyConfig.addFilter('jsmin', function(code) {
    const Terser = require('terser');
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    if (env === 'dev') {
      return code;
    }
    return minified.code;
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      data: `_data/`,
    },
    templateFormats: ['njk', 'md', '11ty.js'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true,
  };
};
