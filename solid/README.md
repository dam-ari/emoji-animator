
## Emoji Animator

#### Structure

```bash
emoji-animator/
│
├── src/
│   ├── EmojiAnimator.jsx
│   └── EmojiAnimator.css
│
├── package.json
├── vite.config.js
└── rollup.config.js

```

#### Highlight
The `emoji-animator` project is a component designed to animate emojis using the Solid.js framework. The project structure is organized to facilitate development, building, and deployment processes.

##### How to use in your next project:

updating the package.json file to include the following line:

```json
{
  "dependencies": {
    "emoji-animator": "github:dam-ari/emoji-animator/solid"
  }
}
``` 

or install it using npm:

```bash 
npm install github:dam-ari/emoji-animator/solid
```

Then import the component in your Solid.js application:

```jsx

----------

#### Key Components

- **src/EmojiAnimator.jsx**: The main React component responsible for rendering and animating emojis.
- **src/EmojiAnimator.css**: The stylesheet containing the styles for the EmojiAnimator component.
- **package.json**: Contains metadata about the project, including dependencies, scripts, and other configurations.
- **vite.config.js**: Configuration file for Vite, a build tool that provides fast and optimized development and build processes. It includes settings for building the library and integrating plugins.
- **rollup.config.js**: Configuration file for Rollup, a module bundler. It specifies input/output settings, plugins, and external dependencies.

#### Build and Development

- **Vite**: Used for development and building the project. It is configured to handle the Solid.js framework and optimize the build output.
- **Rollup**: Used for bundling the project into different module formats (CommonJS and ES Module). It includes plugins for resolving node modules, transforming code with Babel, and minifying the output with Terser.

#### Dependencies

- **solid-js**: The core library for building user interfaces with Solid.js.
- **vite-plugin-solid**: A Vite plugin that provides support for Solid.js.
- **@rollup/plugin-node-resolve**: Helps Rollup find and bundle node modules.
- **@rollup/plugin-commonjs**: Converts CommonJS modules to ES6, so they can be included in a Rollup bundle.
- **rollup-plugin-terser**: Minifies the bundle to reduce file size.
- **babel-preset-solid**: Babel preset for compiling Solid.js components.

#### Scripts

- **build**: Runs the Vite build process to generate the production-ready output.
