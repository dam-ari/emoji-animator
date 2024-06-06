
# Emoji Animator Web Component

A reusable Web Component for animating emojis in various frameworks, including Angular, React, and Svelte.

## Installation

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

## Usage

After building the library, you can use the generated Web Component in different frameworks.

### Importing the Web Component

To use the Web Component, include the generated script in your project. The script is located in the `dist` directory.

```html
<script type="module" src="path/to/emoji-animator.es.js"></script>
```

### Using in Different Frameworks

#### Using in Angular

1. **Include the Web Component Script**:

   Add the Web Component script to `angular.json`:

   ```json
   "scripts": [
     "path/to/emoji-animator/dist/emoji-animator.es.js"
   ]
   ```

2. **Use the Web Component in Your Angular Component**:

   ```html
   <!-- app.component.html -->
   <emoji-animator emojis='["😀", "😂", "😅", "🤣"]' size="3em" duration="4000"></emoji-animator>
   ```

3. **If you need to handle the animation end event, add an event listener in the Angular component**:

   ```typescript
   // app.component.ts
   import { Component, AfterViewInit } from '@angular/core';

   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css']
   })
   export class AppComponent implements AfterViewInit {
     ngAfterViewInit() {
       const emojiAnimator = document.querySelector('emoji-animator');
       emojiAnimator.addEventListener('animationend', this.onAnimationEnd);
     }

     onAnimationEnd() {
       console.log('Animation ended');
     }
   }
   ```

#### Using in React

1. **Include the Web Component Script**:

   Add the Web Component script to your `index.html` or import it in your `index.js`:

   ```html
   <!-- public/index.html -->
   <script type="module" src="/path/to/emoji-animator/dist/emoji-animator.es.js"></script>
   ```

2. **Use the Web Component in Your React Component**:

   ```jsx
   // App.js
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

#### Using in Svelte

1. **Include the Web Component Script**:

   Add the Web Component script to your `public/index.html`:

   ```html
   <!-- public/index.html -->
   <script type="module" src="/path/to/emoji-animator/dist/emoji-animator.es.js"></script>
   ```

2. **Use the Web Component in Your Svelte Component**:

   ```svelte
   <!-- App.svelte -->
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

### Customization

The `emoji-animator` Web Component accepts the following properties:

- `emojis`: An array of emojis to animate.
- `size`: The font size of the emojis (e.g., `"2em"`).
- `duration`: The total duration of the animation in milliseconds.
- `onAnimationEnd`: An optional callback function to handle the end of the animation.

Example usage:

```html
<emoji-animator emojis='["😀", "😂", "😅", "🤣"]' size="3em" duration="4000"></emoji-animator>
```

## Development

For development, you can run the following commands:

### Start the Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## License

This project is licensed under the MIT License.

---

This `README.md` provides detailed instructions on how to build, use, and customize the `emoji-animator` Web Component across different frameworks.