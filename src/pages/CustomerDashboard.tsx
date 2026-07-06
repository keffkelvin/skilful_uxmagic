import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';

// ==========================================
// TypeScript Interfaces
// ==========================================

interface Message {
  id: number;
  sender: 'writer' | 'client';
  name: string;
  avatar?: string;
  text: string;
  time: string;
}

interface ActiveOrder {
  id: string;
  topic: string;
  status: string;
  progress: number;
  writer: string;
  pages: string;
  formatting: string;
  hoursLeft: number;
}

interface CompletedOrder {
  id: string;
  topic: string;
  writer: string;
  completedDate: string;
  rating: number;
  fileName: string;
}

// ==========================================
// Helper Sub-Components
// ==========================================

// --- Header Component ---
interface HeaderProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewOrder: () => void;
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
  profileDropdownOpen: boolean;
  onToggleProfileDropdown: () => void;
  notifications: Array<{ id: number; text: string; time: string; unread: boolean }>;
  onMarkNotificationsRead: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onNewOrder,
  notificationsOpen,
  onToggleNotifications,
  profileDropdownOpen,
  onToggleProfileDropdown,
  notifications,
  onMarkNotificationsRead,
}) => {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg flex items-center justify-center">
            <Icon icon="lucide:pencil" className="text-xl" />
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-primary tracking-tight">Skilful</span>
            <span className="font-heading text-lg font-bold text-secondary tracking-tight">Writers</span>
          </div>
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded ml-2">Client Portal</span>
        </a>

        {/* Header Center / Search */}
        <div className="hidden md:flex items-center bg-muted border border-border rounded-lg px-3 py-1.5 w-80">
          <Icon icon="lucide:search" className="text-muted-foreground mr-2" />
          <input
            type="text"
            placeholder="Search orders, files, or messages..."
            value={searchQuery}
            onChange={onSearchChange}
            className="bg-transparent text-xs focus:outline-none w-full text-foreground"
          />
        </div>

        {/* Header Right: Profile & Notifications */}
        <div className="flex items-center gap-4">
          {/* New Order Button */}
          <button
            onClick={onNewOrder}
            className="bg-primary text-primary-foreground hover:bg-primary/95 px-4 py-2 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center gap-1 cursor-pointer"
          >
            <Icon icon="lucide:plus" className="text-sm" />
            <span>New Order</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={onToggleNotifications}
              className="relative p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Icon icon="lucide:bell" className="text-xl" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-border flex justify-between items-center">
                  <span className="font-bold text-xs text-foreground">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={onMarkNotificationsRead}
                      className="text-[10px] text-primary hover:underline font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-border">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 text-xs ${n.unread ? 'bg-primary/5' : ''}`}>
                      <p className="text-foreground font-medium">{n.text}</p>
                      <span className="text-[10px] text-muted-foreground block mt-1">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={onToggleProfileDropdown}
              className="flex items-center gap-2 border-l border-border pl-4 cursor-pointer focus:outline-none"
            >
              <img
                src="https://randomuser.me/api/portraits/men/12.jpg"
                alt="Client Avatar"
                className="w-8 h-8 rounded-full border border-primary/20"
              />
              <div className="hidden sm:block text-left">
                <span className="block text-xs font-bold text-foreground">Alex Mercer</span>
                <span className="block text-[10px] text-muted-foreground">ID: #C-94182</span>
              </div>
              <Icon icon="lucide:chevron-down" className="text-xs text-muted-foreground hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                <div className="px-4 py-2 border-b border-border sm:hidden">
                  <span className="block text-xs font-bold text-foreground">Alex Mercer</span>
                  <span className="block text-[10px] text-muted-foreground">ID: #C-94182</span>
                </div>
                <button
                  onClick={() => alert('Profile Settings coming soon!')}
                  className="w-full text-left px-4 py-2 text-xs text-foreground hover:bg-muted flex items-center gap-2"
                >
                  <Icon icon="lucide:user" />
                  My Profile
                </button>
                <button
                  onClick={() => alert('Billing settings coming soon!')}
                  className="w-full text-left px-4 py-2 text-xs text-foreground hover:bg-muted flex items-center gap-2"
                >
                  <Icon icon="lucide:credit-card" />
                  Billing
                </button>
                <div className="border-t border-border my-1"></div>
                <button
                  onClick={() => alert('Logged out successfully!')}
                  className="w-full text-left px-4 py-2 text-xs text-destructive hover:bg-destructive/5 flex items-center gap-2"
                >
                  <Icon icon="lucide:log-out" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// --- Sidebar Component ---
interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'lucide:layout-dashboard' },
    { id: 'orders', label: 'My Orders', icon: 'lucide:list', badge: '1', badgeColor: 'bg-secondary text-secondary-foreground' },
    { id: 'messages', label: 'Messages', icon: 'lucide:message-circle', badge: '2', badgeColor: 'bg-primary text-primary-foreground' },
    { id: 'files', label: 'Files & Drafts', icon: 'lucide:folder' },
    { id: 'billing', label: 'Billing History', icon: 'lucide:credit-card' },
    { id: 'settings', label: 'Settings', icon: 'lucide:settings', mtAuto: true },
  ];

  return (
    <aside className="w-full lg:w-64 bg-card border-r border-border p-4 space-y-1 flex flex-row lg:flex-col justify-start lg:justify-start overflow-x-auto lg:overflow-x-visible gap-2 lg:gap-1 scrollbar-none">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all w-full min-w-[120px] lg:min-w-0 cursor-pointer text-left ${
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            } ${item.mtAuto ? 'lg:mt-auto' : ''}`}
          >
            <Icon icon={item.icon} className="text-lg" />
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span className={`${item.badgeColor} text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-auto hidden lg:inline`}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </aside>
  );
};

// --- Welcome Banner Component ---
interface WelcomeBannerProps {
  balance: string;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ balance }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-heading font-bold">Welcome back, Alex!</h2>
        <p class="text-xs text-primary-foreground/80 mt-1">
          Your assigned writer is currently finishing your draft. You can track progress and send instructions below.
        </p>
      </div>
      <div className="bg-background/10 backdrop-blur-md border border-border/20 rounded-lg p-3 text-center min-w-[120px]">
        <span className="block text-[10px] uppercase tracking-wider font-semibold opacity-85">Account Balance</span>
        <span className="text-xl font-bold font-heading">{balance}</span>
      </div>
    </div>
  );
};

// --- Stat Card Component ---
interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  iconBg: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconBg, iconColor }) => {
  return (
    <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between shadow-sm">
      <div>
        <span className="text-xs text-muted-foreground block">{label}</span>
        <span className="text-2xl font-bold text-foreground mt-1 block">{value}</span>
      </div>
      <div className={`w-10 h-10 ${iconBg} ${iconColor} rounded-full flex items-center justify-center`}>
        <Icon icon={icon} className="text-xl" />
      </div>
    </div>
  );
};

// --- Stats Grid Component ---
const StatsGrid: React.FC = () => {
  const stats = [
    { label: 'Active Orders', value: '1', icon: 'lucide:clock', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { label: 'Completed Orders', value: '3', icon: 'lucide:circle-check', iconBg: 'bg-green-500/10', iconColor: 'text-green-600' },
    { label: 'Total Spent', value: '$184.50', icon: 'lucide:credit-card', iconBg: 'bg-yellow-500/10', iconColor: 'text-yellow-600' },
    { label: 'Support Tickets', value: '0 Active', icon: 'lucide:shield', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} />
      ))}
    </div>
  );
};

// --- Active Order Tracker Component ---
interface ActiveOrderTrackerProps {
  order: ActiveOrder;
  onViewInstructions: () => void;
  onUploadSource: () => void;
  onDownloadDraft: () => void;
}

const ActiveOrderTracker: React.FC<ActiveOrderTrackerProps> = ({
  order,
  onViewInstructions,
  onUploadSource,
  onDownloadDraft,
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-6 gap-2">
        <div>
          <span className="text-xs text-primary font-bold uppercase tracking-wider">Active Order</span>
          <h3 className="text-lg font-heading font-bold text-foreground mt-0.5">
            Order #{order.id}: {order.topic}
          </h3>
        </div>
        <span className="bg-yellow-500/10 text-yellow-700 text-xs font-semibold px-2.5 py-1 rounded-full self-start sm:self-center">
          {order.status}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div class="flex justify-between text-xs font-semibold">
          <span className="text-muted-foreground">Draft Quality Review</span>
          <span className="text-primary">{order.progress}% Completed</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
          <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${order.progress}%` }}></div>
        </div>
      </div>

      {/* Paper Metadata Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border text-xs">
        <div>
          <span className="text-muted-foreground block">Writer</span>
          <span className="font-bold text-foreground block mt-1 flex items-center gap-1">
            <Icon icon="lucide:user" className="text-primary" />
            <span>{order.writer}</span>
          </span>
        </div>
        <div>
          <span className="text-muted-foreground block">Pages</span>
          <span className="font-bold text-foreground block mt-1">{order.pages}</span>
        </div>
        <div>
          <span className="text-muted-foreground block">Formatting</span>
          <span className="font-bold text-foreground block mt-1">{order.formatting}</span>
        </div>
        <div>
          <span className="text-muted-foreground block">Deadline</span>
          <span className="font-bold text-red-600 block mt-1 flex items-center gap-1">
            <Icon icon="lucide:clock" className="text-sm" />
            <span>{order.hoursLeft} Hours left</span>
          </span>
        </div>
      </div>

      {/* Action buttons for active order */}
      <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-border">
        <button
          onClick={onViewInstructions}
          className="bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Icon icon="lucide:clipboard" className="text-sm" />
          <span>View Full Instructions</span>
        </button>
        <button
          onClick={onUploadSource}
          className="bg-primary/5 hover:bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Icon icon="lucide:upload" className="text-sm" />
          <span>Upload Additional Source</span>
        </button>
        <button
          onClick={onDownloadDraft}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all ml-auto cursor-pointer"
        >
          <Icon icon="lucide:download" className="text-sm" />
          <span>Download Draft</span>
        </button>
      </div>
    </div>
  );
};

// --- Completed Orders Table Component ---
interface CompletedOrdersTableProps {
  orders: CompletedOrder[];
  onDownload: (fileName: string) => void;
}

const CompletedOrdersTable: React.FC<CompletedOrdersTableProps> = ({ orders, onDownload }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
      <h3 className="text-base font-heading font-bold text-foreground mb-4">Completed Orders History</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs min-w-[600px]">
          <thead>
            <tr className="border-b border-border text-muted-foreground uppercase font-semibold">
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Topic</th>
              <th className="py-3 px-2">Writer</th>
              <th className="py-3 px-2">Completed Date</th>
              <th className="py-3 px-2">Grade/Review</th>
              <th className="py-3 px-2 text-right">Draft</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 px-2 font-bold text-primary">#{order.id}</td>
                <td className="py-3 px-2 font-medium text-foreground">{order.topic}</td>
                <td className="py-3 px-2 text-muted-foreground">{order.writer}</td>
                <td className="py-3 px-2 text-muted-foreground">{order.completedDate}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-0.5 text-secondary">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon="lucide:star"
                        className={i < order.rating ? 'fill-secondary text-secondary' : 'text-muted'}
                      />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => onDownload(order.fileName)}
                    className="text-primary hover:underline font-semibold flex items-center gap-1 justify-end ml-auto cursor-pointer"
                  >
                    <Icon icon="lucide:download" />
                    <span>{order.fileName}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Chat Message Component ---
interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isClient = message.sender === 'client';

  return (
    <div className={`flex items-start gap-2.5 max-w-[85%] ${isClient ? 'ml-auto justify-end' : ''}`}>
      {!isClient && message.avatar && (
        <img
          src={message.avatar}
          alt={`${message.name} Avatar`}
          className="w-6 h-6 rounded-full object-cover mt-0.5"
        />
      )}
      <div
        className={`p-3 rounded-xl text-xs ${
          isClient
            ? 'bg-primary text-primary-foreground rounded-tr-none'
            : 'bg-muted text-foreground rounded-tl-none'
        }`}
      >
        <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
        <span
          className={`block text-[9px] mt-1 text-right ${
            isClient ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}
        >
          {message.time}
        </span>
      </div>
    </div>
  );
};

// --- Live Chat Component ---
interface LiveChatProps {
  messages: Message[];
  chatMessage: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onFileUpload: () => void;
}

const LiveChat: React.FC<LiveChatProps> = ({
  messages,
  chatMessage,
  onMessageChange,
  onSendMessage,
  onFileUpload,
}) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-[520px]">
      {/* Chat Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Writer Avatar"
            className="w-10 h-10 rounded-full border border-border/20 object-cover"
          />
          <div>
            <span className="block font-bold text-sm font-heading">Prof. Sarah Jenkins</span>
            <span className="block text-[10px] text-primary-foreground/80 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
              <span>Active Now (Your Assigned Writer)</span>
            </span>
          </div>
        </div>
        <button
          onClick={() => alert('Writer Profile: Prof. Sarah Jenkins\nSpecialization: Business Administration & Marketing\nCompleted Orders: 142')}
          className="text-primary-foreground/80 hover:text-primary-foreground cursor-pointer"
        >
          <Icon icon="lucide:info" className="text-lg" />
        </button>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-muted/20">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input Area */}
      <form onSubmit={onSendMessage} className="p-3 border-t border-border bg-card flex items-center gap-2">
        <button
          type="button"
          onClick={onFileUpload}
          className="p-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          title="Upload file to chat"
        >
          <Icon icon="lucide:upload" className="text-lg" />
        </button>
        <input
          type="text"
          value={chatMessage}
          onChange={onMessageChange}
          placeholder="Type your message to Prof. Sarah..."
          className="flex-grow bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/95 p-2 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
        >
          <Icon icon="lucide:send" className="text-base" />
        </button>
      </form>
    </div>
  );
};

// ==========================================
// Main Page Component
// ==========================================

const CustomerDashboard: React.FC = () => {
  // --- State Variables ---
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState<boolean>(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState<boolean>(false);

  // Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Prof. Sarah Jenkins sent you a message.', time: '10:25 AM', unread: true },
    { id: 2, text: 'Your draft for Order #28941 is 75% complete.', time: '9:00 AM', unread: true },
    { id: 3, text: 'Payment for Order #28941 was processed successfully.', time: 'Yesterday', unread: false },
  ]);

  // Chat Messages List State
  const [chatMessagesList, setChatMessagesList] = useState<Message[]>([
    {
      id: 1,
      sender: 'writer',
      name: 'Prof. Sarah Jenkins',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: "Hello Alex! I am currently working on the literature review section of your strategic business analysis. I've found some excellent resources regarding digital marketing frameworks.",
      time: '10:15 AM',
    },
    {
      id: 2,
      sender: 'client',
      name: 'Alex Mercer',
      text: 'Hi Prof. Sarah! That sounds fantastic. Could you make sure to place extra emphasis on the Porter\'s Five Forces model? Our professor is very particular about that framework.',
      time: '10:22 AM',
    },
    {
      id: 3,
      sender: 'writer',
      name: 'Prof. Sarah Jenkins',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      text: "Absolutely, I'll allocate a dedicated subsection to Porter's Five Forces with custom diagram outlines. I will upload a rough draft of the first 2 pages in about an hour for your feedback!",
      time: '10:25 AM',
    },
  ]);

  // Active Order State
  const [activeOrder, setActiveOrder] = useState<ActiveOrder>({
    id: '28941',
    topic: 'Strategic Business Analysis',
    status: 'Writing in Progress',
    progress: 75,
    writer: 'Prof. Sarah J.',
    pages: '4 Pages (Double)',
    formatting: 'APA 7th Edition',
    hoursLeft: 22,
  });

  // Completed Orders State
  const completedOrders: CompletedOrder[] = [
    {
      id: '28410',
      topic: 'Intro to Macroeconomics Essay',
      writer: 'Dr. Robert V.',
      completedDate: 'Oct 12, 2024',
      rating: 5,
      fileName: 'Final_Macroeconomics.docx',
    },
    {
      id: '27918',
      topic: 'Clinical Psychology Case Study',
      writer: 'Prof. Sarah J.',
      completedDate: 'Sep 28, 2024',
      rating: 5,
      fileName: 'Clinical_Psychology_Case_Study.pdf',
    },
  ];

  // --- Event Handlers ---

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleNewOrderClick = () => {
    setShowNewOrderModal(true);
  };

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
    if (profileDropdownOpen) setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
    if (notificationsOpen) setNotificationsOpen(false);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleViewInstructions = () => {
    setShowInstructionsModal(true);
  };

  const handleUploadSource = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      alert('Source file uploaded successfully! Your writer has been notified.');
    }, 1500);
  };

  const handleDownloadDraft = () => {
    alert('Downloading current draft: Strategic_Business_Analysis_Draft_v1.docx');
  };

  const handleChatMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatMessage(e.target.value);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage: Message = {
      id: chatMessagesList.length + 1,
      sender: 'client',
      name: 'Alex Mercer',
      text: chatMessage,
      time: timeString,
    };

    setChatMessagesList((prev) => [...prev, newMessage]);
    setChatMessage('');

    // Simulate writer response after 2 seconds
    setTimeout(() => {
      const writerResponse: Message = {
        id: chatMessagesList.length + 2,
        sender: 'writer',
        name: 'Prof. Sarah Jenkins',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: "Thank you for the update! I've noted your request and will integrate it immediately.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessagesList((prev) => [...prev, writerResponse]);
    }, 2000);
  };

  const handleChatFileUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const fileMessage: Message = {
          id: chatMessagesList.length + 1,
          sender: 'client',
          name: 'Alex Mercer',
          text: `📎 Uploaded file: ${file.name}`,
          time: timeString,
        };
        setChatMessagesList((prev) => [...prev, fileMessage]);
      }
    };
    input.click();
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setNotificationsOpen(false);
      setProfileDropdownOpen(false);
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-background flex flex-col relative font-sans text-foreground"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onNewOrder={handleNewOrderClick}
        notificationsOpen={notificationsOpen}
        onToggleNotifications={(e) => {
          e.stopPropagation();
          toggleNotifications();
        }}
        profileDropdownOpen={profileDropdownOpen}
        onToggleProfileDropdown={(e) => {
          e.stopPropagation();
          toggleProfileDropdown();
        }}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
      />

      {/* Dashboard Main Container */}
      <div className="flex-grow flex flex-col lg:flex-row max-w-full w-full">
        {/* Left Sidebar Nav */}
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content Panel */}
        <main className="flex-grow p-6 space-y-6 max-h-[1200px] overflow-y-auto">
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Message & Quick Stats */}
              <WelcomeBanner balance="$0.00" />
              <StatsGrid />

              {/* Center Layout: Active Order Tracker & Live Chat */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Area: Active Order Tracker & Completed Orders */}
                <div className="lg:col-span-7 space-y-6">
                  <ActiveOrderTracker
                    order={activeOrder}
                    onViewInstructions={handleViewInstructions}
                    onUploadSource={handleUploadSource}
                    onDownloadDraft={handleDownloadDraft}
                  />

                  <CompletedOrdersTable
                    orders={completedOrders}
                    onDownload={(fileName) => alert(`Downloading ${fileName}...`)}
                  />
                </div>

                {/* Right Area: Live Chat with Assigned Writer */}
                <div className="lg:col-span-5">
                  <LiveChat
                    messages={chatMessagesList}
                    chatMessage={chatMessage}
                    onMessageChange={handleChatMessageChange}
                    onSendMessage={handleSendChatMessage}
                    onFileUpload={handleChatFileUpload}
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="text-xl font-heading font-bold text-foreground">My Orders</h2>
              <ActiveOrderTracker
                order={activeOrder}
                onViewInstructions={handleViewInstructions}
                onUploadSource={handleUploadSource}
                onDownloadDraft={handleDownloadDraft}
              />
              <CompletedOrdersTable
                orders={completedOrders}
                onDownload={(fileName) => alert(`Downloading ${fileName}...`)}
              />
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 bg-card border border-border rounded-xl p-4">
                <h3 className="font-bold text-sm mb-4">Conversations</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg border border-primary/10 cursor-pointer">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" className="w-10 h-10 rounded-full" alt="" />
                    <div>
                      <h4 className="text-xs font-bold">Prof. Sarah Jenkins</h4>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">Absolutely, I'll allocate...</p>
                    </div>
                    <span className="w-2.5 h-2.5 bg-primary rounded-full ml-auto"></span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8">
                <LiveChat
                  messages={chatMessagesList}
                  chatMessage={chatMessage}
                  onMessageChange={handleChatMessageChange}
                  onSendMessage={handleSendChatMessage}
                  onFileUpload={handleChatFileUpload}
                />
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-heading font-bold mb-4">Files & Drafts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border p-4 rounded-lg flex flex-col justify-between h-32">
                  <div>
                    <Icon icon="lucide:file-text" className="text-2xl text-primary mb-2" />
                    <h4 className="text-xs font-bold">Strategic_Business_Analysis_Draft_v1.docx</h4>
                    <span className="text-[10px] text-muted-foreground">Uploaded today, 10:25 AM</span>
                  </div>
                  <button onClick={handleDownloadDraft} className="text-xs text-primary font-semibold hover:underline text-left mt-2">
                    Download Draft
                  </button>
                </div>
                {completedOrders.map((order) => (
                  <div key={order.id} className="border border-border p-4 rounded-lg flex flex-col justify-between h-32">
                    <div>
                      <Icon icon="lucide:file-check" className="text-2xl text-green-600 mb-2" />
                      <h4 className="text-xs font-bold">{order.fileName}</h4>
                      <span className="text-[10px] text-muted-foreground">Completed {order.completedDate}</span>
                    </div>
                    <button onClick={() => alert(`Downloading ${order.fileName}...`)} className="text-xs text-primary font-semibold hover:underline text-left mt-2">
                      Download Final
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-heading font-bold mb-4">Billing History</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground uppercase font-semibold">
                      <th className="py-3 px-2">Invoice ID</th>
                      <th className="py-3 px-2">Order ID</th>
                      <th className="py-3 px-2">Amount</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 px-2 font-bold">#INV-94102</td>
                      <td className="py-3 px-2 text-primary">#28941</td>
                      <td className="py-3 px-2 font-bold">$120.00</td>
                      <td className="py-3 px-2"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-semibold">Paid</span></td>
                      <td className="py-3 px-2 text-muted-foreground">Oct 24, 2024</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-bold">#INV-93812</td>
                      <td className="py-3 px-2 text-primary">#28410</td>
                      <td className="py-3 px-2 font-bold">$64.50</td>
                      <td className="py-3 px-2"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-[10px] font-semibold">Paid</span></td>
                      <td className="py-3 px-2 text-muted-foreground">Oct 10, 2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-card border border-border rounded-xl p-6 max-w-2xl">
              <h2 className="text-lg font-heading font-bold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                  <input type="text" defaultValue="Alex Mercer" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                  <input type="email" defaultValue="alex.mercer@example.com" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone Number</label>
                  <input type="text" defaultValue="+1 (555) 019-2834" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground" />
                </div>
                <button onClick={() => alert('Settings saved successfully!')} className="bg-primary text-primary-foreground hover:bg-primary/95 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- Modals --- */}

      {/* Instructions Modal */}
      {showInstructionsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-heading font-bold text-lg text-foreground">Order Instructions</h3>
              <button onClick={() => setShowInstructionsModal(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </div>
            <div className="space-y-3 text-xs text-foreground">
              <p><strong>Topic:</strong> Strategic Business Analysis</p>
              <p><strong>Formatting:</strong> APA 7th Edition</p>
              <p><strong>Length:</strong> 4 Pages (Double-spaced)</p>
              <p><strong>Description:</strong></p>
              <p className="bg-muted p-3 rounded-lg text-muted-foreground leading-relaxed">
                Please conduct a comprehensive strategic analysis of a modern tech company (preferably Apple or Microsoft). Include a SWOT analysis, Porter's Five Forces framework, and strategic recommendations for the next 3-5 years. Ensure at least 5 scholarly sources are cited.
              </p>
            </div>
            <div className="flex justify-end pt-3 border-t border-border">
              <button onClick={() => setShowInstructionsModal(false)} className="bg-primary text-primary-foreground hover:bg-primary/95 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {showNewOrderModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-border pb-3">
              <h3 className="font-heading font-bold text-lg text-foreground">Create New Order</h3>
              <button onClick={() => setShowNewOrderModal(false)} className="text-muted-foreground hover:text-foreground cursor-pointer">
                <Icon icon="lucide:x" className="text-xl" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Order submitted successfully! Our team is assigning a writer.');
              setShowNewOrderModal(false);
            }} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Topic / Title</label>
                <input required type="text" placeholder="e.g., Literature Review on AI Ethics" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Pages</label>
                  <select className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground">
                    <option>1 Page (275 words)</option>
                    <option>2 Pages (550 words)</option>
                    <option>3 Pages (825 words)</option>
                    <option>4 Pages (1100 words)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-muted-foreground mb-1">Formatting</label>
                  <select className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground">
                    <option>APA 7th Edition</option>
                    <option>MLA 9th Edition</option>
                    <option>Chicago / Turabian</option>
                    <option>Harvard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-muted-foreground mb-1">Instructions</label>
                <textarea required rows={4} placeholder="Provide detailed instructions, guidelines, and grading rubrics..." className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-foreground"></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button type="button" onClick={() => setShowNewOrderModal(false)} className="bg-muted text-foreground hover:bg-muted/80 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/95 px-4 py-2 rounded-lg text-xs font-bold cursor-pointer">
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Uploading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-card border border-border p-6 rounded-xl shadow-lg flex flex-col items-center gap-3">
            <Icon icon="lucide:loader-2" className="text-3xl text-primary animate-spin" />
            <span className="text-xs font-semibold text-foreground">Uploading source file...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;