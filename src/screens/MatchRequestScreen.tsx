import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { DatePickerField } from '../components/match/DatePickerField';
import { PreferenceRadioGroup } from '../components/match/PreferenceRadioGroup';
import { LabeledTextInput } from '../components/onboarding/LabeledTextInput';
import { LabeledTextarea } from '../components/onboarding/LabeledTextarea';
import { PrimaryButton } from '../components/onboarding/PrimaryButton';
import { useMatchUserQuery } from '../hooks/useMatchUserQuery';
import { useRequestMatchMutation } from '../hooks/useRequestMatchMutation';
import type { MatchPreference } from '../types/match';

export function MatchRequestScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading } = useMatchUserQuery(userId ?? '');
  const mutation = useRequestMatchMutation();

  const [reason, setReason] = useState('');
  const [requirement, setRequirement] = useState('');
  const [preference, setPreference] = useState<MatchPreference>('any');
  const [preferredDate, setPreferredDate] = useState<string | null>(null);

  const handleBack = () => navigate(-1);

  const handleSubmit = () => {
    if (!userId) return;
    // 검증 임시 해제: 빈 값도 허용. 추후 복원 시 다음 조건 추가.
    //   - if (reason.trim().length === 0) return;
    //   - if (reason.length > 300) return;
    mutation.mutate(
      {
        targetUserId: userId,
        reason,
        requirement,
        preference,
        preferredDate,
      },
      {
        onSuccess: data => {
          navigate(`/match/${userId}/request/complete`, {
            state: {
              matchRequestId: data.matchRequestId,
              userName: user?.name ?? '',
            },
          });
        },
        onError: err => console.error('requestMatch failed', err),
      },
    );
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pt-[20px] pb-[100px]">
        <header className="px-[34px] flex items-center gap-[12px]">
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로 가기"
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            ←
          </button>
          <h1 className="font-inter text-[20px] font-bold">매칭 신청</h1>
        </header>

        <div className="mt-[24px] px-[34px]">
          <h2 className="font-inter text-[18px] font-medium text-black">
            {isLoading
              ? '...'
              : `${user?.name ?? ''} 멘토님에게 매칭을 신청합니다.`}
          </h2>
        </div>

        <form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
          className="mt-[24px] px-[34px] flex flex-col gap-[20px]"
        >
          <LabeledTextarea
            label="신청 이유 *"
            maxLength={300}
            rows={4}
            value={reason}
            onChange={setReason}
          />
          <LabeledTextInput
            label="요구사항 (선택)"
            value={requirement}
            onChange={setRequirement}
          />
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              선호 방식
            </span>
            <PreferenceRadioGroup value={preference} onChange={setPreference} />
          </div>
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              희망 일정 (선택)
            </span>
            <DatePickerField
              value={preferredDate}
              onChange={setPreferredDate}
            />
          </div>

          <div className="mt-[24px] flex justify-center">
            <PrimaryButton
              label="신청하기"
              width={321}
              onClick={handleSubmit}
              disabled={mutation.isPending}
            />
          </div>
        </form>

        <BottomNav active="search" />
      </div>
    </div>
  );
}
