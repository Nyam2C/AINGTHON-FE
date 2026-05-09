import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { LoadingAnimation } from '../components/common/LoadingAnimation';

const FALLBACK_NEXT = '/home';
const DEFAULT_DURATION_MS = 700;

export function LoadingScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const rawNext = searchParams.get('next');
  const next =
    rawNext !== null && rawNext.startsWith('/') ? rawNext : FALLBACK_NEXT;

  const rawDuration = searchParams.get('duration');
  const parsedDuration = Number(rawDuration);
  const duration =
    Number.isFinite(parsedDuration) && parsedDuration > 0
      ? parsedDuration
      : DEFAULT_DURATION_MS;

  useEffect(() => {
    const timerId = setTimeout(() => {
      navigate(next, { replace: true });
    }, duration);
    return () => clearTimeout(timerId);
  }, [navigate, next, duration]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="relative mx-auto h-[844px] w-[390px] bg-white">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingAnimation />
        </div>
      </div>
    </div>
  );
}
