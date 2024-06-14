import { createEffect, createSignal } from "solid-js";
import { customElement } from "solid-element";
import "./EmojiAnimator.css";

export type EmojiArray = {
  emojis: string[];
  size?: string;
  duration?: number;
  fadeIn?: boolean;
  reverseLoop?: boolean;
  class?: string;
  style?: Record<string, string>;
  onAnimationEnd?: () => void;
};

const EmojiAnimator = (props: EmojiArray) => {
  const { emojis, duration, fadeIn = false, reverseLoop = false, class: className, style, onAnimationEnd, size = "2em" } = props;
  const emojiCount = emojis.length;
  const defaultDuration = emojiCount * 500; // 0.5 second per emoji if duration is not provided
  const animationDuration = duration || defaultDuration;

  const [currentEmoji, setCurrentEmoji] = createSignal(emojis[0]);
  const [isFading, setIsFading] = createSignal(false);

  // Effect to handle the emoji animation
  createEffect(() => {
    let currentIndex = 0;
    let direction = 1;

    const interval = setInterval(() => {
      currentIndex += direction;

      if (currentIndex === emojis.length || currentIndex === -1) {
        if (reverseLoop) {
          direction *= -1;
          currentIndex += direction * 2;
        } else {
          currentIndex = 0;
        }

        if (currentIndex === emojis.length - 1 && onAnimationEnd) {
          onAnimationEnd();
        }
      }

      setCurrentEmoji(emojis[currentIndex]);
      setIsFading(true);
      setTimeout(() => setIsFading(false), 500);
    }, animationDuration / emojis.length);

    return () => clearInterval(interval);
  });

  // Effect to update the current emoji when the emojis prop changes
  createEffect(() => {
    setCurrentEmoji(emojis[0]);
  });

  return (
    <div class={`emoji-animator ${className || ''}`} style={{ "font-size": size, ...style }}>
      <span class={fadeIn && isFading() ? "fade-in" : ""}>{currentEmoji()}</span>
    </div>
  );
};

customElement(
  "emoji-animator",
  {
    emojis: [],
    size: "2em",
    duration: 0,
    fadeIn: false,
    reverseLoop: false,
    class: '',
    style: {},
    onAnimationEnd: undefined,
  },
  EmojiAnimator
);

export default EmojiAnimator;
