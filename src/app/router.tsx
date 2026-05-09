import { createBrowserRouter } from 'react-router-dom';

import { HomeScreen } from '../screens/HomeScreen';
import { LandingScreen } from '../screens/LandingScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { OnboardingIntroScreen } from '../screens/OnboardingIntroScreen';
import { OnboardingProfileScreen } from '../screens/OnboardingProfileScreen';
import { OnboardingRoleScreen } from '../screens/OnboardingRoleScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingScreen />,
  },
  {
    path: '/home',
    element: <HomeScreen />,
  },
  {
    path: '/onboarding',
    element: <OnboardingScreen />,
  },
  {
    path: '/onboarding/intro',
    element: <OnboardingIntroScreen />,
  },
  {
    path: '/onboarding/role',
    element: <OnboardingRoleScreen />,
  },
  {
    path: '/onboarding/profile',
    element: <OnboardingProfileScreen />,
  },
  {
    path: '/onboarding/loading',
    element: <LoadingScreen />,
  },
]);
