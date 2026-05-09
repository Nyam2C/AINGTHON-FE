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

export function OnboardingProfileScreen() {
  const navigate = useNavigate();
  const role = useOnboardingStore((s) => s.role);
  const profile = useOnboardingStore((s) => s.profile);
  const patchProfile = useOnboardingStore((s) => s.patchProfile);
  const reset = useOnboardingStore((s) => s.reset);
  const mutation = useCompleteOnboardingMutation();

  const isValid =
    profile.name.trim().length > 0 &&
    profile.bio.trim().length > 0 &&
    profile.bio.length <= 30 &&
    profile.interests.length >= 1 &&
    profile.major !== null &&
    profile.school.trim().length > 0 &&
    profile.grade !== null &&
    role !== null;

  const handleSubmit = () => {
    if (!isValid || role === null) return;
    mutation.mutate(
      { ...profile, role },
      {
        onSuccess: () => {
          reset();
          navigate('/onboarding/loading?next=/home&duration=1000');
        },
        onError: (error) => {
          // TODO(stub): 추후 toast/alert로 교체.
          console.error('completeOnboarding failed', error);
        },
      },
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-black">
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
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-[28px] flex flex-col gap-[20px]"
        >
          <LabeledTextInput
            label="이름"
            value={profile.name}
            onChange={(v) => patchProfile({ name: v })}
          />
          <LabeledTextarea
            label="한 줄 소개"
            maxLength={30}
            rows={2}
            value={profile.bio}
            onChange={(v) => patchProfile({ bio: v })}
          />
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              관심 분야 (최대 3개)
            </span>
            <InterestTagGroup
              value={profile.interests}
              onChange={(v) => patchProfile({ interests: v })}
              options={INTEREST_OPTIONS}
              max={3}
            />
          </div>
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              전공 여부
            </span>
            <MajorToggle
              value={profile.major}
              onChange={(v) => patchProfile({ major: v })}
            />
          </div>
          <TechStackInput
            value={profile.techStack}
            onChange={(v) => patchProfile({ techStack: v })}
            max={10}
          />
          <LabeledTextarea
            label="경력"
            rows={3}
            value={profile.career}
            onChange={(v) => patchProfile({ career: v })}
          />
          <LabeledTextInput
            label="학교명"
            value={profile.school}
            onChange={(v) => patchProfile({ school: v })}
          />
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              학년
            </span>
            <GradeSelector
              value={profile.grade}
              onChange={(v) => patchProfile({ grade: v })}
            />
          </div>
          <LabeledTextarea
            label="프로젝트 경험"
            rows={4}
            value={profile.projects}
            onChange={(v) => patchProfile({ projects: v })}
          />
          <LabeledTextarea
            label="목표"
            rows={3}
            value={profile.goals}
            onChange={(v) => patchProfile({ goals: v })}
          />
          <div className="mt-[12px] flex flex-col items-center gap-[20px]">
            <PrimaryButton
              label="시작하기"
              width={321}
              disabled={!isValid || mutation.isPending}
              onClick={handleSubmit}
            />
            <PaginationDots currentIndex={2} />
          </div>
        </form>
      </div>
    </div>
  );
}
