import { useState } from 'react';

type TechStackInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  max?: number;
  className?: string;
};

export function TechStackInput({
  value,
  onChange,
  max = 10,
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

  return (
    <div className={className}>
      <label className="block font-bold text-[16px] text-black mb-[8px]">
        기술 스택
      </label>
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
          placeholder="예: React, TypeScript"
          className="flex-1 bg-white border border-[#E6EBF3] rounded-[8px] px-[14px] py-[12px] text-[14px] placeholder:text-[#8E8E8E] focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="h-[46px] px-[16px] rounded-[8px] bg-blue-500 text-white text-[14px] font-medium"
        >
          추가
        </button>
      </div>
      {value.length > 0 && (
        <div className="mt-[12px] flex flex-wrap gap-[8px]">
          {value.map(tech => (
            <span
              key={tech}
              className="bg-[#D8E6FF] text-blue-600 rounded-full px-[14px] py-[8px] text-[14px] flex items-center gap-[6px]"
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
  );
}
