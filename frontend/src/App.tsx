import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import { ImportPage } from './pages/ImportPage';
import Project from './pages/Project';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (

    <QueryClientProvider client={queryClient}>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/import" element={<ImportPage />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </QueryClientProvider>
  )
}

export default App
