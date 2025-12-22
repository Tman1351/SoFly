"use client";

import { ReactNode } from "react";
import { TextAnimate } from "@/components/ui/text-animate";

interface SectionHeaderProps {
  title: string | ReactNode;
  description?: string | ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  centered?: boolean;
  withBorder?: boolean;
  animateTitle?: boolean;
  animateDescription?: boolean;
}

export default function SectionHeader({
  title,
  description,
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  centered = true,
  withBorder = false,
  animateTitle = true,
  animateDescription = true,
}: SectionHeaderProps) {
  const titleElement = typeof title === "string" && withBorder ? (
    <span className="block max-w-md mx-auto border-b border-gray-200 pb-4">
      {title}
    </span>
  ) : typeof title === "string" && animateTitle ? (
    <TextAnimate
      as="span"
      by="word"
      animation="slideUp"
      delay={0.1}
      duration={0.4}
      startOnView={true}
      once={true}
    >
      {title}
    </TextAnimate>
  ) : (
    title
  );

  return (
    <div className={`${centered ? "text-center" : ""} mb-12 sm:mb-16 ${className}`}>
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${titleClassName}`}>
        {titleElement}
      </h2>
      {description && (
        typeof description === "string" && animateDescription ? (
          <TextAnimate
            as="p"
            className={`text-lg sm:text-xl text-gray-600 ${centered ? "max-w-2xl mx-auto" : ""} ${descriptionClassName}`}
            by="word"
            animation="fadeIn"
            delay={0.3}
            duration={0.4}
            startOnView={true}
            once={true}
          >
            {description}
          </TextAnimate>
        ) : (
          <p className={`text-lg sm:text-xl text-gray-600 ${centered ? "max-w-2xl mx-auto" : ""} ${descriptionClassName}`}>
            {description}
          </p>
        )
      )}
    </div>
  );
}

