import { createEffect, createSignal } from "solid-js";
import "./EmojiAnimator.css";

export type EmojiArray = {
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

  createEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % emojiCount;
      setCurrentEmoji(emojis[currentIndex]);

      if (currentIndex === emojiCount - 1 && onAnimationEnd) {
        onAnimationEnd();
      }
    }, animationDuration / emojiCount);

    return () => clearInterval(interval);
  });

  return (
    <div class="emoji-animator" style={{ "font-size": size }}>
      <span>{currentEmoji()}</span>
    </div>
  );
};

export default EmojiAnimator;
