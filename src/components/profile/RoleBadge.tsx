type RoleBadgeProps = {
  role: 'mentor' | 'mentee' | null;
};

/**
 * 캡처의 'M 멘토' 배지.
 * role === null일 때 컴포넌트 자체를 null 반환 (렌더 안 함).
 */
export function RoleBadge({ role }: RoleBadgeProps) {
  if (role === null) return null;

  const isMentor = role === 'mentor';
  const labelText = isMentor ? '멘토' : '멘티';
  const colorClass = isMentor
    ? 'bg-[#D8E6FF] text-blue-600'
    : 'bg-[#F2F4F7] text-[#8E8E8E]';

  return (
    <span
      className={`inline-flex items-center gap-[6px] rounded-full px-[10px] py-[4px] text-[12px] font-medium ${colorClass}`}
    >
      <span aria-hidden="true">M</span>
      {labelText}
    </span>
  );
}
