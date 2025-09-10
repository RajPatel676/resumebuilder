import "./global.css";

import { Toaster } from "@/components/ui/toaster.jsx";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner.jsx";
import { TooltipProvider } from "@/components/ui/tooltip.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Index from "./pages/Index.jsx";
import GoogleIndex from "./pages/GoogleIndex.jsx";
import Builder from "./pages/Builder.jsx";
import Upload from "./pages/Upload.jsx";
import Examples from "./pages/Examples.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EnhancedDashboard from "./pages/EnhancedDashboard.jsx";
import EnhancedBuilder from "./pages/EnhancedBuilder.jsx";
import CoverLetterGenerator from "./pages/CoverLetterGenerator.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AIAnalysis from "./pages/AIAnalysis.jsx";
import NotFound from "./pages/NotFound.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<GoogleIndex />} />
          <Route path="/old" element={<Index />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/enhanced-dashboard" element={<ProtectedRoute><EnhancedDashboard /></ProtectedRoute>} />
          <Route path="/enhanced-builder" element={<ProtectedRoute><EnhancedBuilder /></ProtectedRoute>} />
          <Route path="/cover-letter" element={<ProtectedRoute><CoverLetterGenerator /></ProtectedRoute>} />
          <Route path="/ai-analysis" element={<ProtectedRoute><AIAnalysis /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")).render(<App />);
