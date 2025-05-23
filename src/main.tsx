import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AuthProvider} from "@/context/AuthContext.tsx";
import {Provider} from "react-redux";
import {store} from "@/state/store.ts";
import {Toaster} from "@/components/ui/toaster.tsx"
import { Toaster as Sonner } from "@/components/ui/sonner"
// import {ReactQueryDevtools} from "react-query/devtools";


const queryClient = new QueryClient(
	{
		defaultOptions: {
			queries: {
				refetchOnWindowFocus: false,
			},
		},
	})


createRoot(document.getElementById('root')!).render(
	<StrictMode>
      <QueryClientProvider client={queryClient}>
	      <AuthProvider>
			  <Provider store={store}>
				  <Toaster/>
				  <Sonner/>
				  <App/>
			  </Provider>
	      </AuthProvider>
          {/*<ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>*/}
      </QueryClientProvider>
  </StrictMode>,
)
