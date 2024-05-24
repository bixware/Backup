module.exports = {
    module: {
      rules: [
        {
          test: /\.js/,
          loader: "babel-loader",
        },
      ],
    },
  }
/* 
  module.exports = {
    // ... other configurations ...
     module: {
         rules: [
             // ... other rules ...
             {
                 test: /\.(ttf|eot|woff|woff2)$/,
                 use: {
                     loader: 'file-loader',
                     options: {
                         name: '[name].[ext]',
                         outputPath: 'fonts/'
                     }
                 }
             }
         ]
     }
   } */