import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { 
  CheckCircle, FileText, Brain, Download, Upload, Star, 
  ArrowRight, Zap, Shield, Users, BarChart3, Sparkles,
  Rocket, Award, Clock, Target, TrendingUp, Globe, ChevronDown
} from "lucide-react";

export default function GoogleIndex() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-dark font-body">
      {/* Enhanced Dark Header */}
      <header className="border-b border-gray-700/60 bg-black/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-dark-gold rounded flex items-center justify-center shadow-xl">
              <FileText className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-xl font-bold font-heading text-primary">
                CareerCraft
              </span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium">Pro</span>
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-300 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Features
            </a>
            <Link to="/examples" className="text-gray-300 hover:text-primary transition-colors font-medium">Examples</Link>
            <a
              href="#testimonials"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-gray-300 hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Reviews
            </a>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-primary transition-colors font-medium">Dashboard</Link>
                <Link to="/builder" className="text-gray-300 hover:text-primary transition-colors font-medium">Builder</Link>
                <Button
                  onClick={logout}
                  variant="ghost"
                  className="text-gray-300 hover:text-primary transition-colors font-medium"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login" className="text-gray-300 hover:text-primary transition-colors font-medium">Sign In</Link>
            )}
            <Link to={user ? "/ai-analysis" : "/login"}>
              <Button className="bg-gradient-dark-gold text-black hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
                {user ? "Get Started" : "Login to Get Started"}
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Left-Aligned Hero Section with Geometric Patterns */}
      <section className="py-24 bg-pattern-geometric relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 right-20 w-96 h-96 border-2 border-primary/30 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 border border-accent/20 rotate-45"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <div className="flex items-center gap-2 mb-6">
                <Badge className="bg-primary/20 text-primary border-primary/40 px-4 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Powered by Advanced AI
                </Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold font-heading mb-8 leading-tight">
                <span className="text-white">
                  Build Your
                </span>
                <br />
                <span className="text-primary">
                  Career Success
                </span>
                <br />
                <span className="text-accent">
                  with AI Power
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
                Transform your career with intelligent resume analysis, smart recommendations, and professional scoring.
                Create industry-optimized resumes that guarantee interview calls.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to={user ? "/builder" : "/login"}>
                  <Button size="lg" className="bg-gradient-dark-gold text-black hover:opacity-90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold">
                    <Rocket className="w-5 h-5 mr-2" />
                    {user ? "Start Building" : "Login to Start"}
                  </Button>
                </Link>
                <Link to={user ? "/ai-analysis" : "/register"}>
                  <Button variant="outline" size="lg" className="bg-transparent border-primary text-primary hover:bg-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg font-medium">
                    <Brain className="w-5 h-5 mr-2" />
                    {user ? "AI Analysis" : "Try AI Analysis"}
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-accent" />
                  <span className="text-gray-300 text-sm">ATS Optimized</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  <span className="text-gray-300 text-sm">50K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-gray-300 text-sm">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Element */}
            <div className="relative">
              <div className="relative z-10 p-8">
                <div className="solid-dark-card rounded-xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <h3 className="font-heading font-bold text-xl text-white mb-4">AI Analysis Preview</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">ATS Score</span>
                      <span className="text-accent font-bold">95%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full">
                      <div className="h-2 bg-gradient-dark-gold rounded-full w-4/5"></div>
                    </div>
                    <div className="text-sm text-gray-400">
                      "Excellent keyword optimization and professional formatting"
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Features Section */}
      <section id="features" className="py-24 bg-gradient-dark-accent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold font-heading mb-6 text-white">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI-powered platform provides cutting-edge tools to create, optimize, and share your professional resume.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="solid-dark-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold font-heading text-white">
                  AI-Powered Analysis
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Get intelligent suggestions to improve your resume with our advanced AI system that understands industry requirements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="solid-dark-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold font-heading text-white">
                  Smart Scoring System
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Real-time ATS compatibility scoring with detailed feedback and actionable improvement recommendations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="solid-dark-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold font-heading text-white">
                  Professional Templates
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Choose from 10+ professionally designed templates optimized for different industries and career levels
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="solid-dark-card hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                  <Upload className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold font-heading text-white">
                  Smart Import & Export
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Upload existing resumes for instant analysis or export in multiple formats including PDF, Word, and plain text
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-300 text-lg">
              Real success stories from professionals who landed their dream jobs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="solid-dark-card-accent rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">SJ</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Sarah Johnson</h4>
                  <p className="text-gray-400 text-sm">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "CareerCraft's AI analysis helped me identify weak points in my resume. Got 3 interview calls within a week!"
              </p>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="solid-dark-card-accent rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">MR</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Michael Rodriguez</h4>
                  <p className="text-gray-400 text-sm">Marketing Manager</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The professional templates are amazing. My resume looks so much more polished and professional now."
              </p>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            <div className="solid-dark-card-accent rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold">AC</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Amanda Chen</h4>
                  <p className="text-gray-400 text-sm">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                "The ATS optimization feature is a game-changer. Finally, my resume passes through automated systems!"
              </p>
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-dark-accent">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300 text-lg">
              Everything you need to know about CareerCraft
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="solid-dark-card-accent rounded-xl p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-white">How does the AI analysis work?</h3>
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
              <p className="text-gray-300 mt-4">
                Our AI analyzes your resume content, structure, and formatting against industry standards and ATS requirements to provide personalized improvement suggestions.
              </p>
            </div>

            <div className="solid-dark-card-accent rounded-xl p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-white">Is my data secure and private?</h3>
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
              <p className="text-gray-300 mt-4">
                Absolutely. We use enterprise-grade encryption and never share your personal information. Your resume data is processed securely and can be deleted at any time.
              </p>
            </div>

            <div className="solid-dark-card-accent rounded-xl p-6">
              <div className="flex justify-between items-center cursor-pointer">
                <h3 className="font-semibold text-white">Can I export my resume in different formats?</h3>
                <ChevronDown className="w-5 h-5 text-primary" />
              </div>
              <p className="text-gray-300 mt-4">
                Yes! You can export your resume as PDF, Word document, or plain text format. All exports maintain professional formatting and ATS compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-heading text-white mb-4">
              Trusted by Professionals Worldwide
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 solid-dark-card-accent rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-300">Resumes Created</div>
            </div>
            <div className="text-center p-6 solid-dark-card-accent rounded-xl">
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
            <div className="text-center p-6 solid-dark-card-accent rounded-xl">
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-gray-300">User Rating</div>
            </div>
            <div className="text-center p-6 solid-dark-card-accent rounded-xl">
              <div className="text-3xl font-bold text-accent mb-2">24/7</div>
              <div className="text-gray-300">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-dark-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold font-heading text-black mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-black/80 mb-10 max-w-3xl mx-auto">
            Join thousands of professionals who have successfully landed their dream jobs with our AI-powered resume platform.
          </p>
          <Link to={user ? "/builder" : "/register"}>
            <Button
              size="lg"
              className="bg-black text-primary hover:bg-gray-900 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {user ? "Start Building Now" : "Sign Up to Start Building"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-dark-gold rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <div>
                  <span className="text-xl font-bold font-heading text-primary">CareerCraft</span>
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-xs text-primary font-medium">Pro</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Build professional resumes with AI-powered suggestions and ATS optimization. Trusted by professionals worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Product</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#features" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-primary transition-colors cursor-pointer">Features</a></li>
                <li><Link to="/examples" className="hover:text-primary transition-colors">Examples</Link></li>
                <li><Link to="/builder" className="hover:text-primary transition-colors">Builder</Link></li>
                <li><Link to="/ai-analysis" className="hover:text-primary transition-colors">AI Analysis</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Company</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-primary transition-colors cursor-pointer">About</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors cursor-pointer">Contact</a></li>
                <li><Link to="/upload" className="hover:text-primary transition-colors">Upload Resume</Link></li>
                <li><Link to="/cover-letter" className="hover:text-primary transition-colors">Cover Letter</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-6">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#privacy" className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-primary transition-colors cursor-pointer">Terms of Service</a></li>
                <li><a href="#cookies" className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 CareerCraft. All rights reserved. Built with ❤️ for job seekers worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
