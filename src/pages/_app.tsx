import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { makeServer } from "../services/mirage/mirage"
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient'

if (process.env.NODE_ENV === "development") {
  makeServer()
}

const theme = extendTheme({
  colors: {
    gray: {
      "900": "#181B23",
      "800": "#1F2029",
      "700": "#353646",
      "600": "#4B4D63",
      "500": "#616480",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto'
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} >
      <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />

    </QueryClientProvider>
  )
}
