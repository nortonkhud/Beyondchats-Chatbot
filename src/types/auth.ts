export interface User {
  id: string;
  email: string;
  name: string;
  organizationId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
}

export interface Organization {
  id: string;
  name: string;
  industry: string;
  size: string;
  createdAt: string;
  ownerId: string;
}

export interface WebsiteScrapeStatus {
  id: string;
  url: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed';
  progress: number;
  pagesFound: number;
  pagesScraped: number;
  error?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatbotConfig {
  id: string;
  organizationId: string;
  name: string;
  theme: {
    primaryColor: string;
    fontFamily: string;
    borderRadius: string;
  };
  settings: {
    initialMessage: string;
    position: 'left' | 'right';
    showAvatar: boolean;
    autoOpen: boolean;
  };
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  features: string[];
  limits: {
    websites: number;
    chatbots: number;
    monthlyConversations: number;
    teamMembers: number;
    customization: boolean;
    analytics: boolean;
    api: boolean;
  };
}

export interface OrganizationSetup {
  step: number;
  totalSteps: number;
  organization: Organization;
  team: {
    email: string;
    role: 'admin' | 'member';
  }[];
  integrations: {
    type: string;
    enabled: boolean;
    config: Record<string, any>;
  }[];
}