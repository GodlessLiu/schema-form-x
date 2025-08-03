# SchemaFormX
SchemaFormX - 基于JSON Schema的智能动态表单生成器

# 如果添加一个主题？
1. 在`src/styles/`下创建一个`theme-[color].css`文件，内容参考已有的css文件。
2. 然后在`locales`文件添加`qpp.title.settings.performance.color.[color]`资源。
3. 在`src/styles/tailwind.css`文件下的`:root`下，创建`--color-[color]`变量。

# 如何添加一个语言？
1. 在`locales`文件夹下创建一个`[language].yml`文件，内容参考已有的json文件。
2. 在每个`[language].yml`文件下，添加`app.settings.performance.language.[language]`资源。

# 清单
- [ ] 修改许可证下面的作者
- [ ] 修改`App.vue`下的标题
- [ ] 修改`public`下的图标
- [ ] 修改`locales`下的语言资源，如: `app.title`、`app.description`等
- [ ] 整理README.md
