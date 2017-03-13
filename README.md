# Sass

## What is the Sass

是一種樣式表語言，是一個穩定、超強、專業的CSS擴展語言。

Sass必須透過編譯器，轉換成CSS，然後給HTML去做搭配使用。

## How to First ?

1. 開資料夾

```
Example
  - sass
  - css
```

2. 開啟terminal，進入到該資料夾，輸入：

```
sass --watch sass:css
```

3. sass資料夾新增example.sass檔案，即可開始輸入sass指令


## Sass Syntax

### 變數

```

$headerFontSize: 24px

.header
  font-size: $headerFontSize

```

### Mixin

- `@mixin`
- `@include mixinName`, `+mixinName`

```

@mixin coolFontSize($size, $line, $align)
  font-size: $size
  line-height: $line
  text-align: $align
  
.header
  font-size: $headerFontSize

  .a
    width: 100px
    +coolFontSize(14px, 20px, left)

```

### 繼承

- `@extend className`

```

.header
  font-size: $headerFontSize

  .a
    width: 100px
    +coolFontSize(14px, 20px, left)

  .c
    @extend .a

```

實用範例：

```

.message
  border: 1px solid #ccc
  padding: 100px
  color: #333
  text-align: center

.success
  @extend .message
  border-color: green

.error
  @extend .message
  border-color: red

```

### 指令Directive (if-else, for-loop)

- `@if`、`@else`

```

$navShow: true

.header
  font-size: $headerFontSize

  .nav
    @if $navShow
      display: table
    @else
      display: none

```

- `@for`

```

.nav
  @for $i from 1 through 10
    .item-#{$i}
      font-size: #{i}px

```

- `@each`

```

$list: apple banana

.nav
  @each $item in $list
    .#{$item}
      font-size: 18px

```

- `@while`

```

$types: 4

.nav
  @while $types > 0
    .item
      font-size: 18px
    $types: $types - 1

```

### import

- `@import`

另開的導入檔以`_`為開頭命名檔案名稱，就不會被轉譯成css檔，供導入用

1. `_mixin.sass`

```

@mixin coolFontSize($size, $line, $align)
  font-size: $size
  line-height: $line
  text-align: $align

```

2. `example.sass`

```

@import base/var
@import base/mixin

.header
  font-size: $headerFontSize
...

```

### Math

對色彩做加減乘除是慣用手法。

```

$buttonColor: #000

.button
  color: #fff
  background-color: $buttonColor

  &:hover
    background-color: $buttonColor + 10

```

### Color

[http://sass-lang.com/documentation/Sass/Script/Functions.html](http://sass-lang.com/documentation/Sass/Script/Functions.html)

```

.button
  &:hover
    color: darken(#fff, 10%)
    color: invert(#fff)
    background-color: lighten($buttonColor, 10%)

```

常用function：`rgba`、`lighten`、`darken`

### RWD

```

.button
  color: #fff
  background-color: $buttonColor
  
  @media screen and (min-width: 320px) and (max-width: 500px)
    width: 100%
  @media screen and (max-width: 320px)
    width: 100px

```

可再模組化出去。