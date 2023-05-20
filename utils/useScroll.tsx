import { RefObject, useEffect } from 'react';

const DEFAULT_BUFFER = 100;

interface UseElementScrollParams<ScrollElement> {
  scrollElementRef: RefObject<ScrollElement>;
  bufferSpace?: number;
  callbackMap: {
    top?: () => void;
    bottom?: () => void;
  };
}

const useElementScroll = <ScrollElement extends HTMLElement>(params: UseElementScrollParams<ScrollElement>) => {
  const { scrollElementRef, bufferSpace = DEFAULT_BUFFER, callbackMap } = params;

  useEffect(() => {
    const element = scrollElementRef.current;
    const handleScroll = (event: Event) => {
      const target = event.target as HTMLElement;
      if (element) {
        // check if visible top is close to element top
        const isCloseToTop = target.scrollTop < bufferSpace;
        if (isCloseToTop) callbackMap.top?.();

        // check if visible bottom is close to element bottom
        const scrollBottom = element.clientHeight + target.scrollTop;
        const isCloseToBottom = element.scrollHeight - scrollBottom < bufferSpace;
        if (isCloseToBottom) callbackMap.bottom?.();
      }
    };
    element?.addEventListener('scroll', handleScroll);
    return () => {
      element?.removeEventListener('scroll', handleScroll);
    };
  }, [bufferSpace, callbackMap, scrollElementRef]);
};

export default useElementScroll;
