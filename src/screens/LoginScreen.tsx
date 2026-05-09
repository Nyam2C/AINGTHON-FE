import { getGoogleLoginUrl } from '../api/auth';
import { CodemateLogo } from '../components/landing/CodemateLogo';
import { CodemateWordmark } from '../components/landing/CodemateWordmark';

export function LoginScreen() {
  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto h-[844px] w-[390px] bg-white">
        <div className="absolute left-1/2 top-[200px] flex -translate-x-1/2 flex-col items-center gap-4">
          <CodemateLogo
            width={142}
            height={139}
            className="text-blue-500"
          />
          <CodemateWordmark className="text-blue-500" />
          <p className="mt-2 whitespace-nowrap text-center font-inter text-[16px] font-medium leading-[24px] text-[#8E8E8E]">
            대학생 개발자를 위한
            <br />
            멘토링 커뮤니티에 합류하세요
          </p>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="absolute bottom-[120px] left-1/2 flex h-[52px] w-[321px] -translate-x-1/2 items-center justify-center gap-3 rounded-[9px] border border-[#E6EBF3] bg-white font-inter text-[16px] font-medium text-black transition-colors hover:bg-[#F5F7FA]"
        >
          <GoogleIcon />
          Google로 계속하기
        </button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M19.6 10.23c0-.7-.06-1.36-.18-2H10v3.8h5.4a4.6 4.6 0 0 1-2 3.04v2.5h3.2c1.88-1.74 2.96-4.3 2.96-7.34Z"
        fill="#4285F4"
      />
      <path
        d="M10 20c2.7 0 4.96-.9 6.6-2.43l-3.2-2.5c-.9.6-2.04.96-3.4.96-2.6 0-4.8-1.76-5.6-4.13H1.1v2.6A10 10 0 0 0 10 20Z"
        fill="#34A853"
      />
      <path
        d="M4.4 11.9a6 6 0 0 1 0-3.8V5.5H1.1a10 10 0 0 0 0 9l3.3-2.6Z"
        fill="#FBBC05"
      />
      <path
        d="M10 3.96c1.46 0 2.78.5 3.82 1.5l2.86-2.86A10 10 0 0 0 10 0 10 10 0 0 0 1.1 5.5l3.3 2.6c.8-2.36 3-4.13 5.6-4.13Z"
        fill="#EA4335"
      />
    </svg>
  );
}
