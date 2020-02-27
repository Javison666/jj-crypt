# ts + webpack 制作npm-js库

## 需要先安装webpack

## 在src文件中编写js库，index.ts为入口

## 执行 npm run dev 可实时检查ts

## 执行 npm run build ,可打包出dist,common文件夹

## 直接npm发布后，import会直接引入dist的index.js

## html中则直接引入common文件夹下的$fn.js,window.$crypt进行调用