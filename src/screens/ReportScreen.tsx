import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BottomNav } from '../components/common/BottomNav';
import { LabeledTextarea } from '../components/common/LabeledTextarea';
import { FileAttachField } from '../components/report/FileAttachField';
import { useSubmitReportMutation } from '../hooks/useSubmitReportMutation';

export function ReportScreen() {
  const navigate = useNavigate();
  const { matchId } = useParams<{ matchId: string }>();

  const [insights, setInsights] = useState('');
  const [nextGoals, setNextGoals] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const submitReport = useSubmitReportMutation();

  const handleBack = () => navigate(-1);

  const handleAddFiles = (selected: File[]) => {
    setFiles(prev => [...prev, ...selected]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!matchId) return;
    submitReport.mutate(
      { matchId, payload: { insights, nextGoals }, files },
      {
        onSuccess: () => navigate('/matches'),
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
            요약 보고서 작성 (선택)
          </h1>
        </header>
        <h2 className="text-[20px] font-medium text-center py-[24px]">
          멘토링 내용을 정리하면 다음 상담에 도움이 돼요!
        </h2>
        <div className="flex flex-col items-center gap-[24px]">
          <LabeledTextarea
            label="주요 인사이트 (최대 5개)"
            value={insights}
            onChange={setInsights}
            rows={5}
          />
          <LabeledTextarea
            label="다음 목표 (내가 실천할 일)"
            value={nextGoals}
            onChange={setNextGoals}
            rows={5}
          />
          <FileAttachField
            files={files}
            onAdd={handleAddFiles}
            onRemove={handleRemoveFile}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitReport.isPending}
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
