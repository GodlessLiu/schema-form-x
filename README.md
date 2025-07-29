# SchemaFormX
SchemaFormX - 基于JSON Schema的智能动态表单生成器

# 如果添加一个主题？
1. 在`src/styles/`下创建一个`theme-[color].css`文件，内容参考已有的css文件。
2. 然后在`locales`文件添加`qpp.title.settings.performance.color.[color]`资源。
3. 在`src/styles/tailwind.css`文件下的`:root`下，创建`--color-[color]`变量。