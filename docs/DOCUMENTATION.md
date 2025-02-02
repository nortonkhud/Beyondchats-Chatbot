# BeyondChats Website Documentation

## Table of Contents
1. [Homepage Navigation](#homepage-navigation)
2. [Admin Access](#admin-access)
3. [Website Scraping](#website-scraping)
4. [Technical Requirements](#technical-requirements)

## Homepage Navigation

### Setup Organization Button
- **Location**: Homepage hero section, right side of "Get Started" button
- **Appearance**: 
  ```jsx
  <button 
    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg text-lg font-semibold border border-gray-300 dark:border-gray-600"
  >
    Setup Organization
  </button>
  ```
- **Functionality**:
  - Redirects to `/organization-setup`
  - Mirrors the "Organization Setup" navbar option post-login
  - Initiates the 3-step organization setup process

### Organization Setup Flow
1. **Step 1: Organization Details**
   - Company Name (required)
   - Website URL (required)
   - Description (auto-fetched from website meta description)

2. **Step 2: Website Scraping**
   - Real-time scraping progress
   - Status indicators for each page
   - Option to proceed while scraping continues

3. **Step 3: Integration**
   - Test Chatbot
   - Website Integration
   - Integration Verification

## Admin Access

### Admin Panel Access
- **Button Location**: Post-successful integration
- **Button Styling**:
  ```jsx
  <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
    Explore Admin Panel
  </button>
  ```

### Access Levels
1. **Super Admin**
   - Full system access
   - User management
   - Organization settings
   - Billing management

2. **Organization Admin**
   - Organization settings
   - User management within organization
   - Chatbot configuration
   - Website integration

3. **Content Manager**
   - Content management
   - Chatbot training
   - Analytics viewing

### Authentication Process
1. Initial login with email/password
2. Session timeout: 2 hours
3. Automatic logout on inactivity: 30 minutes
4. Rate limiting: 5 failed attempts before temporary lockout

### Security Measures
- JWT token-based authentication
- HTTPS required for all endpoints
- IP-based rate limiting
- Session invalidation on password change
- Audit logging for all admin actions

## Website Scraping

### Target Data Elements
```typescript
interface ScrapedData {
  url: string;
  title: string;
  content: string;
  metaDescription: string;
  headers: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  links: {
    internal: string[];
    external: string[];
  };
  lastModified?: string;
}
```

### Scraping Configuration
- **Rate Limits**:
  - Maximum 60 requests per minute
  - 5-second delay between pages
  - Maximum 10 concurrent connections

- **Frequency**:
  - Initial full scan
  - Daily incremental updates
  - Weekly full rescan

### Data Storage
```sql
CREATE TABLE scraped_pages (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  url TEXT NOT NULL,
  title TEXT,
  content TEXT,
  meta_description TEXT,
  headers JSONB,
  links JSONB,
  last_scraped TIMESTAMP WITH TIME ZONE,
  last_modified TIMESTAMP WITH TIME ZONE,
  status TEXT,
  error_message TEXT
);

CREATE INDEX idx_scraped_pages_org_id ON scraped_pages(organization_id);
CREATE INDEX idx_scraped_pages_url ON scraped_pages(url);
```

### Error Handling
1. **Connection Errors**:
   - Automatic retry (3 attempts)
   - Exponential backoff
   - Error logging with stack trace

2. **Rate Limiting**:
   - Queue management
   - Automatic throttling
   - Resume capability

3. **Content Errors**:
   - Invalid HTML handling
   - Character encoding fixes
   - Malformed URL correction

### Authentication Requirements
- Support for Basic Auth
- Cookie-based auth
- Custom header auth
- OAuth 2.0 support

### API Endpoints
```typescript
interface ScrapingAPI {
  // Start scraping process
  POST /api/v1/scraping/start
  body: {
    organizationId: string;
    websiteUrl: string;
    options?: ScrapeOptions;
  }

  // Get scraping status
  GET /api/v1/scraping/status/:taskId
  response: {
    status: 'queued' | 'in_progress' | 'completed' | 'failed';
    progress: number;
    pagesFound: number;
    pagesScraped: number;
    error?: string;
  }

  // Pause/resume scraping
  POST /api/v1/scraping/:taskId/:action
  action: 'pause' | 'resume'

  // Get scraped content
  GET /api/v1/scraping/content
  query: {
    organizationId: string;
    url?: string;
    page?: number;
    limit?: number;
  }
}
```

### Data Validation
1. **Input Validation**:
   - URL format checking
   - Domain verification
   - Protocol enforcement (HTTPS)

2. **Content Validation**:
   - HTML structure validation
   - Content length limits
   - Character encoding verification

3. **Output Cleaning**:
   - HTML sanitization
   - Script removal
   - XSS prevention

## Technical Requirements

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

### System Requirements
- **Client**:
  - Modern browser with JavaScript enabled
  - Minimum 4GB RAM
  - Stable internet connection (>2 Mbps)

- **Server**:
  - Node.js 18+
  - 8GB RAM minimum
  - 4 CPU cores minimum
  - 50GB storage minimum

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "^0.344.0",
    "bcryptjs": "^2.4.3",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "typescript": "^5.5.3",
    "vite": "^5.4.2",
    "tailwindcss": "^3.4.1"
  }
}
```

### Rate Limiting
- API calls: 100 requests per minute per IP
- Scraping: 60 pages per minute per domain
- Authentication: 5 attempts per 15 minutes
- Concurrent scraping: 10 websites per organization

### Caching
- **Browser Cache**:
  - Static assets: 7 days
  - API responses: 5 minutes
  - User preferences: 30 days

- **Server Cache**:
  - Scraped content: 24 hours
  - Authentication tokens: 2 hours
  - Rate limit counters: 1 hour