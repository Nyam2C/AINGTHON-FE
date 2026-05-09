import type { Field } from '../../types/profile';
import { FIELD_LABELS } from '../../utils/profileLabels';

type FieldChipsSectionProps = {
  label: string;
  value: Field[];
  onChange: (next: Field[]) => void;
  options: ReadonlyArray<Field>;
  max?: number;
};

/**
 * Field[] 토글 칩.
 */
export function FieldChipsSection({
  label,
  value,
  onChange,
  options,
  max = 3,
}: FieldChipsSectionProps) {
  const handleToggle = (field: Field) => {
    if (value.includes(field)) {
      onChange(value.filter(v => v !== field));
      return;
    }
    if (value.length >= max) return;
    onChange([...value, field]);
  };

  return (
    <div>
      <span className="block font-bold text-[16px] text-black mb-[8px]">
        {label}
      </span>
      <div className="flex flex-wrap gap-[8px]">
        {options.map(opt => {
          const selected = value.includes(opt);
          const colorClass = selected
            ? 'bg-[#D8E6FF] text-blue-600 border-blue-500'
            : 'bg-white text-[#8E8E8E] border-[#E6EBF3]';
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={selected}
              onClick={() => handleToggle(opt)}
              className={`rounded-full border px-[14px] py-[8px] text-[14px] ${colorClass}`}
            >
              {FIELD_LABELS[opt]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
