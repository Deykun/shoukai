import { useCallback, useEffect, useRef, useState } from "react";

export default function useOpenWithOutsideClick(initialIsOpen = false) {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  // callback ref, so it fits any element without passing a generic
  const outsideRef = useCallback((element: HTMLElement | null) => {
    elementRef.current = element;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const wasElementInsideClicked = Boolean(
        elementRef.current?.contains(target),
      );
      if (wasElementInsideClicked) {
        return;
      }

      const isInBody = document.body.contains(target);
      if (!isInBody) {
        // Was probably removed by click
        return;
      }

      setIsOpen(false);
    };

    setTimeout(() => document.addEventListener("click", onClick), 0);
    return () => document.removeEventListener("click", onClick);
  }, [isOpen]);

  return { outsideRef, isOpen, setIsOpen };
}
