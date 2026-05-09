import { useState } from 'react';

type TechStackInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
  error?: string;
  className?: string;
};

export function TechStackInput({
  value,
  onChange,
  max = 10,
  error,
  className,
}: TechStackInputProps) {
  const [draft, setDraft] = useState('');

  const handleAdd = () => {
    const trimmed = draft.trim();
    if (trimmed === '') return;
    if (value.includes(trimmed)) return;
    if (value.length >= max) return;
    onChange([...value, trimmed]);
    setDraft('');
  };

  const handleRemove = (target: string) => {
    onChange(value.filter(v => v !== target));
  };

  const borderClass = error
    ? 'border-red-500 focus:border-red-500'
    : 'border-[#94A3B8] focus:border-blue-500';

  return (
    <div className={className}>
      <label className="block font-bold text-[16px] text-black">
        기술 스택
      </label>
      <p className="mt-[4px] mb-[8px] text-[14px] text-[#8E8E8E]">
        직접 입력해서 추가하세요.
      </p>
      <div className="flex gap-[8px]">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="예) React, Spring, Boot, Python 등"
          aria-invalid={Boolean(error)}
          className={`flex-1 bg-white border ${borderClass} rounded-[6px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none`}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="h-[46px] px-[16px] rounded-[6px] bg-blue-500 text-white text-[14px] font-medium"
        >
          추가
        </button>
      </div>

      <div className="mt-[12px] rounded-[12px] bg-[#EEF3FB] p-[16px] min-h-[80px]">
        {value.length === 0 ? (
          <div className="flex items-start gap-[12px]">
            <span className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[6px] border border-[#94A3B8] text-[16px] leading-none text-[#94A3B8]">
              +
            </span>
            <p className="text-[14px] leading-[20px] text-[#8E8E8E]">
              추가된 기술 스택이 여기에 표시됩니다.
              <br />
              최대 {max}개까지 추가 가능
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-[8px]">
            {value.map(tech => (
              <span
                key={tech}
                className="flex items-center gap-[6px] rounded-[10px] bg-white px-[12px] py-[6px] text-[14px] text-blue-600 border border-blue-200"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemove(tech)}
                  aria-label={`${tech} 삭제`}
                  className="leading-none"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {error && <p className="mt-[6px] text-[12px] text-red-500">{error}</p>}
    </div>
  );
}
