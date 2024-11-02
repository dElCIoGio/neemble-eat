import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {AuthProvider} from "@/context/AuthContext.tsx";


const queryClient = new QueryClient(
	{
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false, // Disable refetch on window focus
			},
		},
	})


createRoot(document.getElementById('root')!).render(
	<StrictMode>
      <QueryClientProvider client={queryClient}>
	      <AuthProvider>
		     <App/>
	      </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom"/>
      </QueryClientProvider>
  </StrictMode>,
)
