const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const rulesForTypeScript = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    loader: 'ts-loader'
};
const rulesForJavaScript = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
        presets: [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }
};

const rulesForStyles = {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
};

const rules = [rulesForJavaScript, rulesForTypeScript, rulesForStyles];

module.exports = (env, argv) => {
    const { mode } = argv;
    const isProduction = mode === "production";
    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: "/",
            filename: isProduction
                ? '[name].[contenthash].js'
                : 'main.js'
        },
        devServer: {
            open: true,
            port: 3002,
            historyApiFallback: true
        },
        module: { rules },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        optimization: {
            minimize: true,
            minimizer: [
              new CssMinimizerPlugin(),
              new TerserPlugin()
            ],
          },
        plugins: [
            new HtmlWebpackPlugin({ template: 'src/index.html' }),
            new MiniCssExtractPlugin(),
            new Dotenv()
        ]
    }
}