import { CodemateLogo } from '../landing/CodemateLogo';

type LoadingAnimationProps = {
  message?: string;
  className?: string;
};

export function LoadingAnimation({
  message = '잠시만 기다려주세요',
  className,
}: LoadingAnimationProps) {
  return (
    <div className={`flex flex-col items-center gap-[16px] ${className ?? ''}`}>
      <CodemateLogo
        width={96}
        height={94}
        className="text-blue-500 motion-safe:animate-pulse-soft motion-reduce:animate-none"
      />
      <div className="flex gap-[6px]" aria-hidden="true">
        <span className="w-[8px] h-[8px] rounded-full bg-blue-500 motion-safe:animate-bounce-dot-0 motion-reduce:animate-none" />
        <span className="w-[8px] h-[8px] rounded-full bg-blue-500 motion-safe:animate-bounce-dot-1 motion-reduce:animate-none" />
        <span className="w-[8px] h-[8px] rounded-full bg-blue-500 motion-safe:animate-bounce-dot-2 motion-reduce:animate-none" />
      </div>
      <p className="font-inter text-[16px] font-medium text-[#8E8E8E]">
        {message}
      </p>
    </div>
  );
}
