// imports
import { Action } from '@/types';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

function getFileExtension(file_name: string) {
  const regex = /(?:\.([^.]+))?$/; // Matches the last dot and everything after it
  const match = regex.exec(file_name);
  if (match && match[1]) {
    return match[1];
  }
  return ''; // No file extension found
}

function removeFileExtension(file_name: string) {
  const lastDotIndex = file_name.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return file_name.slice(0, lastDotIndex);
  }
  return file_name; // No file extension found
}

export default async function convert(
  ffmpeg: FFmpeg,
  action: Action,
  onProgress?: (progress: number, status: string, eta?: string) => void,
): Promise<any> {
  const { file, to, file_name, file_type } = action;
  const input = getFileExtension(file_name);
  const output = removeFileExtension(file_name) + '.' + to;
  
  // Write input file
  onProgress?.(0, 'Loading input file...');
  await ffmpeg.writeFile(input, await fetchFile(file));
  onProgress?.(10, 'Input file loaded');

  // FFMEG COMMANDS
  let ffmpeg_cmd: any = [];
  // 3gp video
  if (to === '3gp')
    ffmpeg_cmd = [
      '-i',
      input,
      '-r',
      '20',
      '-s',
      '352x288',
      '-vb',
      '400k',
      '-acodec',
      'aac',
      '-strict',
      'experimental',
      '-ac',
      '1',
      '-ar',
      '8000',
      '-ab',
      '24k',
      output,
    ];
  else ffmpeg_cmd = ['-i', input, output];

  // Set up progress listener
  let lastProgress = 10;
  const progressInterval = setInterval(() => {
    if (lastProgress < 90) {
      lastProgress += Math.random() * 5; // Simulate progress
      onProgress?.(Math.min(lastProgress, 90), 'Converting...');
    }
  }, 500);

  // execute cmd
  onProgress?.(15, 'Starting conversion...');
  await ffmpeg.exec(ffmpeg_cmd);
  
  clearInterval(progressInterval);
  onProgress?.(95, 'Finalizing...');

  // Read output file
  onProgress?.(98, 'Reading output file...');
  const data = (await ffmpeg.readFile(output)) as any;
  const blob = new Blob([data], { type: file_type.split('/')[0] });
  const url = URL.createObjectURL(blob);
  
  onProgress?.(100, 'Conversion complete!');
  return { url, output };
}
