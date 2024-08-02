## Transforming react components into web components

This is a simple example of how to transform a react component into a web component. 
For this example, I'm using @r2wc/react-to-web-component library.

### How to run this project
1. Clone this repository
2. Run `pnpm install`
3. Run `pnpm dev` for testing the react component
4. Run `pnpm build` for building the web component
5. Use Go Live from VSCode to see the web component in action (/preview.html)

### How to use the web component
1. Include the script in your HTML file
```html
<script type="module" src="./dist/wl-components.es.js"></script> 
```
2. Use the web component in your HTML file
```html
<web-ask></web-ask>
```
3. import the css file in your HTML file
```html
<link rel="stylesheet" href="./dist/style.css">
```

### How to use the react component
1. Import the react component in your react project
```javascript
import { Ask } from './components/Ask';
```
2. Use the react component in your react project
```javascript
<Ask />
```

