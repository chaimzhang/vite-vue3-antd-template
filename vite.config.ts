import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers'
import { resolve } from 'path';
import postcssPxToViewport from 'postcss-px-to-viewport';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import eslintPlugin from 'vite-plugin-eslint';
// import commpressPlugin from 'vite-plugin-compression'
// import legacy from '@vitejs/plugin-legacy';
export default defineConfig({
    base:'./',
    server: {
        host: true,    // 监听所有地址
        // cors: true, // 默认启用并允许任何源
        // open: true, // 在服务器启动时自动在浏览器中打开应用程序
      //反向代理
      //   proxy: {
      //       // 字符串简写写法
      //       '/api': 'http://localhost:8090',
      //       // 选项写法
      //       '/api': {
      //           target: 'http://aystar.com',
      //           changeOrigin: true,
      //           rewrite: (path) => path.replace(/^\/api/, '')
      //       },
      //       // 正则表达式写法
      //       '^/backend/.*': {
      //           target: 'http://aystar.com',
      //           changeOrigin: true,
      //           rewrite: (path) => path.replace(/^\/backend/, '')
      //       },
      //       // 使用proxy 实例
      //       '/api': {
      //           target: 'http://aystar.com',
      //           changeOrigin: true,
      //           configure: (proxy, options) => {
      //               // proxy 是 'http-proxy' 的实例
      //           }
      //       },
      //       // websockets 或 socket.io
      //       '/socket.io': {
      //           target: 'ws://localhost:9090',
      //           ws: true,
      //       }
      //   }
    },
    build: {
        outDir: 'dist' ,   // 打包文件的输出目录
        assetsDir: 'assets',    // 静态文件的存放目录
        // chunkSizeWarningLimit: 1000,
        minify: 'terser',
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
                manualChunks(id) {
                  if (id.includes('node_modules')) {
                    return id
                      .toString()
                      .split('node_modules/')[1]
                      .split('/')[0]
                      .toString()
                  }
                }
            }
        }
    },
    plugins: [
        Icons({ autoInstall: true }),
        vue(),
        eslintPlugin({
            include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
        }),
        Components({
            // dirs 指定组件所在位置，默认为 src/components
            // 可以让我们使用自己定义组件的时候免去 import 的麻烦
            dirs: ['src/components/'],
            // 配置需要将哪些后缀类型的文件进行自动按需引入
            extensions: ['vue', 'md'],
            // 解析的 UI 组件库，这里以 Element Plus 和 Ant Design Vue 为例
            resolvers: [ IconsResolver(),AntDesignVueResolver({
                importStyle: 'less', // 一定要开启这个配置项
            })],
        }),
        // commpressPlugin({
        //     verbose: true, // 默认即可
        //     disable: false, //开启压缩(不禁用)，默认即可
        //     deleteOriginFile: false, //删除源文件
        //     threshold: 10240, //压缩前最小文件大小
        //     algorithm: 'gzip', //压缩算法
        //     ext: '.gz' //文件类型
        // }),
        // legacy({
        //     targets: ['defaults', 'not IE 11'],
        // }),
        // createStyleImportPlugin({
        //     resolves:[AndDesignVueResolve(),AntdResolve()],
        //     libs: [
        //         {
        //             libraryName: 'ant-design-vue',
        //             esModule: true,
        //             resolveStyle: (name) => {
        //                 return `ant-design-vue/es/${name}/style/index`
        //             }
        //         }
        //     ]
        // })
    ],
    css: {
        preprocessorOptions: {
            less: {
                // modifyVars: {
                //   hack: `true; @import (reference) "${path.resolve("src/assets/css/base.less")}";`,
                // },
                javascriptEnabled: true,
            },
        },
        postcss: {
            plugins: [
                // viewport 布局适配
                postcssPxToViewport({viewportWidth: 1920})
            ]
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, '/src')    // 路径别名
        },
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    },
})
