export function IPhoneHomeIndicator({ className }: { className?: string }) {
  return (
    <div
      className={`flex h-[34px] items-center justify-center ${className ?? ''}`}
      data-testid="iphone-home-indicator"
    >
      <div className="h-[5px] w-[134px] rounded-full bg-current" />
    </div>
  );
}
