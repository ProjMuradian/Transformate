export interface TranscriptionPanelProps {
    realTranscription: TranscriptionSegment[];
    isTranscriptionReady: boolean;
    isClient: boolean;
    isAudioLoading: boolean;
    isTranscribing: boolean;
    error: string | null;
    audioBuffer: AudioBuffer | null;
    currentTime: number;
    onTimeJump: (time: number) => void;
  }
  
  export interface TranscriptionViewProps {
    transcription: TranscriptionSegment[];
    currentTime: number;
    onTimeJump: (time: number) => void;
  }
  
  export interface AudioTranscriberState {
    audioBuffer: AudioBuffer | null;
    isAudioLoading: boolean;
    isTranscribing: boolean;
    transcript: string;
    chunks: { text: string; timestamp: [number, number | null] }[];
    error: string | null;
    isClient: boolean;
  }
  
  export interface AudioTranscriberActions {
    loadExtractedVideo: (videoUrl?: string) => Promise<void>;
    loadCustomFile: () => void;
    startTranscription: () => void;
    clearAudio: () => void;
    clearTranscript: () => void;
    transcriber: Transcriber;
  }
  
  export interface ProgressItem {
    file: string;
    loaded: number;
    progress: number;
    total: number;
    name: string;
    status: string;
  }
  
  export interface TranscriberUpdateData {
    data: [
      string,
      { chunks: { text: string; timestamp: [number, number | null] }[] },
    ];
    text: string;
  }
  
  export interface TranscriberCompleteData {
    data: {
      text: string;
      chunks: { text: string; timestamp: [number, number | null] }[];
    };
  }
  
  export interface TranscriberData {
    isBusy: boolean;
    text: string;
    chunks: { text: string; timestamp: [number, number | null] }[];
  }
  
  export interface Transcriber {
    onInputChange: () => void;
    isBusy: boolean;
    isModelLoading: boolean;
    progressItems: ProgressItem[];
    start: (audioData: AudioBuffer | undefined) => void;
    output?: TranscriberData;
    model: string;
    setModel: (model: string) => void;
    multilingual: boolean;
    setMultilingual: (model: boolean) => void;
    quantized: boolean;
    setQuantized: (model: boolean) => void;
    subtask: string;
    setSubtask: (subtask: string) => void;
    language?: string;
    setLanguage: (language: string) => void;
  }
  
  export interface TranscriptionSegment {
    id: string;
    startTime: number;
    endTime: number;
    text: string;
    speaker?: string;
  }
  
  export interface TranscriptionManagerState {
    realTranscription: TranscriptionSegment[];
    isTranscriptionReady: boolean;
    transcriptionInitiated: boolean;
    isClient: boolean;
    isAudioLoading: boolean;
    isTranscribing: boolean;
    error: string | null;
    audioBuffer: AudioBuffer | null;
  }
  
  export interface TranscriptionManagerActions {
    initiateTranscription: (videoUrl: string, lessonId: string) => void;
    resetTranscription: () => void;
  }
  