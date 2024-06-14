import { createEffect, createSignal } from "solid-js";
import "./EmojiAnimator.css";

export type EmojiArray = {
    name?: string;
    description?: string;
    emojis: string[];
    size?: string;
    duration?: number;
    fadeIn?: boolean;
    reverseLoop?: boolean;
    onAnimationEnd?: () => void;
    class?: string;
    style?: Record<string, string>;
};

const EmojiAnimator = (props: EmojiArray) => {
    const { emojis = [], duration = 5000, onAnimationEnd, size = "2em", fadeIn = false, reverseLoop = false, class: className, style } = props;
    const [currentEmoji, setCurrentEmoji] = createSignal(emojis[0] || "");
    const [currentSet, setCurrentSet] = createSignal(emojis);
    const [isFading, setIsFading] = createSignal(false);
    let intervalId: number;

    createEffect(() => {
        clearInterval(intervalId);
        console.log("Initializing EmojiAnimator with emojis:", emojis);
        setCurrentSet(emojis);
        let currentIndex = 0;
        let direction = 1;

        intervalId = setInterval(() => {
            const current = currentSet();
            const len = current.length;
            if (len > 0) {
                currentIndex += direction;

                if (currentIndex === len || currentIndex === -1) {
                    if (reverseLoop) {
                        direction *= -1;
                        currentIndex += direction * 2;
                    } else {
                        currentIndex = 0;
                    }

                    if (currentIndex === len - 1 && onAnimationEnd) {
                        onAnimationEnd();
                    }
                }

                setCurrentEmoji(currentSet()[currentIndex]);
                setIsFading(true);
                setTimeout(() => setIsFading(false), 500);
            }
        }, duration / (currentSet().length || 1));

        setCurrentEmoji(emojis[0] || "");

        return () => clearInterval(intervalId); // Ensure cleanup
    });

    return (
        <div class={`emoji-animator ${className || ''}`} style={{ "font-size": size, ...style }}>
            <span class={fadeIn && isFading() ? "fade-in" : ""}>{currentEmoji()}</span>
        </div>
    );
};

export default EmojiAnimator;
