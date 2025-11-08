import { Mail, Linkedin, Github, Send, Coffee } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useContactForm } from "@/hooks/useContactForm";

export const Contact = () => {
  const { toast } = useToast();
  const contactMutation = useContactForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await contactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Portfolio Contact",
        message: formData.message,
      });
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const socials = [
    { icon: Mail, label: "Email", href: "mailto:shubhgupta0988@gmail.com", handle: "shubhgupta0988@gmail.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/shubhgupta0988/", handle: "/in/shubhgupta0988" },
    { icon: Github, label: "GitHub", href: "https://github.com/shubhgupta0988", handle: "@shubhgupta0988" }
  ];

  return (
    <section id="contact" className="py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 animate-fade-in text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Build Something</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Open to opportunities, collaborations, or just a good technical discussion
          </p>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mt-4"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
          <div>
            <Card className="p-8 h-full">
              <h3 className="text-xl font-bold mb-6">Get in Touch</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={contactMutation.isPending}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={contactMutation.isPending}
                  />
                </div>
                <div>
                  <Input
                    placeholder="Subject (optional)"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={contactMutation.isPending}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={contactMutation.isPending}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 shadow-glow"
                  disabled={contactMutation.isPending}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {contactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6">Connect</h3>
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <social.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">{social.label}</div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <Coffee className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-semibold mb-1">Grab a coffee ☕</h4>
                  <p className="text-sm text-muted-foreground">
                    Prefer a casual chat? Let's discuss tech over coffee (virtual or real)
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
