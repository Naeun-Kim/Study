https://twitter-clone-9658e.web.app/

Nomad Coder lecture

The code I've worked on includes:
- [Editing/Deleting attached images](https://github.com/Naeun-Kim/Study/commit/f5277928cea90e956c24ea306ceac28f7266e0a4)
- [File upload size limitation](https://github.com/Naeun-Kim/Study/commit/34eaabcf5e645befa249190f6fdf895b9d1f142a)
- [Editing the profile name, with changes taking effect upon outside click](https://github.com/Naeun-Kim/Study/commit/5f054e5053cdb1550f3e03d97e260ad7c01812e1)

내가 작업한 코드
- [첨부된 사진 편집/삭제](https://github.com/Naeun-Kim/Study/commit/f5277928cea90e956c24ea306ceac28f7266e0a4)
- [파일 업로드 용량 제한](https://github.com/Naeun-Kim/Study/commit/34eaabcf5e645befa249190f6fdf895b9d1f142a)
- [프로필 이름 편집. 외부 클릭시 적용되도록](https://github.com/Naeun-Kim/Study/commit/5f054e5053cdb1550f3e03d97e260ad7c01812e1)


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
