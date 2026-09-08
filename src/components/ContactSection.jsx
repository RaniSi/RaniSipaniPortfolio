import {
    Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out — I'll get back to you soon.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Couldn't send the message",
          description: data.error || "Please try again in a moment.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Couldn't reach the server. Check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out.
          I'm always open to discussing new opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>

            <div className="space-y-6 justify-center">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Email</h4>
                  <a
                    href="mailto:ranisipani879@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    ranisipani879@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Phone</h4>
                  <a
                    href="tel:+11234567890"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    (+91)
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> Location</h4>
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Rajasthan, India
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4"> Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a href="https://www.linkedin.com/in/rani-sipani-7b3a20372/" target="_blank">
                  <Linkedin />
                </a>
                <a href="https://www.instagram.com/miss._.sipani?igsh=NTBvMG44azBoa3Ry" target="_blank">
                  <Instagram />
                </a>
                <a href="https://github.com/RaniSi" target="_blank">
                  <Github />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-xs">
            
            <h3 className="text-2xl font-semibold mb-6"> Send a Message</h3>
            <div>
              <form onSubmit={handleSubmit} method="POST">
                <div className="p-3">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {" "}
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text" 
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Name goes here..."
                    />
                </div>
                <div className="p-3">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {" "}
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email" 
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Email goes here..."
                    />
                </div>
                <div className="p-3">
                  <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2">
                  {" "}
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  />
                </div>
                <button type="submit"
                  disabled={isSubmitting}
                  className={cn("cosmic-button w-full flex items-center justify-center gap-2 p-2")}
                >
                  <Send size={16} />
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};


