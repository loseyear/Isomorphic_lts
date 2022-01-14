import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
  box-sizing: border-box;
}

html,
body,
#__next {
  height: 100%;
}

html {
  font-family: "SF Pro SC", "SF Pro Text", "SF Pro Icons", "PingFang SC", "Segoe UI", SegoeUI, "Microsoft YaHei", 微软雅黑, "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

body {
  box-sizing: border-box;
  overflow-y: scroll;
  font-size: 12px;
  min-height: 700px;
  background: #F9FAFF;
}

body,
ul,
ol,
p,
h1,
h2,
h3,
h4,
dl,
dd,
figure {
  margin: 0;
}

ul,
ol,
input {
  padding: 0;
}

ul,
ol {
  list-style: none;
}

input {
  border: 0 none;
}

b,
em,
h1,
h2,
h3 {
  font-weight: normal;
}


:-moz-placeholder {
  color: #6A789B;
  font-size: 14px;
}
::-moz-placeholder {
  color: #6A789B;
  font-size: 14px;
}
input:-ms-input-placeholder {
  color: #6A789B;
  font-size: 14px;
}

input::-webkit-input-placeholder{
  color: #6A789B;
  font-size: 14px;
}

textarea::-webkit-input-placeholder {
  color: #6A789B;
  font-size: 14px;
}

textarea:-moz-placeholder { /* Firefox 18- */
  color: #6A789B;
  font-size: 14px;
}

textarea::-moz-placeholder {  /* Firefox 19+ */
  color: #6A789B;
  font-size: 14px;
}

textarea:-ms-input-placeholder {
  color: #6A789B;
  font-size: 14px;
}

textarea::placeholder {
  color: #6A789B;
  font-size: 14px;
}

a {
  display: inline-block;
  text-decoration: none;
}
`