import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { QueryProvider } from './app/QueryProvider';
import { router } from './app/router';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const hydrate = useAuthStore(s => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
