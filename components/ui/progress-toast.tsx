import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { HiOutlineClock, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

interface ProgressToastProps {
  fileName: string;
  progress: number;
  status: string;
  eta?: string;
  isComplete?: boolean;
  isError?: boolean;
  onClose?: () => void;
}

export function ProgressToast({
  fileName,
  progress,
  status,
  eta,
  isComplete = false,
  isError = false,
  onClose
}: ProgressToastProps) {
  const getStatusVariant = () => {
    if (isError) return 'destructive';
    if (isComplete) return 'default';
    return 'secondary';
  };

  const getStatusIcon = () => {
    if (isError) return <HiOutlineXCircle className="h-4 w-4" />;
    if (isComplete) return <HiOutlineCheckCircle className="h-4 w-4" />;
    return <HiOutlineClock className="h-4 w-4" />;
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-background border rounded-lg shadow-lg p-4 z-50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">Converting File</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <HiOutlineXCircle className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* File Name */}
      <div className="mb-3">
        <p className="text-sm text-muted-foreground truncate" title={fileName}>
          {fileName}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <Badge variant={getStatusVariant()} className="text-xs">
          {status}
        </Badge>
        {eta && !isComplete && !isError && (
          <span className="text-xs text-muted-foreground">ETA: {eta}</span>
        )}
      </div>

      {/* Progress Steps */}
      {!isComplete && !isError && (
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${progress >= 10 ? 'bg-primary' : 'bg-muted'}`} />
            <span className={progress >= 10 ? 'text-primary' : 'text-muted-foreground'}>
              Input file loaded
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${progress >= 15 ? 'bg-primary' : 'bg-muted'}`} />
            <span className={progress >= 15 ? 'text-primary' : 'text-muted-foreground'}>
              Converting
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${progress >= 95 ? 'bg-primary' : 'bg-muted'}`} />
            <span className={progress >= 95 ? 'text-primary' : 'text-muted-foreground'}>
              Finalizing
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
