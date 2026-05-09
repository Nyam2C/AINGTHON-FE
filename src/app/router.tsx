import { createBrowserRouter } from 'react-router-dom';

import { HomeScreen } from '../screens/HomeScreen';
import { LandingScreen } from '../screens/LandingScreen';
import { LoadingScreen } from '../screens/LoadingScreen';
import { MatchDetailScreen } from '../screens/MatchDetailScreen';
import { MatchRequestCompleteScreen } from '../screens/MatchRequestCompleteScreen';
import { MatchRequestScreen } from '../screens/MatchRequestScreen';
import { OnboardingIntroScreen } from '../screens/OnboardingIntroScreen';
import { OnboardingProfileScreen } from '../screens/OnboardingProfileScreen';
import { OnboardingRoleScreen } from '../screens/OnboardingRoleScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SearchResultsScreen } from '../screens/SearchResultsScreen';
import { SearchScreen } from '../screens/SearchScreen';

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
  {
    path: '/search',
    element: <SearchScreen />,
  },
  {
    path: '/search/results',
    element: <SearchResultsScreen />,
  },
  {
    path: '/match/:userId',
    element: <MatchDetailScreen />,
  },
  {
    path: '/match/:userId/request',
    element: <MatchRequestScreen />,
  },
  {
    path: '/match/:userId/request/complete',
    element: <MatchRequestCompleteScreen />,
  },
]);
