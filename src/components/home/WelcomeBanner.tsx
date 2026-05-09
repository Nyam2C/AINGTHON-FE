type WelcomeBannerProps = {
  onSearchClick: () => void;
  className?: string;
};

export function WelcomeBanner({
  onSearchClick,
  className,
}: WelcomeBannerProps) {
  return (
    <section
      className={`w-[321px] h-[138px] bg-blue-500 rounded-[16px] px-[24px] py-[20px] relative ${className ?? ''}`}
    >
      <p className="font-inter text-[20px] font-semibold leading-[28px] text-white">
        오늘도 성장 한 걸음
        <br />
        새로운 연결이
        <br />
        기다리고 있어요.
      </p>
      <button
        type="button"
        onClick={onSearchClick}
        className="absolute right-[16px] bottom-[16px] w-[94px] h-[32px] bg-white rounded-[9px] text-blue-500 text-[15px] font-medium"
      >
        검색하기
      </button>
    </section>
  );
}
