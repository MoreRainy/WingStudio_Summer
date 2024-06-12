# wingstudio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

<h1>目前已知bug：</h1>

<p>
1.轮播图：①在过渡动画没结束前再次手动移动轮播图会导致闪现到下一位置在回来②过渡动画没结束前滑动轮播图会导致无法无缝切换。原因大概是因为判定条件在transitioned的监听器里面，导致打断动画bug。希望的解决方案是能实时获取ul的位置，并对其监视，不再用transitioned监听
</p>
