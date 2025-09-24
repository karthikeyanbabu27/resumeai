import { Card } from "@/components/ui/card";
import { Sparkles, Palette, Download, Edit, Clock, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Advanced Google AI analyzes your information and creates professionally structured content that highlights your strengths.",
    color: "text-blue-600"
  },
  {
    icon: Palette,
    title: "Beautiful Templates",
    description: "Choose from carefully crafted themes designed by professionals. Each template is optimized for ATS systems.",
    color: "text-purple-600"
  },
  {
    icon: Edit,
    title: "Real-time Editing",
    description: "Make instant changes to your resume with our intuitive editor. See your modifications reflected immediately.",
    color: "text-green-600"
  },
  {
    icon: Download,
    title: "Instant PDF Export",
    description: "Generate high-quality PDF resumes powered by LaTeX for perfect formatting and professional appearance.",
    color: "text-orange-600"
  },
  {
    icon: Clock,
    title: "Quick & Efficient",
    description: "Create a complete resume in under 5 minutes. Our streamlined process saves you hours of formatting time.",
    color: "text-red-600"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your personal information is encrypted and secure. We respect your privacy and never share your data.",
    color: "text-indigo-600"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Our
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> AI Resume Builder</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Experience the future of resume creation with cutting-edge AI technology 
            that understands what recruiters want to see.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
            >
              <div className="space-y-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full text-primary font-medium">
            <Sparkles className="w-5 h-5 mr-2" />
            Ready to experience the magic? Let's get started!
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;