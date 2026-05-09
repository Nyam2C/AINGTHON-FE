import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LabeledTextarea } from '../components/common/LabeledTextarea';
import { RatingStars } from '../components/matches/RatingStars';
import { useSubmitReviewMutation } from '../hooks/useSubmitReviewMutation';

export function ReviewScreen() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();

  const [rating, setRating] = useState(0);
  const [oneLineReview, setOneLineReview] = useState('');
  const [detail, setDetail] = useState('');

  const submitReview = useSubmitReviewMutation();

  const partnerName = '멘토';

  const handleBack = () => navigate(-1);

  const handleSubmit = () => {
    if (!matchId) return;
    submitReview.mutate(
      { matchId, rating, oneLineReview, detail },
      {
        onSuccess: () => navigate(`/matches/${matchId}/report`),
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
          value={rating}
          onChange={setRating}
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
            value={detail}
            onChange={setDetail}
            rows={5}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitReview.isPending}
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
