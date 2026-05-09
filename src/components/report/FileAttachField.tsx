import { useRef, type ChangeEvent } from 'react';

import { PaperclipIcon } from '../common/icons/PaperclipIcon';

type FileAttachFieldProps = {
  files: File[];
  onAdd: (files: File[]) => void;
  onRemove: (index: number) => void;
  className?: string;
};

export function FileAttachField({
  files,
  onAdd,
  onRemove,
  className,
}: FileAttachFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    if (selected.length > 0) onAdd(selected);
    e.target.value = '';
  };

  return (
    <div className={`flex flex-col gap-[8px] w-[321px] ${className ?? ''}`}>
      <div className="flex items-baseline justify-between">
        <label className="text-[16px] font-medium text-black">
          첨부 파일 (선택)
        </label>
        <span className="text-[15px] text-[#8E8E8E]">
          이미지, 문서, 링크 첨부 가능
        </span>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="w-[144px] h-[46px] rounded-[9px] border border-blue-500 text-blue-500 flex items-center justify-center gap-[6px] text-[16px]"
      >
        <PaperclipIcon size={24} className="text-blue-500" />
        파일 첨부
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={handleChange}
        aria-label="파일 선택"
      />
      {files.length > 0 && (
        <ul className="flex flex-col gap-[6px]">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between bg-[#F2F4F7] rounded-[8px] px-[12px] py-[8px]"
            >
              <span className="text-[14px] text-black truncate">{f.name}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                aria-label={`${f.name} 삭제`}
                className="text-[#8E8E8E] text-[16px]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
