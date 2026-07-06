import React, { useState, useCallback } from 'react';
import { Icon } from '@iconify/react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface AddonsState {
  plagiarism: boolean;
  support: boolean;
  editor: boolean;
}

interface PaymentDetailsState {
  cardholderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
}

interface HeaderProps {}

interface ProgressTrackerProps {
  currentStep: number;
}

interface StepPaperDetailsProps {
  paperType: string;
  subjectArea: string;
  topic: string;
  instructions: string;
  attachedFiles: File[];
  academicLevel: string;
  formattingStyle: string;
  spacing: string;
  pages: number;
  deadline: string;
  onInputChange: (field: string, value: any) => void;
  onChangePages: (amount: number) => void;
  onFileUpload: (files: FileList | null) => void;
  onRemoveFile: (index: number) => void;
  onNext: () => void;
}

interface StepWriterAddonsProps {
  writerLevel: string;
  addons: AddonsState;
  onWriterLevelChange: (level: string) => void;
  onToggleAddon: (addon: keyof AddonsState) => void;
  onNext: () => void;
  onBack: () => void;
}

interface StepPaymentProps {
  paymentDetails: PaymentDetailsState;
  onInputChange: (field: keyof PaymentDetailsState, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  isLoading: boolean;
}

interface OrderSummaryProps {
  paperType: string;
  subjectArea: string;
  academicLevel: string;
  pages: number;
  spacing: string;
  deadline: string;
  writerLevel: string;
  addons: AddonsState;
  promoCode: string;
  promoDiscount: number;
  promoApplied: boolean;
  onPromoCodeChange: (code: string) => void;
  onApplyPromo: () => void;
  calculatedPrices: {
    subtotal: number;
    addonsTotal: number;
    discountAmount: number;
    total: number;
  };
}

interface FooterProps {}

// ==========================================
// HELPER SUB-COMPONENTS
// ==========================================

const Header: React.FC<HeaderProps> = () => {
  return (
    <header class="bg-card border-b border-border">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" class="flex items-center gap-2">
          <div class="bg-primary text-primary-foreground p-2 rounded-lg flex items-center justify-center">
            <Icon icon="lucide:pencil" class="text-xl" />
          </div>
          <div>
            <span class="font-heading text-xl font-bold text-primary tracking-tight">Skilful</span>
            <span class="font-heading text-xl font-bold text-secondary tracking-tight">Writers</span>
          </div>
        </a>
        <div class="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
          <span class="flex items-center gap-1">
            <Icon icon="lucide:shield-check" class="text-primary" /> Secure 256-Bit SSL
          </span>
          <span class="hidden sm:inline">|</span>
          <span class="hidden sm:inline flex items-center gap-1">
            <Icon icon="lucide:clock" class="text-primary" /> 24/7 Support
          </span>
        </div>
      </div>
    </header>
  );
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep }) => {
  const getStepClass = (step: number) => {
    if (currentStep > step) {
      return 'bg-primary text-primary-foreground shadow-md';
    } else if (currentStep === step) {
      return 'bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20';
    } else {
      return 'bg-muted text-muted-foreground border border-border';
    }
  };

  const getLabelClass = (step: number) => {
    return currentStep >= step ? 'text-primary font-semibold' : 'text-muted-foreground';
  };

  const getLineWidth = () => {
    if (currentStep === 1) return 'w-0';
    if (currentStep === 2) return 'w-1/2';
    return 'w-full';
  };

  return (
    <div class="mb-8 max-w-3xl mx-auto">
      <div class="flex items-center justify-between relative">
        {/* Connecting Line Background */}
        <div class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-muted -z-10"></div>
        {/* Active Connecting Line */}
        <div
          class={`absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-300 ${getLineWidth()}`}
        ></div>

        {/* Step 1 */}
        <div class="flex flex-col items-center gap-2">
          <div class={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${getStepClass(1)}`}>
            1
          </div>
          <span class={`text-xs ${getLabelClass(1)}`}>Paper Details</span>
        </div>

        {/* Step 2 */}
        <div class="flex flex-col items-center gap-2">
          <div class={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${getStepClass(2)}`}>
            2
          </div>
          <span class={`text-xs ${getLabelClass(2)}`}>Writer & Add-ons</span>
        </div>

        {/* Step 3 */}
        <div class="flex flex-col items-center gap-2">
          <div class={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${getStepClass(3)}`}>
            3
          </div>
          <span class={`text-xs ${getLabelClass(3)}`}>Review & Pay</span>
        </div>
      </div>
    </div>
  );
};

const StepPaperDetails: React.FC<StepPaperDetailsProps> = ({
  paperType,
  subjectArea,
  topic,
  instructions,
  attachedFiles,
  academicLevel,
  formattingStyle,
  spacing,
  pages,
  deadline,
  onInputChange,
  onChangePages,
  onFileUpload,
  onRemoveFile,
  onNext,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files);
    }
  };

  return (
    <div class="space-y-6">
      <h2 class="text-xl font-heading font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border">
        <Icon icon="lucide:file-text" class="text-primary" />
        <span>Step 1: Tell us about your paper</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Type of Paper</label>
          <select
            value={paperType}
            onChange={(e) => onInputChange('paperType', e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="essay">Essay (Any Type)</option>
            <option value="research">Research Paper</option>
            <option value="thesis">Thesis / Dissertation</option>
            <option value="case-study">Case Study</option>
            <option value="admission">Admission Essay</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Subject Area</label>
          <select
            value={subjectArea}
            onChange={(e) => onInputChange('subjectArea', e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="business">Business & Management</option>
            <option value="english">English & Literature</option>
            <option value="psychology">Psychology & Medicine</option>
            <option value="history">History & Political Science</option>
            <option value="computer">Computer Science & IT</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Topic</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => onInputChange('topic', e.target.value)}
          placeholder="e.g. Impact of Social Media on Modern Marketing"
          class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      <div>
        <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Paper Instructions</label>
        <textarea
          rows={4}
          value={instructions}
          onChange={(e) => onInputChange('instructions', e.target.value)}
          placeholder="Paste your detailed instructions, rubric, formatting guidelines, or outline here..."
          class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
        ></textarea>
      </div>

      {/* File Upload */}
      <div>
        <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Attach Source Files (Optional)</label>
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          class={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/50 hover:border-primary'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => onFileUpload(e.target.files)}
            multiple
            class="hidden"
          />
          <Icon icon="lucide:upload" class="text-3xl text-muted-foreground mx-auto mb-2" />
          <span class="block text-sm font-semibold text-foreground">Drag and drop files here, or click to browse</span>
          <span class="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT or PNG (Max 50MB total)</span>
        </div>

        {attachedFiles.length > 0 && (
          <div class="mt-3 space-y-2">
            <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">Uploaded Files:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {attachedFiles.map((file, idx) => (
                <div key={idx} class="flex items-center justify-between bg-muted p-2 rounded-lg border border-border text-xs">
                  <span class="truncate max-w-[180px] font-medium text-foreground">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFile(idx);
                    }}
                    class="text-destructive hover:text-destructive/80 p-1"
                  >
                    <Icon icon="lucide:trash-2" class="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Specs Grid */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Academic Level</label>
          <select
            value={academicLevel}
            onChange={(e) => onInputChange('academicLevel', e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="highschool">High School</option>
            <option value="college">College</option>
            <option value="university">University</option>
            <option value="phd">PhD</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Formatting Style</label>
          <select
            value={formattingStyle}
            onChange={(e) => onInputChange('formattingStyle', e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="apa">APA 7th Edition</option>
            <option value="mla">MLA 9th Edition</option>
            <option value="harvard">Harvard</option>
            <option value="chicago">Chicago / Turabian</option>
            <option value="notapplicable">Not Applicable / Other</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Spacing</label>
          <select
            value={spacing}
            onChange={(e) => onInputChange('spacing', e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="double">Double Spaced</option>
            <option value="single">Single Spaced (x2 Price)</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Pages (275 words/pg)</label>
          <div class="flex items-center bg-muted border border-border rounded-lg">
            <button
              type="button"
              class="px-4 py-2.5 text-muted-foreground hover:text-primary font-bold transition-colors"
              onClick={() => onChangePages(-1)}
            >
              -
            </button>
            <input
              type="number"
              value={pages}
              min={1}
              max={100}
              onChange={(e) => onInputChange('pages', Math.max(1, parseInt(e.target.value) || 1))}
              class="w-full bg-transparent text-center text-sm font-semibold focus:outline-none py-2"
            />
            <button
              type="button"
              class="px-4 py-2.5 text-muted-foreground hover:text-primary font-bold transition-colors"
              onClick={() => onChangePages(1)}
            >
              +
            </button>
          </div>
        </div>
        <div>
          <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Deadline</label>
          <select
            value={deadline}
            onChange={(e) => onInputChange('deadline', e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="14">14 Days</option>
            <option value="7">7 Days</option>
            <option value="3">3 Days</option>
            <option value="1">24 Hours</option>
            <option value="0.5">12 Hours</option>
          </select>
        </div>
      </div>

      <div class="pt-6 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          class="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Writer & Add-ons</span>
          <Icon icon="lucide:arrow-right" class="text-base" />
        </button>
      </div>
    </div>
  );
};

const StepWriterAddons: React.FC<StepWriterAddonsProps> = ({
  writerLevel,
  addons,
  onWriterLevelChange,
  onToggleAddon,
  onNext,
  onBack,
}) => {
  return (
    <div class="space-y-6">
      <h2 class="text-xl font-heading font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border">
        <Icon icon="lucide:user" class="text-primary" />
        <span>Step 2: Choose Writer Quality & Add-ons</span>
      </h2>

      {/* Writer Level Selector */}
      <div>
        <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Writer Category</label>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Standard */}
          <label
            onClick={() => onWriterLevelChange('standard')}
            class={`border rounded-xl p-4 cursor-pointer transition-all block relative ${
              writerLevel === 'standard' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-primary'
            }`}
          >
            <input
              type="radio"
              name="writer-level"
              value="standard"
              checked={writerLevel === 'standard'}
              onChange={() => {}}
              class="absolute top-4 right-4 accent-primary"
            />
            <h4 class="font-heading font-bold text-base text-foreground">Standard</h4>
            <p class="text-xs text-muted-foreground mt-1">Qualified writer with standard rating. Perfect for simple essays.</p>
            <span class="block text-xs font-bold text-primary mt-3">No extra charge</span>
          </label>

          {/* Premium */}
          <label
            onClick={() => onWriterLevelChange('premium')}
            class={`border rounded-xl p-4 cursor-pointer transition-all block relative ${
              writerLevel === 'premium' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-primary'
            }`}
          >
            <input
              type="radio"
              name="writer-level"
              value="premium"
              checked={writerLevel === 'premium'}
              onChange={() => {}}
              class="absolute top-4 right-4 accent-primary"
            />
            <h4 class="font-heading font-bold text-base text-foreground flex items-center gap-1">
              <span>Premium</span>
              <Icon icon="lucide:star" class="text-secondary fill-secondary text-xs" />
            </h4>
            <p class="text-xs text-muted-foreground mt-1">Top-rated native writer with 5+ years experience. Recommended.</p>
            <span class="block text-xs font-bold text-primary mt-3">+25% on base price</span>
          </label>

          {/* Platinum */}
          <label
            onClick={() => onWriterLevelChange('platinum')}
            class={`border rounded-xl p-4 cursor-pointer transition-all block relative ${
              writerLevel === 'platinum' ? 'border-primary bg-primary/5 ring-2 ring-primary/20' : 'border-border hover:border-primary'
            }`}
          >
            <input
              type="radio"
              name="writer-level"
              value="platinum"
              checked={writerLevel === 'platinum'}
              onChange={() => {}}
              class="absolute top-4 right-4 accent-primary"
            />
            <h4 class="font-heading font-bold text-base text-foreground flex items-center gap-1">
              <span>Platinum</span>
              <Icon icon="lucide:zap" class="text-secondary fill-secondary text-xs" />
            </h4>
            <p class="text-xs text-muted-foreground mt-1">Elite PhD writer. Best for complex research, theses, or dissertations.</p>
            <span class="block text-xs font-bold text-primary mt-3">+45% on base price</span>
          </label>
        </div>
      </div>

      {/* Add-ons Selector */}
      <div>
        <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Premium Add-ons</label>
        <div class="space-y-3">
          {/* Add-on 1 */}
          <label
            onClick={() => onToggleAddon('plagiarism')}
            class={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              addons.plagiarism ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                checked={addons.plagiarism}
                onChange={() => {}}
                class="mt-1 rounded text-primary accent-primary"
              />
              <div>
                <span class="text-sm font-bold text-foreground block">Official Plagiarism Report</span>
                <span class="text-xs text-muted-foreground">Certified report verifying 100% original content.</span>
              </div>
            </div>
            <span class="text-xs font-bold text-primary">+$9.99</span>
          </label>

          {/* Add-on 2 */}
          <label
            onClick={() => onToggleAddon('support')}
            class={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              addons.support ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                checked={addons.support}
                onChange={() => {}}
                class="mt-1 rounded text-primary accent-primary"
              />
              <div>
                <span class="text-sm font-bold text-foreground block">VIP Customer Support</span>
                <span class="text-xs text-muted-foreground">Dedicated support agent & priority updates via SMS.</span>
              </div>
            </div>
            <span class="text-xs font-bold text-primary">+$12.99</span>
          </label>

          {/* Add-on 3 */}
          <label
            onClick={() => onToggleAddon('editor')}
            class={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              addons.editor ? 'border-primary bg-primary/5' : 'border-border bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div class="flex items-start gap-3">
              <input
                type="checkbox"
                checked={addons.editor}
                onChange={() => {}}
                class="mt-1 rounded text-primary accent-primary"
              />
              <div>
                <span class="text-sm font-bold text-foreground block">Professional Editor Proofreading</span>
                <span class="text-xs text-muted-foreground">A secondary certified editor reviews and polishes the paper.</span>
              </div>
            </div>
            <span class="text-xs font-bold text-primary">+$15.00</span>
          </label>
        </div>
      </div>

      <div class="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          class="border border-border hover:bg-muted text-foreground font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="lucide:arrow-left" class="text-base" />
          <span>Back to Details</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          class="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>Next: Review & Pay</span>
          <Icon icon="lucide:arrow-right" class="text-base" />
        </button>
      </div>
    </div>
  );
};

const StepPayment: React.FC<StepPaymentProps> = ({
  paymentDetails,
  onInputChange,
  onSubmit,
  onBack,
  isLoading,
}) => {
  return (
    <form onSubmit={onSubmit} class="space-y-6">
      <h2 class="text-xl font-heading font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border">
        <Icon icon="lucide:credit-card" class="text-primary" />
        <span>Step 3: Secure Payment & Order Finalization</span>
      </h2>

      <div class="space-y-4">
        <div class="bg-primary/5 border border-primary/10 rounded-xl p-4">
          <h4 class="font-heading font-bold text-sm text-primary mb-2 flex items-center gap-1">
            <Icon icon="lucide:info" class="text-sm" />
            <span>Guarantee Policy</span>
          </h4>
          <p class="text-xs text-muted-foreground leading-relaxed">
            Your payment is held securely in escrow. Funds are only released to the writer after you review and approve the final paper draft. Includes unlimited free revisions for up to 14 days.
          </p>
        </div>

        {/* Payment Form Fields */}
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Cardholder Name</label>
            <input
              type="text"
              required
              value={paymentDetails.cardholderName}
              onChange={(e) => onInputChange('cardholderName', e.target.value)}
              placeholder="John Doe"
              class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Card Number</label>
            <div class="relative">
              <input
                type="text"
                required
                maxLength={19}
                value={paymentDetails.cardNumber}
                onChange={(e) => {
                  // Basic formatting for card number
                  const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                  onInputChange('cardNumber', val);
                }}
                placeholder="4111 1111 1111 1111"
                class="w-full bg-muted border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <Icon icon="lucide:credit-card" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Expiration Date</label>
              <input
                type="text"
                required
                maxLength={5}
                value={paymentDetails.expirationDate}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val.length === 2 && !val.includes('/')) {
                    val += '/';
                  }
                  onInputChange('expirationDate', val);
                }}
                placeholder="MM/YY"
                class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">CVV / CVC</label>
              <input
                type="password"
                required
                maxLength={4}
                value={paymentDetails.cvv}
                onChange={(e) => onInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                placeholder="•••"
                class="w-full bg-muted border border-border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div class="flex items-center justify-between border-t border-border pt-4 mt-6">
          <span class="text-xs text-muted-foreground flex items-center gap-1">
            <Icon icon="lucide:lock" class="text-primary text-sm" />
            <span>Encrypted checkout</span>
          </span>
          <div class="flex gap-2 text-2xl text-muted-foreground">
            <Icon icon="logos:visa" />
            <Icon icon="logos:mastercard" />
            <Icon icon="logos:discover" />
          </div>
        </div>
      </div>

      <div class="pt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          class="border border-border hover:bg-muted text-foreground font-semibold px-6 py-3 rounded-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Icon icon="lucide:arrow-left" class="text-base" />
          <span>Back to Add-ons</span>
        </button>
        <button
          type="submit"
          disabled={isLoading}
          class="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 py-3 rounded-lg shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Icon icon="lucide:loader-2" class="animate-spin text-base" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay & Complete Order</span>
              <Icon icon="lucide:check" class="text-base" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
  paperType,
  subjectArea,
  academicLevel,
  pages,
  spacing,
  deadline,
  writerLevel,
  addons,
  promoCode,
  promoDiscount,
  promoApplied,
  onPromoCodeChange,
  onApplyPromo,
  calculatedPrices,
}) => {
  const formatPaperType = (type: string) => {
    switch (type) {
      case 'essay': return 'Essay (Any Type)';
      case 'research': return 'Research Paper';
      case 'thesis': return 'Thesis / Dissertation';
      case 'case-study': return 'Case Study';
      case 'admission': return 'Admission Essay';
      default: return type;
    }
  };

  const formatSubject = (subject: string) => {
    switch (subject) {
      case 'business': return 'Business & Management';
      case 'english': return 'English & Literature';
      case 'psychology': return 'Psychology & Medicine';
      case 'history': return 'History & Political Science';
      case 'computer': return 'Computer Science & IT';
      default: return subject;
    }
  };

  const formatLevel = (level: string) => {
    switch (level) {
      case 'highschool': return 'High School';
      case 'college': return 'College';
      case 'university': return 'University';
      case 'phd': return 'PhD';
      default: return level;
    }
  };

  const formatDeadline = (dl: string) => {
    switch (dl) {
      case '14': return '14 Days';
      case '7': return '7 Days';
      case '3': return '3 Days';
      case '1': return '24 Hours';
      case '0.5': return '12 Hours';
      default: return `${dl} Days`;
    }
  };

  const words = spacing === 'single' ? pages * 550 : pages * 275;

  return (
    <div class="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-6">
      <h3 class="text-lg font-heading font-bold text-foreground mb-4 pb-2 border-b border-border">Order Summary</h3>

      {/* Summary Details */}
      <div class="space-y-3 text-sm">
        <div class="flex justify-between">
          <span class="text-muted-foreground">Type:</span>
          <span class="font-semibold text-foreground">{formatPaperType(paperType)}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Subject:</span>
          <span class="font-semibold text-foreground">{formatSubject(subjectArea)}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Academic Level:</span>
          <span class="font-semibold text-foreground">{formatLevel(academicLevel)}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Pages:</span>
          <span class="font-semibold text-foreground">{pages} Page{pages > 1 ? 's' : ''} ({words} words)</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Deadline:</span>
          <span class="font-semibold text-foreground">{formatDeadline(deadline)}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted-foreground">Writer Level:</span>
          <span class="font-semibold text-foreground capitalize">{writerLevel}</span>
        </div>

        {addons.plagiarism && (
          <div class="flex justify-between text-xs text-green-600 font-medium">
            <span>+ Plagiarism Report:</span>
            <span>$9.99</span>
          </div>
        )}
        {addons.support && (
          <div class="flex justify-between text-xs text-green-600 font-medium">
            <span>+ VIP Support:</span>
            <span>$12.99</span>
          </div>
        )}
        {addons.editor && (
          <div class="flex justify-between text-xs text-green-600 font-medium">
            <span>+ Editor Edit:</span>
            <span>$15.00</span>
          </div>
        )}
      </div>

      {/* Promo Code */}
      <div class="pt-4 border-t border-border mt-4">
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Promo Code"
            value={promoCode}
            onChange={(e) => onPromoCodeChange(e.target.value)}
            class="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none uppercase"
          />
          <button
            type="button"
            onClick={onApplyPromo}
            class="bg-primary text-primary-foreground px-3 py-2 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
        {promoApplied && (
          <span class="text-xs text-green-600 font-semibold mt-1 block">
            Code applied! {(promoDiscount * 100).toFixed(0)}% Discount (-${calculatedPrices.discountAmount.toFixed(2)})
          </span>
        )}
      </div>

      {/* Total Price */}
      <div class="pt-4 border-t border-border mt-4 flex items-center justify-between">
        <span class="font-bold text-foreground">Total Price:</span>
        <span class="text-2xl font-bold text-primary">${calculatedPrices.total.toFixed(2)}</span>
      </div>

      {/* Extra guarantees */}
      <ul class="mt-6 space-y-2 text-xs text-muted-foreground">
        <li class="flex items-center gap-1.5">
          <Icon icon="lucide:check" class="text-green-500" />
          <span>100% Refund Guarantee</span>
        </li>
        <li class="flex items-center gap-1.5">
          <Icon icon="lucide:check" class="text-green-500" />
          <span>Free Plagiarism Check</span>
        </li>
        <li class="flex items-center gap-1.5">
          <Icon icon="lucide:check" class="text-green-500" />
          <span>Free Formatting (APA/MLA/etc)</span>
        </li>
      </ul>
    </div>
  );
};

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer class="bg-card border-t border-border py-6 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p class="text-xs text-muted-foreground">&copy; 2024 SkilfulWriters. Secure checkout portal.</p>
        <div class="flex items-center gap-4 text-xs text-muted-foreground">
          <a href="#" class="hover:text-primary transition-colors">Refund Policy</a>
          <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

const OrderForm: React.FC = () => {
  // State Variables
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [paperType, setPaperType] = useState<string>('essay');
  const [subjectArea, setSubjectArea] = useState<string>('business');
  const [topic, setTopic] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [academicLevel, setAcademicLevel] = useState<string>('college');
  const [formattingStyle, setFormattingStyle] = useState<string>('apa');
  const [spacing, setSpacing] = useState<string>('double');
  const [pages, setPages] = useState<number>(3);
  const [deadline, setDeadline] = useState<string>('3');
  const [writerLevel, setWriterLevel] = useState<string>('standard');
  const [addons, setAddons] = useState<AddonsState>({
    plagiarism: false,
    support: false,
    editor: false,
  });
  const [promoCode, setPromoCode] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0.0);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsState>({
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  // UI States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Event Handlers
  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const changeOrderPages = useCallback((amount: number) => {
    setPages((prev) => Math.max(1, prev + amount));
  }, []);

  const handleInputChange = useCallback((field: string, value: any) => {
    switch (field) {
      case 'paperType': setPaperType(value); break;
      case 'subjectArea': setSubjectArea(value); break;
      case 'topic': setTopic(value); break;
      case 'instructions': setInstructions(value); break;
      case 'academicLevel': setAcademicLevel(value); break;
      case 'formattingStyle': setFormattingStyle(value); break;
      case 'spacing': setSpacing(value); break;
      case 'pages': setPages(value); break;
      case 'deadline': setDeadline(value); break;
      default: break;
    }
  }, []);

  const handleWriterLevelChange = useCallback((level: string) => {
    setWriterLevel(level);
  }, []);

  const toggleAddon = useCallback((addon: keyof AddonsState) => {
    setAddons((prev) => ({
      ...prev,
      [addon]: !prev[addon],
    }));
  }, []);

  const applyPromo = useCallback(() => {
    if (promoCode.trim().toUpperCase() === 'SKILFUL15') {
      setPromoDiscount(0.15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "SKILFUL15" for 15% off!');
      setPromoDiscount(0.0);
      setPromoApplied(false);
    }
  }, [promoCode]);

  const handleFileUpload = useCallback((files: FileList | null) => {
    if (files) {
      const fileList = Array.from(files);
      setAttachedFiles((prev) => [...prev, ...fileList]);
    }
  }, []);

  const handleRemoveFile = useCallback((index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handlePaymentInputChange = useCallback((field: keyof PaymentDetailsState, value: string) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleSubmitOrder = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  }, []);

  // Pricing Calculation Logic
  const calculatePrice = () => {
    // Base rate by academic level
    let baseRate = 12; // High School
    if (academicLevel === 'college') baseRate = 14;
    if (academicLevel === 'university') baseRate = 18;
    if (academicLevel === 'phd') baseRate = 24;

    // Spacing multiplier
    if (spacing === 'single') {
      baseRate = baseRate * 2;
    }

    // Paper type multipliers
    let paperMultiplier = 1.0;
    if (paperType === 'thesis') paperMultiplier = 1.3;
    if (paperType === 'admission') paperMultiplier = 1.25;

    // Deadline multipliers
    const deadlineVal = parseFloat(deadline);
    let deadlineMultiplier = 1.0;
    if (deadlineVal === 7) deadlineMultiplier = 1.15;
    if (deadlineVal === 3) deadlineMultiplier = 1.35;
    if (deadlineVal === 1) deadlineMultiplier = 1.75;
    if (deadlineVal === 0.5) deadlineMultiplier = 2.2;

    // Writer quality multipliers
    let writerMultiplier = 1.0;
    if (writerLevel === 'premium') writerMultiplier = 1.25;
    if (writerLevel === 'platinum') writerMultiplier = 1.45;

    // Subtotal calculation
    const subtotal = baseRate * paperMultiplier * deadlineMultiplier * writerMultiplier * pages;

    // Add-ons flat rates
    let addonsTotal = 0;
    if (addons.plagiarism) addonsTotal += 9.99;
    if (addons.support) addonsTotal += 12.99;
    if (addons.editor) addonsTotal += 15.00;

    // Promo discount
    const discountAmount = (subtotal + addonsTotal) * promoDiscount;
    const total = (subtotal + addonsTotal) - discountAmount;

    return {
      subtotal,
      addonsTotal,
      discountAmount,
      total,
    };
  };

  const calculatedPrices = calculatePrice();

  const handleReset = () => {
    setCurrentStep(1);
    setPaperType('essay');
    setSubjectArea('business');
    setTopic('');
    setInstructions('');
    setAttachedFiles([]);
    setAcademicLevel('college');
    setFormattingStyle('apa');
    setSpacing('double');
    setPages(3);
    setDeadline('3');
    setWriterLevel('standard');
    setAddons({ plagiarism: false, support: false, editor: false });
    setPromoCode('');
    setPromoDiscount(0.0);
    setPromoApplied(false);
    setPaymentDetails({ cardholderName: '', cardNumber: '', expirationDate: '', cvv: '' });
    setIsSuccess(false);
  };

  return (
    <div class="min-h-screen w-full bg-background flex flex-col relative font-sans text-foreground">
      <Header />

      {/* Main Order Form Layout */}
      <main class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isSuccess ? (
          /* Success Screen */
          <div class="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 text-center shadow-sm my-12">
            <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon icon="lucide:check-circle" class="text-4xl" />
            </div>
            <h2 class="text-3xl font-heading font-bold text-foreground mb-3">Order Placed Successfully!</h2>
            <p class="text-muted-foreground mb-6">
              Thank you for choosing SkilfulWriters. Your order has been assigned to our top writers. You will receive an email confirmation shortly with your order tracking details.
            </p>
            <div class="bg-muted p-4 rounded-lg mb-8 text-left space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">Order ID:</span>
                <span class="font-bold text-foreground">#SW-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Amount Paid:</span>
                <span class="font-bold text-primary">${calculatedPrices.total.toFixed(2)}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">Estimated Delivery:</span>
                <span class="font-bold text-foreground">Within {deadline === '0.5' ? '12 Hours' : deadline === '1' ? '24 Hours' : `${deadline} Days`}</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              class="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-6 py-3 rounded-lg shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Icon icon="lucide:plus" />
              <span>Order Another Paper</span>
            </button>
          </div>
        ) : (
          /* Multi-step Wizard Form */
          <>
            <ProgressTracker currentStep={currentStep} />

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Steps */}
              <div class="lg:col-span-8 bg-card border border-border rounded-xl p-6 shadow-sm">
                {currentStep === 1 && (
                  <StepPaperDetails
                    paperType={paperType}
                    subjectArea={subjectArea}
                    topic={topic}
                    instructions={instructions}
                    attachedFiles={attachedFiles}
                    academicLevel={academicLevel}
                    formattingStyle={formattingStyle}
                    spacing={spacing}
                    pages={pages}
                    deadline={deadline}
                    onInputChange={handleInputChange}
                    onChangePages={changeOrderPages}
                    onFileUpload={handleFileUpload}
                    onRemoveFile={handleRemoveFile}
                    onNext={() => goToStep(2)}
                  />
                )}

                {currentStep === 2 && (
                  <StepWriterAddons
                    writerLevel={writerLevel}
                    addons={addons}
                    onWriterLevelChange={handleWriterLevelChange}
                    onToggleAddon={toggleAddon}
                    onNext={() => goToStep(3)}
                    onBack={() => goToStep(1)}
                  />
                )}

                {currentStep === 3 && (
                  <StepPayment
                    paymentDetails={paymentDetails}
                    onInputChange={handlePaymentInputChange}
                    onSubmit={handleSubmitOrder}
                    onBack={() => goToStep(2)}
                    isLoading={isLoading}
                  />
                )}
              </div>

              {/* Right Column: Order Summary (Sticky) */}
              <div class="lg:col-span-4">
                <OrderSummary
                  paperType={paperType}
                  subjectArea={subjectArea}
                  academicLevel={academicLevel}
                  pages={pages}
                  spacing={spacing}
                  deadline={deadline}
                  writerLevel={writerLevel}
                  addons={addons}
                  promoCode={promoCode}
                  promoDiscount={promoDiscount}
                  promoApplied={promoApplied}
                  onPromoCodeChange={setPromoCode}
                  onApplyPromo={applyPromo}
                  calculatedPrices={calculatedPrices}
                />
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OrderForm;