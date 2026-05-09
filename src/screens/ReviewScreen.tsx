import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LabeledTextarea } from '../components/common/LabeledTextarea';
import { RatingStars } from '../components/matches/RatingStars';
import { useSubmitReviewMutation } from '../hooks/useSubmitReviewMutation';

export function ReviewScreen() {
  const navigate = useNavigate();
  const { scheduleId: scheduleIdParam } = useParams<{ scheduleId: string }>();
  const scheduleId = scheduleIdParam ? Number(scheduleIdParam) : NaN;

  const [satisfaction, setSatisfaction] = useState(0);
  const [oneLineReview, setOneLineReview] = useState('');
  const [mainContent, setMainContent] = useState('');

  const submitReview = useSubmitReviewMutation();

  const partnerName = '멘토';

  const handleBack = () => navigate(-1);

  const canSubmit =
    Number.isFinite(scheduleId) &&
    satisfaction >= 1 &&
    satisfaction <= 5 &&
    oneLineReview.trim().length > 0 &&
    !submitReview.isPending;

  const handleSubmit = () => {
    if (!canSubmit) return;
    submitReview.mutate(
      {
        scheduleId,
        satisfaction,
        oneLineReview,
        mainContent: mainContent.trim() ? mainContent : undefined,
      },
      {
        onSuccess: () => navigate(`/schedules/${scheduleId}/report`),
        onError: err => console.error(err),
      },
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto w-[390px] min-h-[844px] bg-white pb-[80px]">
        <header className="relative pt-[24px] pb-[16px]">
          <button
            type="button"
            onClick={handleBack}
            aria-label="뒤로"
            className="absolute left-[16px] top-[24px] w-[40px] h-[40px] text-[20px]"
          >
            ←
          </button>
          <h1 className="text-[24px] font-semibold text-center text-black">
            리뷰 작성
          </h1>
        </header>
        <h2 className="text-[20px] font-medium text-center py-[32px]">
          {partnerName} 멘토님과의 멘토링은 어떠셨나요?
        </h2>
        <RatingStars
          value={satisfaction}
          onChange={setSatisfaction}
          className="justify-center mb-[32px]"
        />
        <div className="flex flex-col items-center gap-[24px]">
          <LabeledTextarea
            label="한줄 리뷰"
            value={oneLineReview}
            onChange={setOneLineReview}
            maxLength={100}
          />
          <LabeledTextarea
            label="주요 내용 (선택)"
            value={mainContent}
            onChange={setMainContent}
            rows={5}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-[321px] h-[52px] rounded-[9px] bg-blue-500 text-white text-[16px] font-medium disabled:opacity-60"
          >
            제출하기
          </button>
        </div>
        <BottomNav active="matching" />
      </div>
    </div>
  );
}
