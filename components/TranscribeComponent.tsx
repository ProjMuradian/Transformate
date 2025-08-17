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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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


 return (
   <div className='container mx-auto max-w-7xl space-y-6 p-4 sm:space-y-8 sm:py-8'>
     <div className='mb-6 sm:mb-8'>
       <h1 className='text-2xl font-bold text-foreground sm:text-3xl'>
         Upload And Get Transcribe
       </h1>
       <p className='mt-2 text-sm text-muted-foreground sm:text-base'>
         Upload video files to generate transcriptions using AI
       </p>
     </div>


     <div className='space-y-6'>
       {/* Upload Section */}
       <Card>
         <CardHeader>
           <CardTitle className='flex items-center gap-2'>
             <Upload className='h-5 w-5' />
             Upload Video File
           </CardTitle>
         </CardHeader>
         <CardContent className='space-y-4'>
           <div className='space-y-2'>
             <Label htmlFor='video-upload'>Select Video File</Label>
             <Input
               id='video-upload'
               type='file'
               accept='video/*'
               onChange={handleFileSelect}
               className='cursor-pointer'
             />
           </div>


           {selectedFile && (
             <div className='flex items-center gap-2 rounded-md bg-muted p-3'>
               <FileVideo className='h-4 w-4 text-blue-600' />
               <span className='text-sm font-medium'>{fileName}</span>
             </div>
           )}


           {/* Toggle Button - Only visible before submit */}
           {selectedFile && !isProcessing && !transcriber.isBusy && (
             <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
               <Label className='text-sm font-medium'>View Mode:</Label>
               <div className='flex rounded-md border'>
                 <Button
                   type='button'
                   variant={viewMode === 'text' ? 'default' : 'outline'}
                   size='sm'
                   onClick={() => setViewMode('text')}
                   className='rounded-r-none border-r-0'
                 >
                   <FileVideo className='mr-2 h-4 w-4' />
                   Text
                 </Button>
                 <Button
                   type='button'
                   variant={viewMode === 'timestamps' ? 'default' : 'outline'}
                   size='sm'
                   onClick={() => setViewMode('timestamps')}
                   className='rounded-l-none'
                 >
                   <Clock className='mr-2 h-4 w-4' />
                   Timestamps
                 </Button>
               </div>
             </div>
           )}


           <Button
             onClick={handleSubmit}
             disabled={!selectedFile || isProcessing || transcriber.isBusy}
             className='w-full'
           >
             {isProcessing || transcriber.isBusy ? (
               <>
                 <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                 {isProcessing ? 'Processing...' : 'Transcribing...'}
               </>
             ) : (
               'Submit for Transcription'
             )}
           </Button>
         </CardContent>
       </Card>


       {/* Status Section */}
       {(transcriber.isModelLoading || transcriber.isBusy) && (
         <Card>
           <CardHeader>
             <CardTitle>Processing Status</CardTitle>
           </CardHeader>
           <CardContent>
             <div className='space-y-3'>
               <div className='flex items-center gap-3'>
                 <Loader2 className='h-5 w-5 animate-spin text-blue-600' />
                 <span className='text-sm'>
                   {transcriber.isModelLoading
                     ? 'Loading AI model...'
                     : 'Generating transcription...'}
                 </span>
               </div>


               {transcriber.progressItems.length > 0 && (
                 <div className='space-y-2'>
                   {transcriber.progressItems.map((item, index) => (
                     <div key={index} className='space-y-1'>
                       <div className='flex justify-between text-xs'>
                         <span>{item.file}</span>
                         <span>{Math.round(item.progress * 100)}%</span>
                       </div>
                       <div className='h-2 w-full rounded-full bg-gray-200'>
                         <div
                           className='h-2 rounded-full bg-blue-600 transition-all duration-300'
                           style={{ width: `${item.progress * 100}%` }}
                         />
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>
           </CardContent>
         </Card>
       )}


       {/* Results Section */}
       {transcriptionResult && (
         <Card>
           <CardHeader>
             <CardTitle className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
               <span>Transcription Result</span>
               <div className='flex flex-wrap gap-2'>
                 <Button
                   variant='outline'
                   size='sm'
                   onClick={handleCopyTranscription}
                   className='w-full sm:w-auto'
                 >
                   <Copy className='mr-2 h-4 w-4' />
                   Copy Text
                 </Button>
                 <Button
                   variant='outline'
                   size='sm'
                   onClick={handleCopyToClipboard}
                   className='w-full sm:w-auto'
                 >
                   <Copy className='mr-2 h-4 w-4' />
                   Copy JSON
                 </Button>
                 <Button
                   variant='outline'
                   size='sm'
                   onClick={handleDownloadTranscription}
                   className='w-full sm:w-auto'
                 >
                   <Download className='mr-2 h-4 w-4' />
                   Download
                 </Button>
               </div>
             </CardTitle>
           </CardHeader>
           <CardContent>
             <div className='space-y-4'>
               {/* View Mode Toggle for Results */}
               <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                 <Label className='text-sm font-medium'>Display Mode:</Label>
                 <div className='flex rounded-md border'>
                   <Button
                     type='button'
                     variant={viewMode === 'text' ? 'default' : 'outline'}
                     size='sm'
                     onClick={() => setViewMode('text')}
                     className='rounded-r-none border-r-0'
                   >
                     <FileVideo className='mr-2 h-4 w-4' />
                     Text
                   </Button>
                   <Button
                     type='button'
                     size='sm'
                     variant={viewMode === 'timestamps' ? 'default' : 'outline'}
                     onClick={() => setViewMode('timestamps')}
                     className='rounded-l-none'
                   >
                     <Clock className='mr-2 h-4 w-4' />
                     Timestamps
                   </Button>
                 </div>
               </div>


               {/* Text View */}
               {viewMode === 'text' && (
                 <div className='space-y-2'>
                   <Label className='text-sm font-medium'>
                     Transcription Text (Editable):
                   </Label>
                   <textarea
                     value={editableText}
                     onChange={(e) => handleTextChange(e.target.value)}
                     className='max-h-96 w-full resize-none rounded-md border bg-muted/50 p-3 font-mono text-sm sm:p-4'
                     rows={15}
                     placeholder='Transcription text will appear here...'
                   />
                 </div>
               )}


               {/* Timestamps View */}
               {viewMode === 'timestamps' && editableChunks.length > 0 && (
                 <div className='space-y-2'>
                   <Label className='text-sm font-medium'>
                     Timestamps (Editable):
                   </Label>
                   <div className='max-h-96 space-y-3 overflow-y-auto'>
                     {editableChunks.map((chunk, index) => (
                       <div
                         key={index}
                         className='flex flex-col gap-3 rounded-md border p-3 sm:flex-row sm:items-start'
                       >
                         <div className='flex min-w-[120px] flex-col gap-2'>
                           <Input
                             type='number'
                             step='0.1'
                             value={chunk.timestamp[0]?.toFixed(1) || '0'}
                             onChange={(e) =>
                               handleTimestampChange(
                                 index,
                                 parseFloat(e.target.value) || 0,
                                 chunk.timestamp[1],
                               )
                             }
                             className='w-full text-xs sm:w-20'
                             placeholder='Start'
                           />
                           <Input
                             type='number'
                             step='0.1'
                             value={chunk.timestamp[1]?.toFixed(1) || '0'}
                             onChange={(e) =>
                               handleTimestampChange(
                                 index,
                                 chunk.timestamp[0],
                                 parseFloat(e.target.value) || 0,
                               )
                             }
                             className='w-full text-xs sm:w-20'
                             placeholder='End'
                           />
                         </div>
                         <textarea
                           value={chunk.text}
                           onChange={(e) =>
                             handleChunkChange(index, e.target.value)
                           }
                           className='flex-1 resize-none rounded-md border bg-muted/50 p-2 text-sm'
                           rows={2}
                           placeholder='Chunk text...'
                         />
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </CardContent>
         </Card>
       )}
     </div>
   </div>
 );
}



