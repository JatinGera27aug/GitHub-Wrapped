import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  message?: string;
}

export function LoadingSpinner({ className, message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={cn('animate-spin rounded-full h-12 w-12 border-b-2 border-primary', className)} />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}