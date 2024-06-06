import { createEffect, createSignal } from "solid-js";
import "./EmojiAnimator.css";

export type EmojiArray = {
  name?: string;
  description?: string;
  emojis: string[];
  size: string;
  duration: number;
  onAnimationEnd?: () => void;
};

const EmojiAnimator = (props: EmojiArray) => {
  const { emojis, duration, onAnimationEnd, size = "2em" } = props;
  const emojiCount = emojis.length;
  const defaultDuration = emojiCount * 500; // 0.5 second per emoji if duration is not provided
  const animationDuration = duration || defaultDuration;

  const [currentEmoji, setCurrentEmoji] = createSignal(emojis[0]);

  // Effect to handle the emoji animation
  createEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emojis.length;
      setCurrentEmoji(emojis[currentIndex]);

      if (currentIndex === emojis.length - 1 && onAnimationEnd) {
        onAnimationEnd();
      }
    }, animationDuration / emojis.length);

    return () => clearInterval(interval);
  });

  // Effect to update the current emoji when the emojis prop changes
  createEffect(() => {
    setCurrentEmoji(emojis[0]);
  });

  return (
    <div class="emoji-animator" style={{ "font-size": size }}>
      <span>{currentEmoji()}</span>
    </div>
  );
};

export default EmojiAnimator;
