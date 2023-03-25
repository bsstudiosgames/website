/** @type {import('postcss').Postcss} */
module.exports = {
  plugins: [require('autoprefixer'), require('cssnano')],
};
