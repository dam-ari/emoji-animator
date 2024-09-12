
# 🌟 Emoji Animator Web Component 🌟

Welcome to the Emoji Animator Web Component! This reusable Web Component, built using Solid.js, animates a series of emojis. It's designed to be easy to use and integrate into various frameworks like Angular, React, Svelte, and Solid.js.

## 🚀 Features

- **Easy to Use**: Simple API for integrating animated emojis.
- **Framework Agnostic**: Works with Angular, React, Svelte, and plain HTML.
- **Customizable**: Adjust emoji size and animation duration.

## Demo
[snip🎥.mp4](./snip🎥.mp4)

## 📦 Installation

### Prerequisites

Ensure you have `Node.js` and `npm` installed.

### Clone the Repository

```bash
git clone https://github.com/yourusername/emoji-animator.git
cd emoji-animator/web-component
```

### Install Dependencies

```bash
npm install
```

### Build the Library

```bash
npm run build
```

## 🎉 Usage

After building, include the generated script in your project. You can serve it via jsDelivr or GitHub Pages.

### Importing the Web Component

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/yourusername/emoji-animator/web-component/dist/emoji-animator.es.js"></script>
```

### Using in Different Frameworks

#### Angular

1. **Include the Web Component Script**:

   Add the Web Component script to `angular.json`:

   ```json
   "scripts": [
     "https://cdn.jsdelivr.net/gh/yourusername/emoji-animator/web-component/dist/emoji-animator.es.js"
   ]
   ```

2. **Use the Web Component**:

   ```html
   <emoji-animator emojis='["😀", "😂", "😅", "🤣"]' size="3em" duration="4000"></emoji-animator>
   ```

#### React

1. **Include the Web Component Script**:

   Add the Web Component script to your `index.html`:

   ```html
   <script type="module" src="https://cdn.jsdelivr.net/gh/yourusername/emoji-animator/web-component/dist/emoji-animator.es.js"></script>
   ```

2. **Use the Web Component**:

   ```jsx
   import React, { useEffect, useRef } from 'react';

   function App() {
     const emojiAnimatorRef = useRef(null);

     useEffect(() => {
       const emojiAnimator = emojiAnimatorRef.current;
       emojiAnimator.addEventListener('animationend', onAnimationEnd);

       return () => {
         emojiAnimator.removeEventListener('animationend', onAnimationEnd);
       };
     }, []);

     const onAnimationEnd = () => {
       console.log('Animation ended');
     };

     return (
       <div>
         <h1>Emoji Animator</h1>
         <emoji-animator
           ref={emojiAnimatorRef}
           emojis='["😀", "😂", "😅", "🤣"]'
           size="3em"
           duration="4000"
         ></emoji-animator>
       </div>
     );
   }

   export default App;
   ```

#### Svelte

1. **Include the Web Component Script**:

   Add the Web Component script to your `public/index.html`:

   ```html
   <script type="module" src="https://cdn.jsdelivr.net/gh/yourusername/emoji-animator/web-component/dist/emoji-animator.es.js"></script>
   ```

2. **Use the Web Component**:

   ```svelte
   <script>
     import { onMount } from 'svelte';

     let emojiAnimator;

     onMount(() => {
       emojiAnimator.addEventListener('animationend', onAnimationEnd);
     });

     function onAnimationEnd() {
       console.log('Animation ended');
     }
   </script>

   <h1>Emoji Animator</h1>
   <emoji-animator
     bind:this={emojiAnimator}
     emojis='["😀", "😂", "😅", "🤣"]'
     size="3em"
     duration="4000"
   ></emoji-animator>
   ```

### Plain HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emoji Animator</title>
  <script type="module" src="https://cdn.jsdelivr.net/gh/yourusername/emoji-animator/web-component/dist/emoji-animator.es.js"></script>
</head>
<body>
  <emoji-animator emojis='["😀", "😂", "😅", "🤣"]' size="3em" duration="4000"></emoji-animator>
</body>
</html>
```

## 🛠️ Customization

You can customize the `emoji-animator` component using the following properties:

- `emojis`: Array of emojis to animate.
- `size`: Font size of the emojis.
- `duration`: Duration of the animation in milliseconds.

## 📖 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## 🙌 Acknowledgements

Thank you to everyone who has contributed to this project. Your support is greatly appreciated!

---

Feel free to replace `yourusername` with your actual GitHub username or the appropriate URL if you're hosting the component elsewhere.
