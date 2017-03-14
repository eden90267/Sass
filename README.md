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

## Compass

主要是針對CSS3，import後利用mixin來寫一些針對CSS3的語法，可解決一些跨瀏覽器語法的問題。也可以做Layout，or 一些基本設定。

[http://compass-style.org/reference/compass/](http://compass-style.org/reference/compass/)

- `@import "compass/css3"`

### How to Use?

#### install

可透過[官網](http://compass-style.org/install/)去建議專案導入compass方式：

![compass-install](http://i.imgur.com/0vBDagp.png)

```
$ gem install compass
$ cd <myproject>
$ compass install compass --syntax sass --css-dir "css"
```

`--css-dir`，可選參數，預設是stylesheets，欲知更多請詳見此[官網Doc連結](http://compass-style.org/help/documentation/configuration-reference/)。

---

command line to watch，但每次都要加上options `--css-dir "css"`

```
$ compass watch --css-dir "css"
```

所以可以透過**設定檔**方式處理，看`compass help`：

```
$ compass config
```

再調整自動產生的檔案`./config/compass.rb`的自想要`css_dir`路徑，再來就可以僅用`compass watch`監控目錄了。

```
$ compass watch
```

---

參考連結：

[http://compass-style.org/install/](http://compass-style.org/install/)


#### use

舉例：border-radius的CSS3使用，可參考[官網連結](http://compass-style.org/reference/compass/css3/border_radius/)

```

@import compass

.button
  +border-radius(10px)
  +opacity(0.7)

```

### Susy

依附在compass其中，可透過Susy來做一些**格線的系統**，可看[官網](http://susydocs.oddbird.net/en/latest/)了解。

可看[Getting Started](http://susydocs.oddbird.net/en/latest/install/)

需用compass來做安裝：

```

# command line
compass install susy

```

就會產生預設的`style.scss`跟`_grids.scss`。目前還是採用過去的版本，因Susy 2有重大的變化。請見[官網](http://susydocs.oddbird.net/en/latest/upgrade/)。

1. import

	```
	@import susyone
	```

2. 設置預設值

	```
    @charset "utf-8"

    // total width == 960px
	$total-column: 12   // 欄位的總數
	$column-width: 60px // 欄位的寬度
	$gutter-width: 20px // 欄位與欄位之間的距離
	$grid-padding: 10px // 邊界的距離

	```

    相關susyone指令可以從[這裡](http://susydocs.oddbird.net/en/latest/susyone/)看到。

3. 常用方法

    - 格線

        - +container()
        - +span-columns(3, 12)
        - +span-columns(9 omega, 12)

            就會自動幫你計算寬度，不用拿計算機算老半天了

            - omega：最後一個元素在一整行之內，靠右的意思

    - media query

        ```
        $mobile: 1px 480px 12 // 輸出 (min-width: 1px) and (max-width: 480px)
        $pad: 481px 720px 12
        $laptop: 721px 1199px 12
        $desktop: 1200px 12
        ```

        - breakpoint

            ```
            .wrapper
	            +container()
	            +at-breakpoint($mobile)
		            +set-container-width()
	            +at-breakpoint($pad)
		            +set-container-width()
	            +at-breakpoint($laptop)
		            +set-container-width()
	            +at-breakpoint($desktop)
		            +set-container-width()

            .header

              .logo
                +at-breakpoint($mobile)
                  +span-columns(12,12)
                +span-columns(3,12)
              .nav
                +at-breakpoint($mobile)
                  +span-columns(12,12)
                +span-columns(9 omega,12)
            ```

            ```
            .content
              .img-item
                +at-breakpoint($mobile)
                  +isolate-grid(12)
                +at-breakpoint($pad)
                  +isolate-grid(6)
                +at-breakpoint($laptop)
                  +isolate-grid(4)
                +at-breakpoint($desktop)
                  +isolate-grid(3)
            ```

        - `+susy-grid-background()`

            ````
            $debug: true

            .wrapper
              +container()
              @if $debug
                +susy-grid-background()
            ````

### Compass Sprites

將多張一樣大小的圖片合併為一張，之後再透過定位的方式讀取要的圖片。

[官網連結](http://compass-style.org/help/tutorials/spriting/)

1. 先做監視再進行匯入
2. import & base usage

    產生合併檔案(不曉得為什麼call all-my-icons-sprites會報錯，不過檔案有產生)

    ```
    @import "compass/utilities/sprites"

    @import "compass/utilities/sprites"
    @import "icon/*.png" // compass.rb的image dir要記得設定正確的名稱。(e.g. images_dir = "img")
    +all-my-icons-sprites
    ```

    設立icon的class

    ```
    $my-icon-wh: 14px
    .my-icon-avatar-1, .my-icon-avatar
      width: $my-icon-wh
      height: $my-icon-wh
      display: inline-block
      background: url('../img/icon-s0cf6367ccf.png')
      +background-size(cover)

    .my-icon-avatar-1
      background-position-x: 0
      background-position-y: 0
    .my-icon-avatar-1
      background-position-x: 0
      background-position-y: -$my-icon-wh * 1
    ```