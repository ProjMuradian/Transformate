import { useEffect, useRef, useState } from 'react';

export interface MessageEventHandler {
  (event: MessageEvent): void;
}

export function useWorker(
  messageEventHandler: MessageEventHandler,
): Worker | null {
  const [worker, setWorker] = useState<Worker | null>(null);
  const eventHandlerRef = useRef<MessageEventHandler>(messageEventHandler);

  // Update the ref when the event handler changes
  useEffect(() => {
    eventHandlerRef.current = messageEventHandler;
  }, [messageEventHandler]);

  useEffect(() => {
    // Only create worker on client side
    if (typeof window !== 'undefined' && typeof Worker !== 'undefined') {
      const newWorker = createWorker((event) => {
        // Use the current event handler from ref
        eventHandlerRef.current(event);
      });
      setWorker(newWorker);

      // Cleanup on unmount
      return () => {
        if (newWorker) {
          newWorker.terminate();
        }
      };
    }
  }, []); // Empty dependency array - only run once

  return worker;
}

function createWorker(messageEventHandler: MessageEventHandler): Worker {
  const worker = new Worker(new URL('./audioworker.js', import.meta.url), {
    type: 'module',
  });
  // Listen for messages from the Web Worker
  worker.addEventListener('message', messageEventHandler);
  return worker;
}
