type CodemateLogoProps = {
  /** 컨테이너 px width. 기본 142 */
  width?: number;
  /** 컨테이너 px height. 기본 139 */
  height?: number;
  /** 추가 클래스 (애니메이션 클래스 주입용) */
  className?: string;
};

export function CodemateLogo({
  width = 142,
  height = 139,
  className,
}: CodemateLogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 142 139"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CODEMATE 로고"
      className={className}
    >
      {/* 좌측 머리 */}
      <circle cx="36" cy="22" r="22" />
      {/* 우측 머리 */}
      <circle cx="106" cy="22" r="22" />
      {/* M자 본체: 양쪽에서 안쪽으로 모이며 손을 잡은 형태.
          좌우 다리 + 가운데 V형 결합부로 구성. */}
      <path
        d="
          M 14 56
          C 14 50, 22 48, 30 48
          L 42 48
          C 50 48, 58 52, 64 60
          L 71 72
          L 78 60
          C 84 52, 92 48, 100 48
          L 112 48
          C 120 48, 128 50, 128 56
          L 128 130
          C 128 135, 124 139, 119 139
          L 99 139
          C 94 139, 90 135, 90 130
          L 90 96
          L 82 110
          C 80 113, 76 115, 71 115
          C 66 115, 62 113, 60 110
          L 52 96
          L 52 130
          C 52 135, 48 139, 43 139
          L 23 139
          C 18 139, 14 135, 14 130
          Z
        "
      />
    </svg>
  );
}
