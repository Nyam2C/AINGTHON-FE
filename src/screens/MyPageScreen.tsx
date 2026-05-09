import { useEffect, useRef, useState } from 'react';

import { BottomNav } from '../components/common/BottomNav';
import { LabeledTextInput } from '../components/onboarding/LabeledTextInput';
import { LabeledTextarea } from '../components/onboarding/LabeledTextarea';
import { TechStackInput } from '../components/onboarding/TechStackInput';
import { FieldChipsSection } from '../components/profile/FieldChipsSection';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { SaveBar } from '../components/profile/SaveBar';
import { UniversityReadonlyRow } from '../components/profile/UniversityReadonlyRow';
import { useMyProfileQuery } from '../hooks/useMyProfileQuery';
import { useUpdateProfileMutation } from '../hooks/useUpdateProfileMutation';
import { useUploadProfileImageMutation } from '../hooks/useUploadProfileImageMutation';
import type { Field, ProfileUpdateRequest } from '../types/profile';
import { FIELD_OPTIONS, buildSubtitleFromFields } from '../utils/profileLabels';

/** 폼 state — MyPageScreen 안에서만 사용. */
type MyProfileFormState = {
  name: string;
  introduction: string;
  fields: Field[];
  techStacks: string[];
  goal: string;
  link: string;
  projectExperiencesText: string;
  careersText: string;
};

const splitByNewline = (s: string): string[] =>
  s
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 0);

export function MyPageScreen() {
  const { data, isLoading, isError, refetch } = useMyProfileQuery();
  const updateMutation = useUpdateProfileMutation();
  const uploadMutation = useUploadProfileImageMutation();

  const [formState, setFormState] = useState<MyProfileFormState | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (data && !initializedRef.current) {
      setFormState({
        name: data.name,
        introduction: data.introduction ?? '',
        fields: data.fields,
        techStacks: data.techStacks,
        goal: data.goal ?? '',
        link: data.link ?? '',
        projectExperiencesText: data.projectExperiences.join('\n'),
        careersText: data.careers.join('\n'),
      });
      initializedRef.current = true;
    }
  }, [data]);

  const patch = (next: Partial<MyProfileFormState>) => {
    setFormState(prev => (prev ? { ...prev, ...next } : prev));
    setIsDirty(true);
  };

  const handleAvatarChange = (file: File) => {
    uploadMutation.mutate(file, {
      onError: err => {
        console.error(err);
        window.alert('이미지 업로드에 실패했습니다.');
      },
    });
  };

  const handleRatingClick = () => {
    console.warn('Reviews route not implemented');
  };

  const handleSave = () => {
    if (!formState || !data) return;
    const payload: ProfileUpdateRequest = {
      name: formState.name,
      introduction: formState.introduction || undefined,
      fields: formState.fields,
      major: data.major,
      techStacks: formState.techStacks,
      university: data.university,
      grade: data.grade,
      careers: splitByNewline(formState.careersText),
      projectExperiences: splitByNewline(formState.projectExperiencesText),
      goal: formState.goal || undefined,
      link: formState.link || undefined,
    };
    updateMutation.mutate(payload, {
      onSuccess: () => {
        setIsDirty(false);
      },
      onError: err => {
        console.error(err);
        window.alert('저장에 실패했습니다.');
      },
    });
  };

  const renderFrame = (children: React.ReactNode) => (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white px-[34px] pt-[40px] pb-[160px]">
        {children}
        <BottomNav active="profile" />
      </div>
    </div>
  );

  if (isLoading || (data && !formState)) {
    return renderFrame(
      <div className="flex min-h-[600px] items-center justify-center text-[14px] text-[#8E8E8E]">
        불러오는 중…
      </div>,
    );
  }

  if (isError || !data || !formState) {
    return renderFrame(
      <div className="flex min-h-[600px] flex-col items-center justify-center gap-[12px]">
        <p className="text-[14px] text-[#8E8E8E]">
          프로필을 불러오지 못했습니다.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-[8px] border border-[#E6EBF3] bg-white px-[16px] py-[10px] text-[14px] text-black"
        >
          다시 시도
        </button>
      </div>,
    );
  }

  return renderFrame(
    <>
      <ProfileHeader
        name={formState.name}
        subtitle={buildSubtitleFromFields(formState.fields)}
        role={null}
        profileImageUrl={data.profileImageUrl}
        averageRating={data.averageRating}
        reviewCount={data.reviewCount}
        onAvatarChange={handleAvatarChange}
        onRatingClick={handleRatingClick}
        isUploading={uploadMutation.isPending}
      />
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSave();
        }}
        className="mt-[28px] flex flex-col gap-[20px]"
      >
        <LabeledTextInput
          label="이름"
          value={formState.name}
          onChange={v => patch({ name: v })}
        />
        <LabeledTextarea
          label="한 줄 소개"
          maxLength={30}
          rows={2}
          value={formState.introduction}
          onChange={v => patch({ introduction: v })}
        />
        <FieldChipsSection
          label="관심 분야 (최대 3개)"
          value={formState.fields}
          onChange={next => patch({ fields: next })}
          options={FIELD_OPTIONS}
          max={3}
        />
        <LabeledTextInput
          label="소개 링크"
          value={formState.link}
          onChange={v => patch({ link: v })}
          placeholder="https://..."
        />
        <LabeledTextarea
          label="목표"
          rows={3}
          value={formState.goal}
          onChange={v => patch({ goal: v })}
        />
        <TechStackInput
          value={formState.techStacks}
          onChange={next => patch({ techStacks: next })}
        />
        <LabeledTextarea
          label="프로젝트"
          rows={4}
          value={formState.projectExperiencesText}
          onChange={v => patch({ projectExperiencesText: v })}
        />
        <LabeledTextarea
          label="경력"
          rows={3}
          value={formState.careersText}
          onChange={v => patch({ careersText: v })}
        />
        <UniversityReadonlyRow label="학교" value={data.university} />
      </form>
      <div className="absolute bottom-[80px] left-0 right-0">
        <SaveBar
          onSave={handleSave}
          disabled={!isDirty || updateMutation.isPending}
          isPending={updateMutation.isPending}
        />
      </div>
    </>,
  );
}
