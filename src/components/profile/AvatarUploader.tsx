import { useRef } from 'react';

type AvatarUploaderProps = {
  profileImageUrl?: string;
  onChange: (file: File) => void;
  isUploading: boolean;
};

/**
 * 원형 아바타 (96x96) + 클릭 시 숨겨진 file input 트리거.
 * 업로드 중이면 dim + '업로드 중…' 오버레이.
 */
export function AvatarUploader({
  profileImageUrl,
  onChange,
  isUploading,
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (isUploading) return;
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file);
    }
    e.target.value = '';
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        aria-label="프로필 이미지 변경"
        className="relative w-[96px] h-[96px] rounded-full overflow-hidden bg-[#E6EBF3]"
      >
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8E8E8E] text-[12px]">
            사진
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-[12px]">
            업로드 중…
          </div>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </>
  );
}
