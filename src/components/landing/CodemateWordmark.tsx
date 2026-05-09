type CodemateWordmarkProps = {
  className?: string;
};

export function CodemateWordmark({ className }: CodemateWordmarkProps) {
  const baseClass =
    'font-inter font-extrabold text-[32px] leading-[39px] tracking-tight';
  const merged = className ? `${baseClass} ${className}` : baseClass;
  return <span className={merged}>CODEMATE</span>;
}
