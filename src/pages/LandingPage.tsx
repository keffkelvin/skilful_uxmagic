import React, { useState, useMemo } from 'react';
import { Icon } from '@iconify/react';

// ==========================================
// TypeScript Interfaces
// ==========================================

interface HeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

interface WriterCardProps {
  avatar: string;
  name: string;
  degree: string;
  rating: number;
  orders: number;
  bio: string;
  tags: string[];
  onHire: () => void;
}

interface TestimonialCardProps {
  stars: number;
  text: string;
  initials: string;
  name: string;
  status: string;
}

interface CalculatorWidgetProps {
  academicLevel: string;
  paperType: string;
  deadline: number;
  pages: number;
  totalPrice: number;
  isLoading: boolean;
  onLevelChange: (val: string) => void;
  onPaperChange: (val: string) => void;
  onDeadlineChange: (val: number) => void;
  onPagesChange: (val: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

// ==========================================
// Helper Sub-components
// ==========================================

const Header: React.FC<HeaderProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
  return (
    <header class="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" class="flex items-center gap-2">
          <div class="bg-primary text-primary-foreground p-2 rounded-lg flex items-center justify-center">
            <Icon icon="lucide:pencil" class="text-xl" />
          </div>
          <div>
            <span class="font-heading text-xl font-bold text-primary tracking-tight">Skilful</span>
            <span class="font-heading text-xl font-bold text-secondary tracking-tight">Writers</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav class="hidden md:flex items-center gap-8">
          <a href="#services" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Services</a>
          <a href="#how-it-works" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How It Works</a>
          <a href="#writers" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Our Writers</a>
          <a href="#testimonials" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Reviews</a>
        </nav>

        {/* Action Buttons */}
        <div class="flex items-center gap-4">
          <a href="#" class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hidden sm:inline-block">Log In</a>
          <a href="#calculator" class="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
            <span>Order Now</span>
            <Icon icon="lucide:arrow-right" class="text-base" />
          </a>
          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu} 
            class="md:hidden p-2 text-muted-foreground hover:text-primary focus:outline-none"
            aria-label="Toggle Menu"
          >
            <Icon icon={isMobileMenuOpen ? "lucide:x" : "lucide:menu"} class="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div class="md:hidden bg-card border-b border-border px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <a 
            href="#services" 
            onClick={toggleMobileMenu}
            class="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            Services
          </a>
          <a 
            href="#how-it-works" 
            onClick={toggleMobileMenu}
            class="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            How It Works
          </a>
          <a 
            href="#writers" 
            onClick={toggleMobileMenu}
            class="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            Our Writers
          </a>
          <a 
            href="#testimonials" 
            onClick={toggleMobileMenu}
            class="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
          >
            Reviews
          </a>
          <div class="pt-4 border-t border-border flex flex-col gap-3">
            <a href="#" class="text-center py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Log In</a>
          </div>
        </div>
      )}
    </header>
  );
};

const CalculatorWidget: React.FC<CalculatorWidgetProps> = ({
  academicLevel,
  paperType,
  deadline,
  pages,
  totalPrice,
  isLoading,
  onLevelChange,
  onPaperChange,
  onDeadlineChange,
  onPagesChange,
  onIncrement,
  onDecrement,
  onSubmit
}) => {
  return (
    <div id="calculator" class="bg-card border border-border rounded-2xl shadow-xl p-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>
      <h3 class="text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
        <Icon icon="lucide:calculator" class="text-primary" />
        <span>Calculate Your Price</span>
      </h3>

      <form class="space-y-4" onSubmit={onSubmit}>
        <div>
          <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Academic Level</label>
          <select 
            value={academicLevel} 
            onChange={(e) => onLevelChange(e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="highschool">High School</option>
            <option value="college">College (Undergrad)</option>
            <option value="university">University (Graduate)</option>
            <option value="phd">PhD / Doctoral</option>
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Type of Paper</label>
          <select 
            value={paperType} 
            onChange={(e) => onPaperChange(e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="essay">Essay (Any Type)</option>
            <option value="research">Research Paper</option>
            <option value="thesis">Thesis / Dissertation</option>
            <option value="admission">Admission Essay</option>
            <option value="editing">Proofreading & Editing</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Deadline</label>
            <select 
              value={deadline} 
              onChange={(e) => onDeadlineChange(parseFloat(e.target.value))}
              class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="14">14 Days</option>
              <option value="7">7 Days</option>
              <option value="3">3 Days</option>
              <option value="1">24 Hours</option>
              <option value="0.5">12 Hours</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Pages (275 words/pg)</label>
            <div class="flex items-center bg-muted border border-border rounded-lg">
              <button 
                type="button" 
                onClick={onDecrement}
                class="px-3 py-2 text-muted-foreground hover:text-primary font-bold transition-colors"
              >
                -
              </button>
              <input 
                type="number" 
                value={pages} 
                min="1" 
                max="100" 
                onChange={(e) => onPagesChange(parseInt(e.target.value) || 1)}
                class="w-full bg-transparent text-center text-sm font-semibold focus:outline-none py-2" 
              />
              <button 
                type="button" 
                onClick={onIncrement}
                class="px-3 py-2 text-muted-foreground hover:text-primary font-bold transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price Display */}
        <div class="bg-primary/5 rounded-xl p-4 flex items-center justify-between border border-primary/10">
          <div>
            <span class="text-xs text-muted-foreground block">Estimated Price</span>
            <span class="text-xs text-primary font-semibold">Free Title & Bibliography</span>
          </div>
          <div class="text-right">
            <span class="text-3xl font-bold text-primary">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          class="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-3 rounded-lg shadow transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Icon icon="lucide:loader-2" class="text-lg animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : (
            <>
              <span>Continue to Order</span>
              <Icon icon="lucide:arrow-right" class="text-lg" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

const StatsBar: React.FC = () => {
  return (
    <section class="bg-primary text-primary-foreground py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <span class="block text-3xl sm:text-4xl font-heading font-bold text-secondary">150,000+</span>
          <span class="text-xs sm:text-sm text-primary-foreground/80 font-medium">Completed Orders</span>
        </div>
        <div>
          <span class="block text-3xl sm:text-4xl font-heading font-bold text-secondary">1,200+</span>
          <span class="text-xs sm:text-sm text-primary-foreground/80 font-medium">Active Writers</span>
        </div>
        <div>
          <span class="block text-3xl sm:text-4xl font-heading font-bold text-secondary">99.2%</span>
          <span class="text-xs sm:text-sm text-primary-foreground/80 font-medium">Customer Satisfaction</span>
        </div>
        <div>
          <span class="block text-3xl sm:text-4xl font-heading font-bold text-secondary">100%</span>
          <span class="text-xs sm:text-sm text-primary-foreground/80 font-medium">On-Time Delivery</span>
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div class="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all space-y-4 flex flex-col justify-between">
      <div class="space-y-4">
        <div class="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
          <Icon icon={icon} class="text-2xl" />
        </div>
        <h3 class="text-xl font-heading font-bold text-foreground">{title}</h3>
        <p class="text-sm text-muted-foreground">{description}</p>
      </div>
      <a href="#calculator" class="text-primary font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all pt-2">
        <span>Order Now</span>
        <Icon icon="lucide:arrow-right" class="text-xs" />
      </a>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: "lucide:file-text",
      title: "Academic Essay Writing",
      description: "Analytical, persuasive, argumentative, or narrative essays tailored to standard college and university requirements."
    },
    {
      icon: "lucide:clipboard",
      title: "Research Papers",
      description: "In-depth research and literature reviews utilizing peer-reviewed sources, fully cited in APA, MLA, Chicago, or Harvard."
    },
    {
      icon: "lucide:layers",
      title: "Thesis & Dissertations",
      description: "Comprehensive support for senior projects, master's theses, and doctoral dissertations, chapter-by-chapter."
    },
    {
      icon: "lucide:refresh-cw",
      title: "Editing & Proofreading",
      description: "Polishing your existing drafts, correcting grammar, improving flow, coherence, formatting, and structural integrity."
    },
    {
      icon: "lucide:book-open",
      title: "Case Studies & Reports",
      description: "Detailed business or scientific analyses with real-world application, clear problem identification, and recommendations."
    },
    {
      icon: "lucide:bookmark",
      title: "Admission Essays",
      description: "Compelling personal statements and application essays to help you stand out to college and university admissions boards."
    }
  ];

  return (
    <section id="services" class="py-16 md:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-foreground">Our Custom Writing Offerings</h2>
          <p class="text-muted-foreground">Whatever your academic or professional needs, we have a specialized, vetted writer ready to deliver high-quality content.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard 
              key={idx}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" class="py-16 md:py-24 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-foreground">Simple 4-Step Process</h2>
          <p class="text-muted-foreground">Getting a high-quality paper crafted is fast, simple, and entirely transparent.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Step 1 */}
          <div class="relative space-y-4 text-center md:text-left">
            <div class="w-12 h-12 bg-primary text-primary-foreground font-heading font-bold text-xl rounded-full flex items-center justify-center mx-auto md:mx-0">
              1
            </div>
            <h3 class="text-lg font-bold text-foreground">Submit Details</h3>
            <p class="text-sm text-muted-foreground">Fill out our detailed order form specifying academic level, page count, formatting guidelines, and resources.</p>
          </div>

          {/* Step 2 */}
          <div class="relative space-y-4 text-center md:text-left">
            <div class="w-12 h-12 bg-primary text-primary-foreground font-heading font-bold text-xl rounded-full flex items-center justify-center mx-auto md:mx-0">
              2
            </div>
            <h3 class="text-lg font-bold text-foreground">Choose Your Writer</h3>
            <p class="text-sm text-muted-foreground">Select from our pool of qualified, native English speaking subject experts based on bids, qualifications, and ratings.</p>
          </div>

          {/* Step 3 */}
          <div class="relative space-y-4 text-center md:text-left">
            <div class="w-12 h-12 bg-primary text-primary-foreground font-heading font-bold text-xl rounded-full flex items-center justify-center mx-auto md:mx-0">
              3
            </div>
            <h3 class="text-lg font-bold text-foreground">Track Progress</h3>
            <p class="text-sm text-muted-foreground">Communicate directly with your assigned writer inside your dashboard. Request drafts and updates in real-time.</p>
          </div>

          {/* Step 4 */}
          <div class="relative space-y-4 text-center md:text-left">
            <div class="w-12 h-12 bg-secondary text-secondary-foreground font-heading font-bold text-xl rounded-full flex items-center justify-center mx-auto md:mx-0">
              4
            </div>
            <h3 class="text-lg font-bold text-foreground">Review & Download</h3>
            <p class="text-sm text-muted-foreground">Download your completed paper, review the formatting, and request free revisions if anything needs adjustment.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const WriterCard: React.FC<WriterCardProps> = ({
  avatar,
  name,
  degree,
  rating,
  orders,
  bio,
  tags,
  onHire
}) => {
  return (
    <div class="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <img src={avatar} alt={name} class="w-16 h-16 rounded-full object-cover border-2 border-primary/20" />
          <div>
            <h4 class="font-heading font-bold text-lg text-foreground">{name}</h4>
            <p class="text-xs text-primary font-semibold">{degree}</p>
            <div class="flex items-center gap-1 text-secondary mt-1">
              <Icon icon="lucide:star" class="fill-secondary text-sm" />
              <span class="text-xs font-bold text-foreground">{rating.toFixed(1)}/5.0</span>
              <span class="text-xs text-muted-foreground">({orders} orders completed)</span>
            </div>
          </div>
        </div>
        <p class="text-sm text-muted-foreground">"{bio}"</p>
        <div class="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span key={idx} class="bg-muted px-2.5 py-1 rounded text-xs text-muted-foreground">{tag}</span>
          ))}
        </div>
      </div>
      <div class="pt-6 border-t border-border mt-6 flex items-center justify-between">
        <span class="text-xs text-emerald-600 font-semibold flex items-center gap-1">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Available now
        </span>
        <button 
          onClick={onHire}
          class="bg-primary text-primary-foreground hover:bg-primary/95 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all"
        >
          Hire Writer
        </button>
      </div>
    </div>
  );
};

const WritersSection: React.FC<{ onHireWriter: (writerName: string) => void }> = ({ onHireWriter }) => {
  const writers = [
    {
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      name: "Dr. Robert Vance",
      degree: "PhD in English Literature",
      rating: 4.9,
      orders: 482,
      bio: "Specializing in complex humanities and literature dissertations. Committed to thorough research and flawless formatting.",
      tags: ["Literature", "History", "Philosophy"]
    },
    {
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
      name: "Prof. Sarah Jenkins",
      degree: "MSc in Clinical Psychology",
      rating: 5.0,
      orders: 612,
      bio: "Expert in psychology, sociology, and medical research papers. I focus on evidence-based analyses and structured formatting.",
      tags: ["Psychology", "Medicine", "Sociology"]
    },
    {
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80",
      name: "David Miller, MBA",
      degree: "MBA in Strategic Management",
      rating: 4.8,
      orders: 345,
      bio: "Providing high-quality business plans, marketing research, and case analyses. Let's make your management report stand out.",
      tags: ["Business", "Marketing", "Finance"]
    }
  ];

  return (
    <section id="writers" class="py-16 md:py-24 bg-background">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-foreground">Meet Our Top Rated Experts</h2>
          <p class="text-muted-foreground">We work exclusively with certified writers holding Master's or PhD degrees in their respective fields.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {writers.map((writer, idx) => (
            <WriterCard 
              key={idx}
              avatar={writer.avatar}
              name={writer.name}
              degree={writer.degree}
              rating={writer.rating}
              orders={writer.orders}
              bio={writer.bio}
              tags={writer.tags}
              onHire={() => onHireWriter(writer.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ stars, text, initials, name, status }) => {
  return (
    <div class="bg-card border border-border p-6 rounded-xl relative flex flex-col justify-between">
      <div>
        <div class="flex items-center gap-1 text-secondary mb-4">
          {Array.from({ length: stars }).map((_, i) => (
            <Icon key={i} icon="lucide:star" class="fill-secondary text-base" />
          ))}
        </div>
        <p class="text-sm text-muted-foreground italic mb-6">"{text}"</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
          {initials}
        </div>
        <div>
          <h5 class="font-bold text-sm text-foreground">{name}</h5>
          <span class="text-xs text-muted-foreground">{status}</span>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      stars: 5,
      text: "I was struggling with my senior economics dissertation and was short on time. Dr. Robert Vance delivered an incredible analysis that exceeded my expectations. I got an A!",
      initials: "AM",
      name: "Amanda Miller",
      status: "Undergrad Student"
    },
    {
      stars: 5,
      text: "The customer service team is fantastic. I needed some last-minute revisions and they helped me coordinate with the writer instantly. Fast turnaround and extremely high quality.",
      initials: "JL",
      name: "Justin Lee",
      status: "MBA Graduate"
    },
    {
      stars: 5,
      text: "I've ordered multiple research papers and reports over the past year. Skilful Writers is the only service that consistently delivers plagiarism-free, professional academic work.",
      initials: "SK",
      name: "Sarah K.",
      status: "Nursing Student"
    }
  ];

  return (
    <section id="testimonials" class="py-16 md:py-24 bg-muted">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-foreground">What Our Clients Say</h2>
          <p class="text-muted-foreground">Real reviews from students, researchers, and professionals who trust Skilful Writers.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <TestimonialCard 
              key={idx}
              stars={t.stars}
              text={t.text}
              initials={t.initials}
              name={t.name}
              status={t.status}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection: React.FC = () => {
  return (
    <section class="py-16 bg-primary text-primary-foreground relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary via-primary to-primary"></div>
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <h2 class="text-3xl md:text-4xl font-heading font-bold">Struggling with a Tight Deadline?</h2>
        <p class="text-primary-foreground/80 max-w-xl mx-auto">
          Let our professional academic writers take the stress out of your schoolwork. Get a high-quality paper starting at just $10/page.
        </p>
        <div class="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
          <a href="#calculator" class="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2">
            <span>Order Your Paper Now</span>
            <Icon icon="lucide:arrow-right" class="text-lg" />
          </a>
          <a href="#services" class="border border-primary-foreground/30 hover:bg-primary-foreground/10 px-8 py-3 rounded-lg font-bold transition-all">
            View Services
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer class="bg-card border-t border-border py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <div class="bg-primary text-primary-foreground p-2 rounded-lg flex items-center justify-center">
              <Icon icon="lucide:pencil" class="text-xl" />
            </div>
            <span class="font-heading text-lg font-bold text-primary">SkilfulWriters</span>
          </div>
          <p class="text-xs text-muted-foreground">
            Premium academic and professional writing assistance. Dedicated to helping students and business owners succeed.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-muted-foreground hover:text-primary"><Icon icon="lucide:globe" class="text-lg" /></a>
            <a href="#" class="text-muted-foreground hover:text-primary"><Icon icon="lucide:shield" class="text-lg" /></a>
            <a href="#" class="text-muted-foreground hover:text-primary"><Icon icon="lucide:lock" class="text-lg" /></a>
          </div>
        </div>

        <div>
          <h5 class="font-heading font-bold text-sm text-foreground mb-4">Our Services</h5>
          <ul class="space-y-2 text-xs">
            <li><a href="#services" class="text-muted-foreground hover:text-primary">Custom Essay Writing</a></li>
            <li><a href="#services" class="text-muted-foreground hover:text-primary">Research Paper Writing</a></li>
            <li><a href="#services" class="text-muted-foreground hover:text-primary">Thesis Writing</a></li>
            <li><a href="#services" class="text-muted-foreground hover:text-primary">Editing & Proofreading</a></li>
          </ul>
        </div>

        <div>
          <h5 class="font-heading font-bold text-sm text-foreground mb-4">Quick Links</h5>
          <ul class="space-y-2 text-xs">
            <li><a href="#how-it-works" class="text-muted-foreground hover:text-primary">How It Works</a></li>
            <li><a href="#writers" class="text-muted-foreground hover:text-primary">Our Writers</a></li>
            <li><a href="#testimonials" class="text-muted-foreground hover:text-primary">Customer Testimonials</a></li>
          </ul>
        </div>

        <div>
          <h5 class="font-heading font-bold text-sm text-foreground mb-4">Contact & Support</h5>
          <ul class="space-y-2 text-xs">
            <li class="flex items-center gap-2 text-muted-foreground">
              <Icon icon="lucide:mail" class="text-sm" />
              <span>support@skilfulwriters.com</span>
            </li>
            <li class="flex items-center gap-2 text-muted-foreground">
              <Icon icon="lucide:phone" class="text-sm" />
              <span>+1 (800) 555-0199</span>
            </li>
            <li class="flex items-center gap-2 text-muted-foreground">
              <Icon icon="lucide:clock" class="text-sm" />
              <span>24/7 Live Chat Support</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-xs text-muted-foreground">&copy; 2024 SkilfulWriters. All rights reserved. Disclaimer: Our writing is intended for research and reference purposes only.</p>
        <div class="flex items-center gap-2">
          <Icon icon="lucide:credit-card" class="text-muted-foreground text-xl" />
          <span class="text-xs text-muted-foreground">Secure SSL Payments</span>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// Main Page Component
// ==========================================

const LandingPage: React.FC = () => {
  // State Variables
  const [academicLevel, setAcademicLevel] = useState<string>("college");
  const [paperType, setPaperType] = useState<string>("essay");
  const [deadline, setDeadline] = useState<number>(3);
  const [pages, setPages] = useState<number>(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Derived State: Pricing Calculation
  const totalPrice = useMemo(() => {
    let basePrice = 10; // High School
    if (academicLevel === 'college') basePrice = 14;
    if (academicLevel === 'university') basePrice = 18;
    if (academicLevel === 'phd') basePrice = 24;

    // Paper multiplier
    let paperMultiplier = 1.0;
    if (paperType === 'thesis') paperMultiplier = 1.3;
    if (paperType === 'admission') paperMultiplier = 1.2;
    if (paperType === 'editing') paperMultiplier = 0.6;

    // Deadline multiplier
    let deadlineMultiplier = 1.0;
    if (deadline === 7) deadlineMultiplier = 1.15;
    if (deadline === 3) deadlineMultiplier = 1.35;
    if (deadline === 1) deadlineMultiplier = 1.75;
    if (deadline === 0.5) deadlineMultiplier = 2.2;

    return basePrice * paperMultiplier * deadlineMultiplier * pages;
  }, [academicLevel, paperType, deadline, pages]);

  // Event Handlers
  const handleLevelChange = (val: string) => {
    setAcademicLevel(val);
  };

  const handlePaperChange = (val: string) => {
    setPaperType(val);
  };

  const handleDeadlineChange = (val: number) => {
    setDeadline(val);
  };

  const handlePagesChange = (val: number) => {
    setPages(Math.max(1, val));
  };

  const incrementPages = () => {
    setPages((prev) => prev + 1);
  };

  const decrementPages = () => {
    setPages((prev) => Math.max(1, prev - 1));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Order initialized! Level: ${academicLevel}, Type: ${paperType}, Pages: ${pages}. Total: $${totalPrice.toFixed(2)}`);
    }, 1500);
  };

  const handleHireWriter = (writerName: string) => {
    // Pre-fill or focus calculator with a custom message
    setSuccessMessage(`You have selected ${writerName} as your preferred writer! Please complete the details below to proceed.`);
    const calcElement = document.getElementById('calculator');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div class="min-h-screen w-full bg-background flex flex-col relative font-sans text-foreground">
      {/* Header */}
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />

      {/* Hero Section */}
      <section class="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
              <Icon icon="lucide:shield-check" class="text-sm" />
              <span>100% Confidential & Plagiarism-Free</span>
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
              Where Academic Excellence Meets <span class="text-primary underline decoration-secondary decoration-4">Expert Craftsmanship</span>
            </h1>
            <p class="text-lg text-muted-foreground max-w-xl">
              Get premium essays, research papers, and professional writing done by elite writers. On time, strictly formatted, and fully customized to your instructions.
            </p>

            {/* Trust Badges */}
            <div class="pt-4 grid grid-cols-3 gap-4 border-t border-border max-w-md">
              <div class="flex flex-col">
                <span class="text-2xl font-bold text-primary font-heading">4.9/5</span>
                <span class="text-xs text-muted-foreground flex items-center gap-1">
                  <Icon icon="lucide:star" class="text-secondary fill-secondary text-xs" /> Trustpilot Rating
                </span>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl font-bold text-primary font-heading">3hr</span>
                <span class="text-xs text-muted-foreground">Minimum Deadline</span>
              </div>
              <div class="flex flex-col">
                <span class="text-2xl font-bold text-primary font-heading">100%</span>
                <span class="text-xs text-muted-foreground">On-Time Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero Calculator Widget */}
          <div class="lg:col-span-5">
            {successMessage && (
              <div class="mb-4 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm flex items-start gap-2 shadow-sm animate-fadeIn">
                <Icon icon="lucide:check-circle" class="text-emerald-600 text-lg shrink-0 mt-0.5" />
                <div>
                  <p class="font-semibold">Success</p>
                  <p class="text-xs text-emerald-700">{successMessage}</p>
                </div>
                <button onClick={() => setSuccessMessage(null)} class="ml-auto text-emerald-600 hover:text-emerald-800">
                  <Icon icon="lucide:x" class="text-base" />
                </button>
              </div>
            )}

            <CalculatorWidget 
              academicLevel={academicLevel}
              paperType={paperType}
              deadline={deadline}
              pages={pages}
              totalPrice={totalPrice}
              isLoading={isSubmitting}
              onLevelChange={handleLevelChange}
              onPaperChange={handlePaperChange}
              onDeadlineChange={handleDeadlineChange}
              onPagesChange={handlePagesChange}
              onIncrement={incrementPages}
              onDecrement={decrementPages}
              onSubmit={handleOrderSubmit}
            />
          </div>

        </div>
      </section>

      {/* Trust Stats Bar */}
      <StatsBar />

      {/* Services Section */}
      <ServicesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Writers Showcase Section */}
      <WritersSection onHireWriter={handleHireWriter} />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;