"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";

/**
 * Word-by-word staggered reveal for editorial headlines - matches the
 * Capsules "premium editorial" text-reveal feel. Each word rises and fades
 * in on a soft ease as the block scrolls into view.
 *
 * Use "\n" in `text` to force a line break.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  once = true,
}: {
  text: string;
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
}) {
  const lines = text.split("\n");
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, li) => {
        const words = line.split(" ");
        return (
          <span key={li} className="block" aria-hidden>
            {words.map((word, wi) => (
              <Fragment key={wi}>
                <span className="inline-flex overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em]">
                  <motion.span
                    className="inline-block"
                    variants={{
                      hidden: { y: "115%" },
                      visible: {
                        y: 0,
                        transition: {
                          duration: 0.75,
                          ease: [0.16, 1, 0.3, 1],
                        },
                      },
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
                {wi < words.length - 1 ? " " : ""}
              </Fragment>
            ))}
          </span>
        );
      })}
    </MotionTag>
  );
}
