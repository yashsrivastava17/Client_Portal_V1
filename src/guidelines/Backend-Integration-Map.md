# Crenoir X MAP - Backend Integration Mapping

## 🔐 **Authentication & User Management**

### **OAuth Integration**
```typescript
// Components: TopNavigation.tsx, App.tsx
// Endpoints: 
POST /auth/google/login
POST /auth/saml/login (enterprise)
GET /auth/user/profile
POST /auth/logout

// Data Flow:
TopNavigation → User Avatar → Profile Management
```

### **Session Management**
```typescript
// Storage: JWT tokens in httpOnly cookies
// Refresh: Auto-refresh tokens before expiry
// Fallback: Redirect to login on auth failure
```

## 📊 **Dashboard & Metrics**

### **Main Dashboard (Design Page)**
```typescript
// Components: MainCarousel.tsx, MetricsOnlyWidget.tsx
// Endpoints:
GET /api/dashboard/overview
GET /api/metrics/performance
GET /api/metrics/user-behavior
GET /api/recent-activities

// Real-time: WebSocket connection for live updates
// Cache: Redis cache for 5-minute intervals
```

### **Echo Page Metrics**
```typescript
// Components: EchoMetricsWidget.tsx, RLHFVotingHub.tsx  
// Endpoints:
GET /api/echo/metrics/engagement
GET /api/echo/metrics/content-performance
GET /api/echo/rlhf/ratings
POST /api/echo/rlhf/vote
GET /api/echo/campaigns/performance
```

## 📅 **Calendar & Content Management**

### **Content Calendar**
```typescript
// Components: ContentCalendarWidget.tsx
// Endpoints:
GET /api/calendar/events
POST /api/calendar/events
PUT /api/calendar/events/:id
DELETE /api/calendar/events/:id

// Integration: Google Calendar API
// Sync: Bi-directional calendar sync
// Conflicts: Handle scheduling conflicts
```

### **Campaign Management**
```typescript
// Components: VideoProductionPipeline.tsx
// Endpoints:
GET /api/campaigns
POST /api/campaigns
PUT /api/campaigns/:id/stage
GET /api/campaigns/:id/assets

// Pipeline Stages:
// Idea → Script → Body Mirroring → Production → Review
// Each stage has specific data requirements
```

## 🎥 **Video Production Pipeline**

### **Pipeline Tracking**
```typescript
// Components: VideoProductionPipelineWidget.tsx
// Endpoints:
GET /api/video/pipeline
POST /api/video/pipeline/move
GET /api/video/:id/status
POST /api/video/:id/feedback

// Stage Management:
interface VideoStage {
  id: string;
  stage: 'idea' | 'script' | 'body-mirroring' | 'production' | 'review';
  assignee: string;
  dueDate: Date;
  assets: Asset[];
  feedback: Feedback[];
}
```

### **Asset Management**
```typescript
// File Upload: AWS S3 or similar
// Processing: Background jobs for video processing
// CDN: CloudFront for global delivery
// Thumbnails: Auto-generated preview images
```

## 🗳️ **RLHF Voting System**

### **Voting Infrastructure**
```typescript
// Components: RLHFVotingHub.tsx, FeedbackModal.tsx
// Endpoints:
GET /api/rlhf/items
POST /api/rlhf/vote
POST /api/rlhf/feedback
GET /api/rlhf/analytics

// Vote Storage:
interface RLHFVote {
  userId: string;
  itemId: string;
  itemType: 'video' | 'script' | 'campaign';
  rating: 1 | 2 | 3 | 4 | 5;
  feedback?: string;
  timestamp: Date;
}
```

### **Feedback Aggregation**
```typescript
// Real-time aggregation of votes
// Sentiment analysis on text feedback
// Trend analysis for content optimization
// Export capabilities for reports
```

## 📚 **Document & Knowledge Management**

### **Document Storage**
```typescript
// Components: DocsInsightsWidget.tsx, DocumentReaderModal.tsx
// Endpoints:
GET /api/documents
GET /api/documents/:id
POST /api/documents/upload
PUT /api/documents/:id
DELETE /api/documents/:id

// Search: Elasticsearch or pgvector for semantic search
// Embeddings: OpenAI embeddings for document similarity
// Chat: RAG implementation with document context
```

### **AI Chat Integration**
```typescript
// Components: DocumentReaderModal.tsx (chat section)
// Endpoints:
POST /api/chat/message
GET /api/chat/history/:documentId
POST /api/chat/context

// AI Provider: OpenAI GPT-4 or Claude
// Context Window: Document chunks + conversation history
// Citations: Track source documents for responses
```

## 📈 **Analytics & Reporting**

### **Performance Metrics**
```typescript
// Components: MetricsOnlyWidget.tsx, PerformanceCharts.tsx
// Endpoints:
GET /api/analytics/performance
GET /api/analytics/user-engagement
GET /api/analytics/content-metrics
GET /api/analytics/export

// Data Sources:
// - Google Analytics 4
// - Social media APIs
// - Internal user behavior tracking
// - Campaign performance data
```

### **Custom Reports**
```typescript
// Export formats: PDF, CSV, JSON
// Scheduled reports: Email delivery
// Dashboard widgets: Real-time data
// Historical data: Up to 2 years retention
```

## 🎫 **Request & Task Management**

### **Request System**
```typescript
// Components: EnhancedRequestModal.tsx, EnhancedRaiseRequestsSection.tsx
// Endpoints:
POST /api/requests
GET /api/requests
PUT /api/requests/:id
POST /api/requests/:id/comments

// Types: design-change, user-research, dev-handoff, content-update, report-user-pattern
// Integration: JIRA ticket creation, Discord notifications
// Attachments: File upload with Figma URL linking
```

### **Kanban Board**
```typescript
// Components: KanbanBoardModal.tsx, ProductPlanWidget.tsx
// Endpoints:
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
POST /api/tasks/move

// Sync: JIRA/Linear/Trello integration
// Real-time: WebSocket updates for collaboration
// Attachments: Link to design files and documents
```

## 💳 **Payment & Billing**

### **Payment Processing**
```typescript
// Components: PaymentModal.tsx, LogisticsWidget.tsx
// Endpoints:
GET /api/invoices
POST /api/payments/process
GET /api/payments/methods
POST /api/payments/methods

// Providers: Stripe, PayPal, Bank Transfer, Crypto
// Security: PCI compliance, encrypted storage
// Receipts: Automatic email delivery
// Subscriptions: Recurring payment handling
```

### **Invoice Management**
```typescript
// Auto-generation based on project milestones
// PDF generation with company branding
// Payment tracking and reconciliation
// Tax calculation and reporting
```

## 🧪 **Testing & Accounts**

### **Test Accounts Management**
```typescript
// Components: TestingAccountsWidget.tsx
// Endpoints:
GET /api/testing/accounts
POST /api/testing/accounts
PUT /api/testing/accounts/:id
DELETE /api/testing/accounts/:id

// Security: Encrypted credential storage
// Access Control: Role-based access to test accounts
// Audit Logging: Track account usage
// Rotation: Automatic password rotation
```

## 🔄 **Real-time Features**

### **WebSocket Connections**
```typescript
// Live Updates:
// - Task status changes
// - New comments/feedback
// - Pipeline stage movements
// - Metric updates
// - User presence

// Connection Management:
// - Auto-reconnection on disconnect
// - Heartbeat for connection health
// - Room-based subscriptions
```

### **Notification System**
```typescript
// In-app notifications
// Email notifications
// Discord/Slack integration
// Push notifications (future)
// Notification preferences management
```

## 🛡️ **Security & Privacy**

### **Data Protection**
```typescript
// Encryption: AES-256 for sensitive data
// API Keys: Encrypted environment variables
// User Data: GDPR compliance
// Audit Trails: Comprehensive logging
// Rate Limiting: API endpoint protection
```

### **Access Control**
```typescript
// Role-Based Access Control (RBAC)
// Project-level permissions
// Resource-level permissions
// API key management
// Session management
```

## 🚀 **Performance & Scaling**

### **Caching Strategy**
```typescript
// Redis: Session and frequently accessed data
// CDN: Static assets and images
// Database: Query optimization and indexing
// API: Response caching with TTL
```

### **Database Schema**
```sql
-- Core Tables:
users, projects, documents, tasks, campaigns
videos, votes, feedback, payments, invoices

-- Relationships:
user_projects, project_documents, task_assignments
campaign_videos, vote_items, payment_invoices

-- Indexes:
user_id, project_id, document_id, created_at
search vectors for documents and feedback
```

## 📱 **API Design Patterns**

### **RESTful Conventions**
```typescript
GET    /api/resource         // List resources
POST   /api/resource         // Create resource  
GET    /api/resource/:id     // Get specific resource
PUT    /api/resource/:id     // Update resource
DELETE /api/resource/:id     // Delete resource
```

### **Response Format**
```typescript
interface APIResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  error?: {
    code: string;
    message: string;
  };
}
```

### **Error Handling**
```typescript
// HTTP Status Codes:
200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized  
403 - Forbidden
404 - Not Found
422 - Validation Error
500 - Internal Server Error
```

## 🔧 **Development Environment**

### **Local Development**
```typescript
// Database: PostgreSQL with pgvector
// Cache: Redis
// Storage: Local filesystem or MinIO
// Queue: Redis/BullMQ for background jobs
```

### **Production Environment**
```typescript
// Database: AWS RDS PostgreSQL
// Cache: AWS ElastiCache Redis
// Storage: AWS S3
// CDN: CloudFront
// Queue: AWS SQS
// Monitoring: DataDog/New Relic
```

## 📋 **Integration Checklist**

For each new component/feature:

- [ ] Define API endpoints and data models
- [ ] Implement authentication middleware
- [ ] Add input validation and sanitization
- [ ] Set up error handling and logging
- [ ] Implement caching strategy
- [ ] Add real-time updates if needed
- [ ] Configure security permissions
- [ ] Write API documentation
- [ ] Add monitoring and alerts
- [ ] Test with realistic data volumes