import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { GradeSelector } from '../components/onboarding/GradeSelector';
import { InterestTagGroup } from '../components/onboarding/InterestTagGroup';
import { LabeledTextInput } from '../components/onboarding/LabeledTextInput';
import { LabeledTextarea } from '../components/onboarding/LabeledTextarea';
import { MajorToggle } from '../components/onboarding/MajorToggle';
import { PaginationDots } from '../components/onboarding/PaginationDots';
import { PrimaryButton } from '../components/onboarding/PrimaryButton';
import { TechStackInput } from '../components/onboarding/TechStackInput';
import { useCompleteOnboardingMutation } from '../hooks/useCompleteOnboardingMutation';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { INTEREST_OPTIONS } from '../types/onboarding';
import type { OnboardingProfile } from '../types/onboarding';

type Errors = Partial<Record<keyof OnboardingProfile, string>>;

const REQUIRED_MESSAGE = '필수 입력 항목입니다';

function validate(profile: OnboardingProfile): Errors {
  const errors: Errors = {};
  if (!profile.name.trim()) errors.name = REQUIRED_MESSAGE;
  if (!profile.bio.trim()) errors.bio = REQUIRED_MESSAGE;
  if (profile.interests.length === 0)
    errors.interests = '하나 이상 선택해 주세요';
  if (profile.major === null) errors.major = '하나를 선택해 주세요';
  if (profile.techStack.length === 0)
    errors.techStack = '하나 이상 추가해 주세요';
  if (!profile.career.trim()) errors.career = REQUIRED_MESSAGE;
  if (!profile.university.trim()) errors.university = REQUIRED_MESSAGE;
  if (profile.grade === null) errors.grade = '하나를 선택해 주세요';
  if (!profile.projects.trim()) errors.projects = REQUIRED_MESSAGE;
  if (!profile.goals.trim()) errors.goals = REQUIRED_MESSAGE;
  return errors;
}

export function OnboardingProfileScreen() {
  const navigate = useNavigate();
  const role = useOnboardingStore(s => s.role);
  const profile = useOnboardingStore(s => s.profile);
  const patchProfile = useOnboardingStore(s => s.patchProfile);
  const reset = useOnboardingStore(s => s.reset);
  const mutation = useCompleteOnboardingMutation();
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (key: keyof OnboardingProfile) => {
    if (!errors[key]) return;
    setErrors(prev => {
      const { [key]: _omit, ...rest } = prev;
      return rest;
    });
  };

  const handleSubmit = () => {
    const nextErrors = validate(profile);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    mutation.mutate(
      { ...profile, role: role ?? 'mentee' },
      {
        onSettled: (_data, error) => {
          if (error) {
            console.warn(
              'completeOnboarding failed (proceeding anyway)',
              error,
            );
          }
          reset();
          navigate('/onboarding/loading?next=/home&duration=1000');
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white motion-safe:animate-fade-in motion-reduce:animate-none px-[34px] pt-[80px] pb-[40px]">
        <h1 className="font-inter text-[32px] font-bold leading-[40px] text-black">
          나를 소개해 주세요.
        </h1>
        <p className="mt-[12px] font-inter text-[16px] font-medium leading-[24px] text-[#8E8E8E]">
          다른 사람들이 나를 이해할 수 있도록
          <br />
          간단히 작성해 주세요.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-[28px] flex flex-col gap-[20px]"
        >
          <LabeledTextInput
            label="이름"
            value={profile.name}
            onChange={v => {
              patchProfile({ name: v });
              clearError('name');
            }}
            error={errors.name}
          />
          <LabeledTextarea
            label="한 줄 소개"
            maxLength={30}
            rows={2}
            value={profile.bio}
            onChange={v => {
              patchProfile({ bio: v });
              clearError('bio');
            }}
            error={errors.bio}
          />
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              관심 분야 (최대 3개)
            </span>
            <InterestTagGroup
              value={profile.interests}
              onChange={v => {
                patchProfile({ interests: v });
                clearError('interests');
              }}
              options={INTEREST_OPTIONS}
              max={3}
            />
            {errors.interests && (
              <p className="mt-[6px] text-[12px] text-red-500">
                {errors.interests}
              </p>
            )}
          </div>
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              전공 여부
            </span>
            <MajorToggle
              value={profile.major}
              onChange={v => {
                patchProfile({ major: v });
                clearError('major');
              }}
            />
            {errors.major && (
              <p className="mt-[6px] text-[12px] text-red-500">
                {errors.major}
              </p>
            )}
          </div>
          <TechStackInput
            value={profile.techStack}
            onChange={v => {
              patchProfile({ techStack: v });
              clearError('techStack');
            }}
            max={10}
            error={errors.techStack}
          />
          <LabeledTextarea
            label="경력"
            rows={3}
            value={profile.career}
            onChange={v => {
              patchProfile({ career: v });
              clearError('career');
            }}
            error={errors.career}
          />
          <LabeledTextInput
            label="학교명"
            value={profile.university}
            onChange={v => {
              patchProfile({ university: v });
              clearError('university');
            }}
            error={errors.university}
          />
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              학년
            </span>
            <GradeSelector
              value={profile.grade}
              onChange={v => {
                patchProfile({ grade: v });
                clearError('grade');
              }}
            />
            {errors.grade && (
              <p className="mt-[6px] text-[12px] text-red-500">
                {errors.grade}
              </p>
            )}
          </div>
          <LabeledTextarea
            label="프로젝트 경험"
            rows={4}
            value={profile.projects}
            onChange={v => {
              patchProfile({ projects: v });
              clearError('projects');
            }}
            error={errors.projects}
          />
          <LabeledTextarea
            label="목표"
            rows={3}
            value={profile.goals}
            onChange={v => {
              patchProfile({ goals: v });
              clearError('goals');
            }}
            error={errors.goals}
          />
          <div className="mt-[12px] flex flex-col items-center gap-[20px]">
            <PrimaryButton
              label="시작하기"
              width={321}
              disabled={mutation.isPending}
              onClick={handleSubmit}
            />
            <PaginationDots currentIndex={2} />
          </div>
        </form>
      </div>
    </div>
  );
}
