'use client';

import {
 Clock,
 Copy,
 Download,
 FileVideo,
 Loader2,
 Upload,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';

import { useToast } from '@/hooks/use-toast';
import { useTranscriber } from '@/hooks/useTranscriber';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TranscriptionResult {
 text: string;
 chunks: Array<{
   text: string;
   timestamp: [number, number | null];
 }>;
}

export default function TranscribeComponent() {
 const [selectedFile, setSelectedFile] = useState<File | null>(null);
 const [isProcessing, setIsProcessing] = useState(false);
 const [transcriptionResult, setTranscriptionResult] =
   useState<TranscriptionResult | null>(null);
 const [fileName, setFileName] = useState<string>('');
 const [viewMode, setViewMode] = useState<'text' | 'timestamps'>('text');
 const [editableText, setEditableText] = useState<string>('');
 const [editableChunks, setEditableChunks] = useState<
   Array<{
     text: string;
     timestamp: [number, number | null];
   }>
 >([]);
 const { toast } = useToast();

 const transcriber = useTranscriber();

 const handleFileSelect = useCallback(
   (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
     if (file) {
       // Check if it's a video file
       if (!file.type.startsWith('video/')) {
         toast({
           title: 'Invalid file type',
           description: 'Please select a video file (MP4, WebM, etc.)',
           variant: 'destructive',
         });
         return;
       }

       setSelectedFile(file);
       setFileName(file.name);
       setTranscriptionResult(null);
     }
   },
   [toast],
 );

 const handleSubmit = useCallback(async () => {
   if (!selectedFile) {
     toast({
       title: 'No file selected',
       description: 'Please select a video file first',
       variant: 'destructive',
     });
     return;
   }

   setIsProcessing(true);

   try {
     // Process the selected file directly
     const reader = new FileReader();
     reader.onload = async (e) => {
       const arrayBuffer = e.target?.result as ArrayBuffer;
       if (!arrayBuffer) {
         toast({
           title: 'Error',
           description: 'Failed to read file',
           variant: 'destructive',
         });
         setIsProcessing(false);
         return;
       }

       try {
         // Create audio context and decode the audio from video
         const audioContext = new AudioContext({ sampleRate: 16000 });
         const decoded = await audioContext.decodeAudioData(arrayBuffer);

         // Start transcription using the transcriber
         transcriber.start(decoded);

         toast({
           title: 'Transcription started',
           description: 'Processing your video file...',
         });
       } catch (error) {
         toast({
           title: 'Error',
           description: 'Failed to process video file',
           variant: 'destructive',
         });
         setIsProcessing(false);
       }
     };

     reader.readAsArrayBuffer(selectedFile);
   } catch (error) {
     toast({
       title: 'Error',
       description: 'Failed to process video file',
       variant: 'destructive',
     });
     setIsProcessing(false);
   }
 }, [selectedFile, transcriber, toast]);

 const handleDownloadTranscription = useCallback(() => {
   if (!transcriptionResult) return;

   const content = transcriptionResult.text;
   const blob = new Blob([content], { type: 'text/plain' });
   const url = URL.createObjectURL(blob);
   const a = document.createElement('a');
   a.href = url;
   a.download = `${fileName.replace(/\.[^/.]+$/, '')}_transcription.txt`;
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
   URL.revokeObjectURL(url);

   toast({
     title: 'Downloaded',
     description: 'Transcription saved to your device',
   });
 }, [transcriptionResult, fileName, toast]);

 const handleCopyTranscription = useCallback(async () => {
   const textToCopy = editableText || transcriptionResult?.text || '';
   if (!textToCopy) return;

   try {
     await navigator.clipboard.writeText(textToCopy);
     toast({
       title: 'Copied',
       description: 'Transcription copied to clipboard',
     });
   } catch (error) {
     toast({
       title: 'Error',
       description: 'Failed to copy to clipboard',
       variant: 'destructive',
     });
   }
 }, [editableText, transcriptionResult, toast]);

 const handleTextChange = useCallback((newText: string) => {
   setEditableText(newText);
 }, []);

 const handleChunkChange = useCallback((index: number, newText: string) => {
   setEditableChunks((prev) =>
     prev.map((chunk, i) =>
       i === index ? { ...chunk, text: newText } : chunk,
     ),
   );
 }, []);

 const handleTimestampChange = useCallback(
   (index: number, startTime: number, endTime: number | null) => {
     setEditableChunks((prev) =>
       prev.map((chunk, i) =>
         i === index ? { ...chunk, timestamp: [startTime, endTime] } : chunk,
       ),
     );
   },
   [],
 );

 const handleCopyToClipboard = useCallback(async () => {
   try {
     const localStorageData = localStorage.getItem('transcriptionData');
     if (localStorageData) {
       const parsedData = JSON.parse(localStorageData);
       const resultOnly = parsedData.result;
       await navigator.clipboard.writeText(
         JSON.stringify(resultOnly, null, 2),
       );
       toast({
         title: 'Copied!',
         description: 'Transcription result copied to clipboard',
       });
     } else {
       toast({
         title: 'No data',
         description: 'No transcription data found in localStorage',
         variant: 'destructive',
       });
     }
   } catch (error) {
     toast({
       title: 'Copy failed',
       description: 'Failed to copy data to clipboard',
       variant: 'destructive',
     });
   }
 }, [toast]);

 // Update transcription result when transcriber output changes
 useEffect(() => {
   if (
     transcriber.output &&
     transcriber.output.chunks &&
     transcriber.output.chunks.length > 0
   ) {
     const result = {
       text: transcriber.output.text || '',
       chunks: transcriber.output.chunks,
     };
     setTranscriptionResult(result);
     setEditableText(transcriber.output.text || '');
     setEditableChunks(transcriber.output.chunks || []);
     setIsProcessing(false);

     // Save to localStorage
     try {
       localStorage.setItem(
         'transcriptionData',
         JSON.stringify({
           fileName,
           timestamp: new Date().toISOString(),
           result,
         }),
       );
       toast({
         title: 'Saved',
         description: 'Transcription saved to local storage',
       });
     } catch (error) {
       // Failed to save to localStorage
     }
   }
 }, [transcriber.output, fileName, toast]);

 // Handle transcription completion
 useEffect(() => {
   if (!transcriber.isBusy && transcriptionResult && isProcessing) {
     setIsProcessing(false);
   }
 }, [transcriber.isBusy, transcriptionResult, isProcessing]);

 // Auto-save edited content to localStorage
 useEffect(() => {
   if (
     transcriptionResult &&
     (editableText !== transcriptionResult.text ||
       JSON.stringify(editableChunks) !==
         JSON.stringify(transcriptionResult.chunks))
   ) {
     try {
       const updatedResult = {
         text: editableText || transcriptionResult.text,
         chunks:
           editableChunks.length > 0
             ? editableChunks
             : transcriptionResult.chunks,
       };

       localStorage.setItem(
         'transcriptionData',
         JSON.stringify({
           fileName,
           timestamp: new Date().toISOString(),
           result: updatedResult,
         }),
       );
     } catch (error) {
       // Failed to save edited content to localStorage
     }
   }
 }, [editableText, editableChunks, transcriptionResult, fileName]);

 // Auto-scroll to new content
 useEffect(() => {
   if (transcriptionResult) {
     // Scroll to bottom of content area like ChatGPT
     const contentArea = document.querySelector('.overflow-y-auto');
     if (contentArea) {
       contentArea.scrollTop = contentArea.scrollHeight;
     }
   }
 }, [transcriptionResult]);

 useEffect(() => {
   if (transcriber.isBusy || transcriber.isModelLoading) {
     // Scroll to bottom of content area like ChatGPT
     const contentArea = document.querySelector('.overflow-y-auto');
     if (contentArea) {
       contentArea.scrollTop = contentArea.scrollHeight;
     }
   }
 }, [transcriber.isBusy, transcriber.isModelLoading]);

 return (
   <div className="flex max-h-[80vh] flex-col bg-background">
     {/* Header */}
     <div className="border-b bg-background px-4 py-3">
       <h1 className="text-lg font-semibold">Video Transcription</h1>
       <p className="text-sm text-muted-foreground">
         Upload video files to generate transcriptions using AI
       </p>
     </div>

     {/* Simple Content Area */}
     <div className="flex-1 overflow-y-auto px-4 py-6">
       <div className="mx-auto max-w-4xl space-y-6">
         {/* Transcription Result - No Box */}
         {transcriptionResult && (
           <div className="space-y-4">
             {/* Text View */}
             {viewMode === 'text' && (
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-sm font-medium">Transcription</span>
                 </div>
                 <div className="font-mono text-sm leading-relaxed">
                   {editableText}
                 </div>
               </div>
             )}

             {/* Timestamps View */}
             {viewMode === 'timestamps' && editableChunks.length > 0 && (
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-sm font-medium">Timestamps</span>
                 </div>
                 <div className="space-y-3">
                   {editableChunks.map((chunk, index) => (
                     <div
                       key={index}
                       className="flex flex-col gap-3 sm:flex-row sm:items-start"
                     >
                       <div className="flex min-w-[120px] flex-col gap-2">
                         <Input
                           type="number"
                           step="0.1"
                           value={chunk.timestamp[0]?.toFixed(1) || '0'}
                           onChange={(e) =>
                             handleTimestampChange(
                               index,
                               parseFloat(e.target.value) || 0,
                               chunk.timestamp[1],
                             )
                           }
                           className="w-full text-xs sm:w-20"
                           placeholder="Start"
                         />
                         <Input
                           type="number"
                           step="0.1"
                           value={chunk.timestamp[1]?.toFixed(1) || '0'}
                           onChange={(e) =>
                             handleTimestampChange(
                               index,
                               chunk.timestamp[0],
                               parseFloat(e.target.value) || 0,
                             )
                           }
                           className="w-full text-xs sm:w-20"
                           placeholder="End"
                         />
                       </div>
                       <div className="flex-1 font-mono text-sm">
                         {chunk.text}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
             )}
           </div>
         )}

         {/* Processing Status */}
         {(transcriber.isModelLoading || transcriber.isBusy) && (
           <div className="space-y-3">
             <div className="flex items-center gap-3">
               <Loader2 className="h-5 w-5 animate-spin text-primary" />
               <span className="text-sm">
                 {transcriber.isModelLoading
                   ? 'Loading AI model...'
                   : 'Generating transcription...'}
               </span>
             </div>

             {transcriber.progressItems.length > 0 && (
               <div className="space-y-2">
                 {transcriber.progressItems.map((item, index) => (
                   <div key={index} className="space-y-1">
                     <div className="flex justify-between text-xs">
                       <span>{item.file}</span>
                       <span>{Math.round(item.progress * 100)}%</span>
                     </div>
                     <div className="h-2 w-full rounded-full bg-muted">
                       <div
                         className="h-2 rounded-full bg-primary transition-all duration-300"
                         style={{ width: `${item.progress * 100}%` }}
                       />
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>
         )}
       </div>
     </div>

     {/* Simple Video Upload at Bottom with All Action Buttons Together */}
     <div className="border-t bg-background p-4">
       <div className="mx-auto max-w-4xl">
         <div className="space-y-4">
           <div className="text-center">
             <h3 className="text-lg font-medium">Upload Video File</h3>
             <p className="text-sm text-muted-foreground mt-1">
               Select a video file to transcribe
             </p>
           </div>
           
           <div className="flex gap-3">
             <Input
               id="video-upload-main"
               type="file"
               accept="video/*"
               onChange={handleFileSelect}
               className="flex-1 cursor-pointer"
             />
             <Button
               onClick={handleSubmit}
               disabled={!selectedFile || isProcessing || transcriber.isBusy}
               className="px-6"
             >
               {isProcessing || transcriber.isBusy ? (
                 <>
                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   {isProcessing ? 'Processing...' : 'Transcribing...'}
                 </>
               ) : (
                 'Transcribe'
               )}
             </Button>
             
             {/* Toggle Button Beside Transcribe Button */}
             {transcriptionResult && (
               <Button
                 variant="outline"
                 onClick={() => setViewMode(viewMode === 'text' ? 'timestamps' : 'text')}
                 title={`Switch to ${viewMode === 'text' ? 'Timestamps' : 'Text'} view`}
               >
                 {viewMode === 'text' ? (
                   <>
                     <Clock className="mr-2 h-4 w-4" />
                     Timestamps
                   </>
                 ) : (
                   <>
                     <FileVideo className="mr-2 h-4 w-4" />
                     Text
                   </>
                 )}
               </Button>
             )}
             
             {/* Copy Button - Only show when transcription exists */}
             {transcriptionResult && (
               <Button
                 variant="outline"
                 onClick={handleCopyTranscription}
                 title="Copy transcription text"
               >
                 <Copy className="mr-2 h-4 w-4" />
                 Copy
               </Button>
             )}
             
             {/* Copy JSON Button - Only show when in timestamps view */}
             {transcriptionResult && viewMode === 'timestamps' && (
               <Button
                 variant="outline"
                 onClick={handleCopyToClipboard}
                 title="Copy timestamps as JSON"
               >
                 <Copy className="mr-2 h-4 w-4" />
                 Copy JSON
               </Button>
             )}
           </div>

           {selectedFile && (
             <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
               <FileVideo className="h-4 w-4" />
               <span>{fileName}</span>
             </div>
           )}
         </div>
       </div>
     </div>
   </div>
 );
}



