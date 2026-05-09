import { createBrowserRouter } from 'react-router-dom';

import { HomeScreen } from '../screens/HomeScreen';
import { LandingScreen } from '../screens/LandingScreen';
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
]);
