const path = require('path');

const conf {
	entry: 'src/script.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'main.js',
		publicPath: 'dist'
	},
	devServer:{
		overlay: true
	},
	module: {
		rules: [
			{
				test:/\.css$/,
				use:[
				'style-loader',
				'css-loader'
				]

			}
		]
	}
};

module.exports = conf;