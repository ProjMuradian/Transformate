import { useCallback, useEffect, useMemo, useState } from 'react';

import { audioData } from '@/constant/audiodata';

import { useWorker } from './useWorker';

import {
  ProgressItem,
  Transcriber,
  TranscriberCompleteData,
  TranscriberData,
  TranscriberUpdateData,
} from '@/types/transcriptionprops';

export function useTranscriber(): Transcriber {
  const [transcript, setTranscript] = useState<TranscriberData | undefined>(
    undefined,
  );
  const [isBusy, setIsBusy] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);

  // Check if we're on client side
  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  // Memoize the event handler to prevent infinite re-renders
  const handleWorkerMessage = useCallback((event: MessageEvent) => {
    const message = event.data;
    // Update the state with the result
    switch (message.status) {
      case 'initiate':
        // Model file start load: add a new progress item to the list.
        setIsModelLoading(true);
        setProgressItems((prev) => [...prev, message]);
        break;
      case 'progress':
        // Model file progress: update one of the progress items.
        setProgressItems((prev) =>
          prev.map((item) => {
            if (item.file === message.file) {
              return { ...item, progress: message.progress };
            }
            return item;
          }),
        );
        break;
      case 'ready':
        setIsModelLoading(false);
        break;
      case 'update':
        // Received partial update
        // console.log("update", message);
        // eslint-disable-next-line no-case-declarations
        const updateMessage = message as TranscriberUpdateData;
        setTranscript({
          isBusy: true,
          text: updateMessage.data[0],
          chunks: updateMessage.data[1].chunks,
        });
        break;
      case 'complete':
        // Received complete transcript
        // console.log("complete", message);
        // eslint-disable-next-line no-case-declarations
        const completeMessage = message as TranscriberCompleteData;
        setTranscript({
          isBusy: false,
          text: completeMessage.data.text,
          chunks: completeMessage.data.chunks,
        });
        setIsBusy(false);
        break;
      case 'error':
        setIsBusy(false);
        alert(
          `${message.data.message} This is most likely because you are using Safari on an M1/M2 Mac. Please try again from Chrome, Firefox, or Edge.\n\nIf this is not the case, please file a bug report.`,
        );
        break;
      case 'done':
        // Model file loaded: remove the progress item from the list.
        setProgressItems((prev) =>
          prev.filter((item) => item.file !== message.file),
        );
        break;
      default:
        // initiate/download/done
        break;
    }
  }, []); // Empty dependency array since we're only using setState functions

  const webWorker = useWorker(handleWorkerMessage);

  const [model, setModel] = useState<string>(audioData.DEFAULT_MODEL);
  const [subtask, setSubtask] = useState<string>(audioData.DEFAULT_SUBTASK);
  const [quantized, setQuantized] = useState<boolean>(
    audioData.DEFAULT_QUANTIZED,
  );
  const [multilingual, setMultilingual] = useState<boolean>(
    audioData.DEFAULT_MULTILINGUAL,
  );
  const [language, setLanguage] = useState<string>(audioData.DEFAULT_LANGUAGE);

  const onInputChange = useCallback(() => {
    setTranscript(undefined);
  }, []);

  const postRequest = useCallback(
    async (audioData: AudioBuffer | undefined) => {
      if (!isClient) {
        // eslint-disable-next-line no-console
        console.warn('Transcription is only available on client side');
        return;
      }

      if (!webWorker) {
        // eslint-disable-next-line no-console
        console.warn('Web Worker not available');
        return;
      }

      if (audioData) {
        setTranscript(undefined);
        setIsBusy(true);

        let audio;
        if (audioData.numberOfChannels === 2) {
          const SCALING_FACTOR = Math.sqrt(2);

          const left = audioData.getChannelData(0);
          const right = audioData.getChannelData(1);

          audio = new Float32Array(left.length);
          for (let i = 0; i < audioData.length; ++i) {
            audio[i] = (SCALING_FACTOR * (left[i] + right[i])) / 2;
          }
        } else {
          // If the audio is not stereo, we can just use the first channel:
          audio = audioData.getChannelData(0);
        }

        webWorker.postMessage({
          audio,
          model,
          multilingual,
          quantized,
          subtask: multilingual ? subtask : null,
          language: multilingual && language !== 'auto' ? language : null,
        });
      }
    },
    [webWorker, model, multilingual, quantized, subtask, language, isClient],
  );

  const transcriber = useMemo(() => {
    return {
      onInputChange,
      isBusy,
      isModelLoading,
      progressItems,
      start: postRequest,
      output: transcript,
      model,
      setModel,
      multilingual,
      setMultilingual,
      quantized,
      setQuantized,
      subtask,
      setSubtask,
      language,
      setLanguage,
    };
  }, [
    onInputChange,
    isBusy,
    isModelLoading,
    progressItems,
    postRequest,
    transcript,
    model,
    multilingual,
    quantized,
    subtask,
    language,
  ]);

  return transcriber;
}
