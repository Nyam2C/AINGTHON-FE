import { CodemateLogo } from '../components/landing/CodemateLogo';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';
import { IPhoneHomeIndicator } from '../components/landing/IPhoneHomeIndicator';
import { IPhoneStatusBar } from '../components/landing/IPhoneStatusBar';

export function OnboardingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto flex h-[844px] w-[390px] flex-col bg-white">
        <IPhoneStatusBar className="text-black" />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4">
          <CodemateLogo width={142} height={139} className="text-blue-500" />
          <CodemateWordmark className="text-blue-500" />
          <p className="mt-4 text-center font-inter text-[20px] font-bold leading-[28px] text-black">
            AI 시대, 불안은 나누고
            <br />
            성장은 함께,
          </p>
        </div>
        <p className="mb-6 text-center font-inter text-[20px] font-bold leading-[28px] text-blue-500">
          대학생 개발자를 위한
          <br />
          멘토링 커뮤니티
        </p>
        <IPhoneHomeIndicator className="text-black" />
      </div>
    </div>
  );
}
