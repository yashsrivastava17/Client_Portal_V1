# Crenoir X MAP - Backend Integration Endpoints

## 🎯 **Executive Summary**

This document provides a comprehensive mapping of all frontend components that require backend integration, organized by component and functionality. Each endpoint includes request/response schemas, authentication requirements, and integration priorities.

## 🔐 **Authentication System**

### **TopNavigation.tsx**
```typescript
// User Profile Management
GET /api/auth/user/profile
Response: {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'stakeholder' | 'viewer';
  permissions: string[];
  lastLogin: Date;
}

POST /api/auth/logout
Response: { success: boolean }

// Session Validation
GET /api/auth/session/validate
Response: { valid: boolean; expiresAt: Date }
```

## 📊 **Dashboard & Metrics**

### **MainCarousel.tsx**
```typescript
// Hero Carousel Content
GET /api/dashboard/carousel
Response: {
  slides: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    ctaText?: string;
    ctaLink?: string;
    priority: number;
    active: boolean;
  }>;
}

// Real-time Updates via WebSocket
WS /ws/dashboard/updates
Message: {
  type: 'carousel_update' | 'metrics_update';
  data: any;
}
```

### **MetricsOnlyWidget.tsx**
```typescript
// Performance Metrics
GET /api/metrics/dashboard
Response: {
  performance: {
    videoCompletionRate: number;
    avgRating: number;
    stakeholderEngagement: number;
    pipelineVelocity: number;
  };
  trends: Array<{
    date: Date;
    metric: string;
    value: number;
  }>;
  kpis: Array<{
    name: string;
    value: number;
    change: number;
    period: 'daily' | 'weekly' | 'monthly';
  }>;
}

// Blog/Insights Data
GET /api/content/insights
Response: {
  posts: Array<{
    id: string;
    title: string;
    excerpt: string;
    content: string;
    readTime: string;
    category: 'Performance' | 'Analytics' | 'UX' | 'Growth';
    date: Date;
    author: string;
    tags: string[];
    views: number;
  }>;
}
```

## 🎥 **Video Production Pipeline**

### **VideoProductionPipelineWidget.tsx**
```typescript
// Pipeline Overview
GET /api/video/pipeline
Response: {
  stages: Array<{
    id: string;
    name: string;
    videos: Array<{
      id: string;
      title: string;
      stage: 'idea' | 'script' | 'production' | 'review' | 'completed';
      assignee: string;
      dueDate: Date;
      progress: number;
      priority: 'low' | 'medium' | 'high';
      thumbnail?: string;
    }>;
  }>;
  statistics: {
    totalVideos: number;
    completedThisWeek: number;
    averageCompletionTime: number;
    bottleneckStage?: string;
  };
}

// Move Video Between Stages
POST /api/video/:videoId/move
Request: {
  targetStage: string;
  assignee?: string;
  notes?: string;
}
Response: { success: boolean; video: VideoData }

// Pipeline Voting
GET /api/video/:videoId/votes
Response: {
  votes: Array<{
    stakeholderId: string;
    stakeholderName: string;
    rating: number; // 1-5 with decimals
    feedback?: string;
    timestamp: Date;
  }>;
  averageRating: number;
  totalVotes: number;
}

POST /api/video/:videoId/vote
Request: {
  rating: number;
  feedback?: string;
  isAnonymous?: boolean;
}
Response: { success: boolean; newAverage: number }
```

### **KanbanBoardModal.tsx**
```typescript
// Kanban Board Data
GET /api/tasks/kanban
Response: {
  columns: Array<{
    id: string;
    title: string;
    tasks: Array<{
      id: string;
      title: string;
      description: string;
      assignee: string;
      priority: 'low' | 'medium' | 'high';
      labels: string[];
      dueDate?: Date;
      attachments: Array<{
        name: string;
        url: string;
        type: string;
      }>;
      comments: Array<{
        id: string;
        author: string;
        content: string;
        timestamp: Date;
      }>;
    }>;
  }>;
}

// Create Task
POST /api/tasks
Request: {
  title: string;
  description: string;
  columnId: string;
  assignee?: string;
  priority?: string;
  dueDate?: Date;
  labels?: string[];
}

// Move Task
PUT /api/tasks/:taskId/move
Request: {
  targetColumnId: string;
  position: number;
}

// Real-time Task Updates
WS /ws/tasks/updates
Message: {
  type: 'task_moved' | 'task_updated' | 'task_created';
  task: TaskData;
}
```

## 📚 **Document Management**

### **DocsInsightsWidget.tsx & DocumentReaderModal.tsx**
```typescript
// Document Library
GET /api/documents
Query: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}
Response: {
  documents: Array<{
    id: string;
    title: string;
    type: 'pdf' | 'doc' | 'slides' | 'sheet';
    category: string;
    uploadDate: Date;
    size: number;
    thumbnail?: string;
    tags: string[];
    summary?: string;
  }>;
  total: number;
}

// Document Content & Metadata
GET /api/documents/:documentId
Response: {
  id: string;
  title: string;
  content: string; // Extracted text for AI processing
  metadata: {
    author: string;
    createdDate: Date;
    pageCount?: number;
    wordCount?: number;
  };
  relatedDocuments: string[];
  aiSummary?: string;
}

// AI Chat with Document Context
POST /api/documents/:documentId/chat
Request: {
  message: string;
  conversationId?: string;
}
Response: {
  response: string;
  conversationId: string;
  citations?: Array<{
    page: number;
    text: string;
    relevance: number;
  }>;
  suggestedFollowups?: string[];
}

// Document Upload
POST /api/documents/upload
Request: FormData with file + metadata
Response: {
  document: DocumentData;
  processingJobId?: string; // For async processing
}

// Search Documents (Semantic)
GET /api/documents/search
Query: {
  q: string;
  limit?: number;
  filters?: {
    category?: string;
    dateRange?: [Date, Date];
    author?: string;
  };
}
Response: {
  results: Array<{
    document: DocumentData;
    relevanceScore: number;
    matchedSnippets: string[];
  }>;
}
```

## 📝 **Request Management**

### **EnhancedRequestModal.tsx & EnhancedRaiseRequestsSection.tsx**
```typescript
// Request Types
type RequestType = 
  | 'design-change' 
  | 'user-research' 
  | 'dev-handoff' 
  | 'content-update' 
  | 'report-user-pattern';

// Submit Request
POST /api/requests
Request: {
  type: RequestType;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  figmaUrls?: string[];
  stakeholders?: string[]; // User IDs to notify
  dueDate?: Date;
  projectId?: string;
}
Response: {
  request: {
    id: string;
    title: string;
    type: RequestType;
    status: 'pending' | 'in-progress' | 'review' | 'completed';
    createdAt: Date;
    assignee?: string;
  };
}

// Get Request History
GET /api/requests
Query: {
  status?: string;
  type?: RequestType;
  assignee?: string;
  limit?: number;
  offset?: number;
}
Response: {
  requests: Array<{
    id: string;
    title: string;
    type: RequestType;
    status: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
    assignee?: string;
    commentsCount: number;
  }>;
  total: number;
}

// Request Details & Comments
GET /api/requests/:requestId
Response: {
  request: RequestData;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: Date;
    attachments?: AttachmentData[];
  }>;
  timeline: Array<{
    event: 'created' | 'assigned' | 'status_changed' | 'commented';
    timestamp: Date;
    user: string;
    details: any;
  }>;
}

// Add Comment to Request
POST /api/requests/:requestId/comments
Request: {
  content: string;
  attachments?: AttachmentData[];
}
```

## 💳 **Payment & Billing**

### **PaymentModal.tsx & LogisticsWidget.tsx**
```typescript
// Invoice Management
GET /api/invoices
Query: {
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
  dateRange?: [Date, Date];
  limit?: number;
}
Response: {
  invoices: Array<{
    id: string;
    number: string;
    clientName: string;
    amount: number;
    currency: string;
    status: string;
    dueDate: Date;
    createdDate: Date;
    paidDate?: Date;
    items: Array<{
      description: string;
      quantity: number;
      rate: number;
      total: number;
    }>;
  }>;
}

// Payment Processing
POST /api/payments/process
Request: {
  invoiceId?: string;
  amount: number;
  currency: string;
  paymentMethod: {
    type: 'stripe' | 'paypal' | 'crypto' | 'bank_transfer';
    token?: string; // For Stripe
    details: any;
  };
  metadata?: any;
}
Response: {
  success: boolean;
  transactionId: string;
  status: 'processing' | 'completed' | 'failed';
  receipt?: {
    url: string;
    email: string;
  };
}

// Payment Methods
GET /api/payments/methods
Response: {
  methods: Array<{
    id: string;
    type: string;
    last4?: string;
    expiryMonth?: number;
    expiryYear?: number;
    isDefault: boolean;
  }>;
}

POST /api/payments/methods
Request: {
  type: string;
  token: string; // From payment processor
  setAsDefault?: boolean;
}
```

## 🧪 **Testing & Research**

### **TestingAccountsWidget.tsx**
```typescript
// Test Accounts Management
GET /api/testing/accounts
Response: {
  accounts: Array<{
    id: string;
    platform: string;
    username: string;
    email: string;
    password: string; // Encrypted
    permissions: string[];
    environment: 'dev' | 'staging' | 'production';
    lastUsed?: Date;
    notes?: string;
  }>;
}

POST /api/testing/accounts
Request: {
  platform: string;
  username: string;
  email: string;
  password: string;
  permissions: string[];
  environment: string;
  notes?: string;
}

// Account Usage Logging
POST /api/testing/accounts/:accountId/usage
Request: {
  action: 'login' | 'test_started' | 'test_completed';
  details?: any;
}
```

## 📊 **RLHF & Voting System**

### **RLHFVotingHubWidget.tsx & FeedbackModal.tsx**
```typescript
// Voting Items Queue
GET /api/rlhf/queue
Response: {
  items: Array<{
    id: string;
    type: 'video' | 'script' | 'concept' | 'design';
    title: string;
    description?: string;
    content: {
      videoUrl?: string;
      scriptText?: string;
      imageUrls?: string[];
      figmaUrl?: string;
    };
    currentRating?: number;
    votesCount: number;
    status: 'pending' | 'active' | 'completed';
    deadline?: Date;
  }>;
}

// Submit Vote/Rating
POST /api/rlhf/vote
Request: {
  itemId: string;
  rating: number; // 1-5 with decimals (e.g., 4.5)
  feedback?: string;
  categories?: {
    quality: number;
    relevance: number;
    creativity: number;
    alignment: number;
  };
  isAnonymous?: boolean;
}

// Voting Analytics
GET /api/rlhf/analytics
Query: {
  itemType?: string;
  dateRange?: [Date, Date];
  groupBy?: 'stakeholder' | 'category' | 'time';
}
Response: {
  summary: {
    totalVotes: number;
    averageRating: number;
    participationRate: number;
  };
  trends: Array<{
    period: string;
    averageRating: number;
    votesCount: number;
  }>;
  categoryBreakdown: {
    quality: number;
    relevance: number;
    creativity: number;
    alignment: number;
  };
}
```

## 📅 **Calendar Integration**

### **ContentCalendarWidget.tsx**
```typescript
// Calendar Events
GET /api/calendar/events
Query: {
  start: Date;
  end: Date;
  types?: string[]; // 'video_deadline', 'review_meeting', etc.
}
Response: {
  events: Array<{
    id: string;
    title: string;
    type: string;
    start: Date;
    end: Date;
    description?: string;
    attendees?: string[];
    location?: string;
    videoId?: string; // If related to video production
    status: 'confirmed' | 'tentative' | 'cancelled';
  }>;
}

// Create Calendar Event
POST /api/calendar/events
Request: {
  title: string;
  type: string;
  start: Date;
  end: Date;
  description?: string;
  attendees?: string[];
  recurrence?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: Date;
  };
}

// Google Calendar Sync
POST /api/calendar/sync/google
Request: {
  action: 'connect' | 'sync' | 'disconnect';
  authToken?: string;
}
```

## 🎨 **Design & Content Management**

### **DesignUpdatesWidget.tsx & DesignBentoGrid.tsx**
```typescript
// Design Asset Library
GET /api/assets/designs
Query: {
  category?: 'video_thumbnails' | 'social_media' | 'presentations';
  project?: string;
  status?: 'draft' | 'review' | 'approved';
  limit?: number;
}
Response: {
  assets: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    thumbnail: string;
    figmaUrl?: string;
    version: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    metadata: {
      dimensions?: string;
      fileSize: number;
      colorPalette?: string[];
    };
  }>;
}

// Asset Version Control
GET /api/assets/:assetId/versions
Response: {
  versions: Array<{
    version: number;
    url: string;
    changes: string;
    author: string;
    timestamp: Date;
  }>;
}

// Design Feedback
POST /api/assets/:assetId/feedback
Request: {
  type: 'approval' | 'revision_requested' | 'comment';
  message: string;
  annotations?: Array<{
    x: number;
    y: number;
    comment: string;
  }>;
}
```

## 🔄 **Real-time Features**

### **WebSocket Connections**
```typescript
// Connection Management
WS /ws/connect
Auth: JWT token in connection params

// Channel Subscriptions
Message: {
  type: 'subscribe';
  channels: ['dashboard', 'tasks', 'votes', 'chat'];
}

// Real-time Updates
Messages: {
  // Task Updates
  {
    type: 'task_update';
    data: { taskId, changes, user };
  }
  
  // Vote Updates  
  {
    type: 'vote_submitted';
    data: { itemId, newRating, voter };
  }
  
  // Pipeline Changes
  {
    type: 'pipeline_update';
    data: { videoId, stage, assignee };
  }
  
  // Comment Notifications
  {
    type: 'comment_added';
    data: { resourceType, resourceId, comment };
  }
}
```

## 🔍 **Search & Discovery**

### **Global Search Implementation**
```typescript
// Universal Search
GET /api/search
Query: {
  q: string;
  filters?: {
    type?: 'document' | 'video' | 'task' | 'request';
    dateRange?: [Date, Date];
    author?: string;
  };
  limit?: number;
}
Response: {
  results: Array<{
    type: string;
    id: string;
    title: string;
    snippet: string;
    url: string;
    relevanceScore: number;
    metadata: any;
  }>;
  facets: {
    types: Array<{ value: string; count: number }>;
    authors: Array<{ value: string; count: number }>;
    dates: Array<{ period: string; count: number }>;
  };
}
```

## 📊 **Analytics & Reporting**

### **Advanced Analytics**
```typescript
// Custom Reports
GET /api/analytics/reports
Query: {
  type: 'performance' | 'engagement' | 'pipeline' | 'financial';
  period: 'week' | 'month' | 'quarter' | 'year';
  filters?: any;
}

// Export Data
POST /api/analytics/export
Request: {
  reportType: string;
  format: 'pdf' | 'csv' | 'json';
  dateRange: [Date, Date];
  includeCharts?: boolean;
}
Response: {
  downloadUrl: string;
  expiresAt: Date;
}
```

## 🔒 **Security & Permissions**

### **Access Control**
```typescript
// User Permissions
GET /api/auth/permissions
Response: {
  user: {
    id: string;
    role: string;
    permissions: string[];
  };
  resources: Array<{
    type: string;
    id: string;
    permissions: string[];
  }>;
}

// Audit Logging
POST /api/audit/log
Request: {
  action: string;
  resourceType: string;
  resourceId: string;
  metadata?: any;
}
```

## 🚀 **Integration Priorities**

### **Phase 1: Core Functionality**
1. **Authentication System** - User login, sessions, permissions
2. **Dashboard Metrics** - Basic performance data and KPIs
3. **Request Management** - Submit and track requests
4. **Document Management** - Upload, view, and search documents

### **Phase 2: Advanced Features**  
1. **Video Pipeline** - Production workflow and voting
2. **Real-time Updates** - WebSocket integration
3. **Payment System** - Invoice and payment processing
4. **Advanced Analytics** - Detailed reporting and insights

### **Phase 3: Optimization**
1. **AI Integration** - Document chat and insights
2. **Advanced Search** - Semantic search capabilities  
3. **External Integrations** - Google Calendar, JIRA, etc.
4. **Performance Optimization** - Caching and scaling

## 📝 **API Standards**

### **Response Format**
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}
```

### **Error Handling**
```typescript
// HTTP Status Codes
200: Success
201: Created  
400: Bad Request
401: Unauthorized
403: Forbidden
404: Not Found
422: Validation Error
429: Rate Limited
500: Server Error

// Error Response Format
{
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Invalid input data",
    details: {
      field: "email",
      reason: "Invalid format"
    }
  }
}
```

This comprehensive endpoint mapping provides the complete backend integration specification needed to transform Crenoir X MAP from a frontend prototype into a fully functional executive stakeholder platform.