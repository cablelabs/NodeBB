

var privileges = {};

require('./privileges/apis')(privileges);
require('./privileges/categories')(privileges);
require('./privileges/topics')(privileges);
require('./privileges/posts')(privileges);

module.exports = privileges;