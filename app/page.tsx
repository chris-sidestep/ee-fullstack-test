"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./components/App";
import { Box } from "@mui/material";

export default function Home() {
  const queryClient = new QueryClient()

  
  return (
    <main style={{background: "#1795d4", fontFamily:"Montserrat, sans-serif;"}} className="flex min-h-screen flex-col items-center justify-between p-24">
      <Box className ="logo"><img src="EE.svg" height="60px"  width="100px"/> </Box>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </main>
  );
}
