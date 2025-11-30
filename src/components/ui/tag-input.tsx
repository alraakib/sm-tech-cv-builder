import { cva, type VariantProps } from "class-variance-authority";
import React, { useCallback, useRef, useState } from "react";

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(" ");

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "border-input",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TagInputProps
  extends Omit<React.ComponentProps<"input">, "size" | "value" | "onChange"> {
  tags: string[];
  setTags: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  variant?: VariantProps<typeof inputVariants>["variant"];
  size?: VariantProps<typeof inputVariants>["size"];
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  setTags,
  placeholder = "Add skills, hit Enter or comma...",
  maxTags = 10,
  variant,
  size,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const value = inputValue.trim();

      if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
        e.preventDefault();
        if (value && tags.length < maxTags && !tags.includes(value)) {
          setTags([...tags, value]);
          setInputValue("");
        }
      } else if (e.key === "Backspace" && !inputValue) {
        if (tags.length > 0) {
          setTags(tags.slice(0, tags.length - 1));
        }
      }
    },
    [inputValue, tags, setTags, maxTags]
  );

  const removeTag = useCallback(
    (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove));
    },
    [tags, setTags]
  );

  const isMaxReached = tags.length >= maxTags;

  const rootClasses = cn(
    "flex flex-wrap items-center gap-2",
    "min-h-9 p-2",
    "rounded-md border border-input shadow-xs",
    "focus-within:border-primary focus-within:ring-primary/50 focus-within:ring-[3px] transition-[border,box-shadow]",
    className
  );

  return (
    <div className={rootClasses} onClick={() => inputRef.current?.focus()}>
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center space-x-1.5 rounded-full bg-neutral-600/10 px-3 py-1 text-sm hover:bg-neutral-600/20"
        >
          <span>{tag}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
            className="ml-1 text-primary/70 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
            aria-label={`Remove tag ${tag}`}
          >
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={isMaxReached ? "Max tags reached" : placeholder}
        className={cn(
          "flex-1 min-w-[80px] bg-transparent text-foreground outline-none border-none shadow-none p-0 h-9",
          "placeholder:text-muted-foreground",
          isMaxReached && "cursor-not-allowed opacity-70"
        )}
        disabled={isMaxReached}
        {...props}
      />
    </div>
  );
};
