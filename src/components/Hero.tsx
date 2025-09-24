import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-resume.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/30 to-background"></div>
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'var(--background-pattern)' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-accent/50 backdrop-blur-sm rounded-full text-sm font-medium text-accent-foreground border border-primary/20">
                <Sparkles className="w-4 h-4 mr-2 text-primary" />
                AI-Powered Resume Builder
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Create Your
                <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Perfect Resume
                </span>
                in Minutes
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-md leading-relaxed">
                Let AI craft your professional resume with precision. Just input your details, 
                select a theme, and watch as Google's AI creates a stunning LaTeX-powered resume.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="hero" 
                className="text-lg px-8 py-6 rounded-xl"
                onClick={() => navigate('/builder')}
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                size="lg" 
                variant="glass" 
                className="text-lg px-8 py-6 rounded-xl"
              >
                View Samples
                <FileText className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">AI-Generated</p>
                <p className="text-xs text-muted-foreground">Smart content creation</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">LaTeX Quality</p>
                <p className="text-xs text-muted-foreground">Professional formatting</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-medium text-foreground">Instant Download</p>
                <p className="text-xs text-muted-foreground">PDF ready in seconds</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src={heroImage} 
                alt="AI Resume Builder Interface" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary-glow/30 rounded-full blur-lg animate-pulse delay-1000"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;