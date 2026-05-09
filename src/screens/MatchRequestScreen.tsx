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
import type { PreferredMode } from '../types/match';

export function MatchRequestScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const profileId = userId ? Number(userId) : null;
  const { data: user, isLoading } = useMatchUserQuery(profileId);
  const mutation = useRequestMatchMutation();

  const [reason, setReason] = useState('');
  const [requirements, setRequirements] = useState('');
  const [preferredMode, setPreferredMode] =
    useState<PreferredMode>('NO_PREFERENCE');
  const [preferredDate, setPreferredDate] = useState<string | null>(null);

  const handleBack = () => navigate(-1);

  const handleSubmit = () => {
    if (profileId == null || !Number.isFinite(profileId)) return;
    mutation.mutate(
      {
        receiverId: profileId,
        reason,
        requirements: requirements.trim() ? requirements : undefined,
        preferredMode,
        preferredDate: preferredDate ?? undefined,
      },
      {
        onSuccess: data => {
          navigate(`/match/${profileId}/request/complete`, {
            state: {
              matchId: data.id,
              chatRoomId: data.chatRoomId,
              userName: user?.name ?? '',
              scheduledDate: preferredDate ?? undefined,
            },
          });
        },
        onError: err => console.error('requestMatch failed', err),
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
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
            value={requirements}
            onChange={setRequirements}
          />
          <div>
            <span className="block font-bold text-[16px] text-black mb-[8px]">
              선호 방식
            </span>
            <PreferenceRadioGroup
              value={preferredMode}
              onChange={setPreferredMode}
            />
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
