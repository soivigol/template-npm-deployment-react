const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { execSync } = require('child_process');

function getRepoName() {
  try {
    // Execute a shell command to get the repository name from the git config
    const repoUrl = execSync('git config --get remote.origin.url').toString().trim();
    // Extract the repository name from the URL
    const repoName = repoUrl.split('/').pop().replace('.git', '');
    return `/${repoName}/`;
  } catch (error) {
    console.error('Error fetching repository name:', error);
    return '/';
  }
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: getRepoName(), // Dynamically set publicPath based on repo name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    hot: true,
    historyApiFallback: true
  }
};