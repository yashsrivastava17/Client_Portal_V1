# Crenoir X MAP - Comprehensive Frontend Handoff Guide

## 📋 **Project Overview**

### **Application Purpose**
Crenoir X MAP is an executive-level stakeholder voting and decision-making platform for video production workflows. It evolved from a retro-futuristic aesthetic to a professional skeuomorphic design system focused on strategic decision-making and pipeline management.

### **Core Features**
- **Multi-page Application**: Design, Echo, Calendar, Labs pages
- **Dual View Modes**: Bento grid and collapsible list views
- **Pipeline Management**: AI and Human workflow tracking
- **Voting System**: Star ratings with decimal input for video content
- **Executive Dashboard**: Performance metrics and strategic insights
- **Document Management**: AI-powered document chat and insights
- **Payment Processing**: Integrated billing and invoicing
- **Real-time Collaboration**: WebSocket-based updates

## 🛠 **Technology Stack**

### **Core Technologies**
```typescript
Framework: React 18+ with TypeScript
Styling: Tailwind CSS v4.0 + Custom CSS
UI Components: ShadCN/UI (Radix-based)
Icons: Lucide React
Animations: CSS transitions + Tailwind transforms
State Management: React useState (component-level)
File Structure: Component-per-file architecture
```

### **Key Dependencies**
```json
{
  "react": "^18.0.0",
  "typescript": "^5.0.0", 
  "tailwindcss": "^4.0.0",
  "@radix-ui/react-*": "Latest",
  "lucide-react": "Latest"
}
```

### **Asset Management**
- **Images**: Unsplash API integration via `unsplash_tool`
- **SVGs**: Component-based imports from `/imports` directory
- **Fonts**: Montserrat Alternates (Google Fonts)
- **Icons**: Lucide React icon library

## 🏗 **Architecture Overview**

### **Application Structure**
```
/App.tsx                    # Main application entry point
├── Navigation System       # TopNavigation.tsx
├── Page Router            # Conditional rendering based on currentPage
├── Modal System           # Multiple modal components
├── Background Effects     # Animated floating elements
└── Layout Container       # Responsive grid system
```

### **Page Architecture**
```typescript
interface AppState {
  currentPage: "design" | "echo" | "calendar" | "labs";
  viewMode: "bento" | "list";
  modalStates: {
    requestModal: boolean;
    kanbanModal: boolean;
    paymentModal: boolean;
    documentReader: boolean;
  };
}
```

### **View Mode System**
The application supports two primary view modes:

**Bento Mode (`viewMode === "bento"`)**:
- Renders `DesignBentoGrid` component
- Grid-based layout for quick access
- Optimized for desktop/tablet viewing

**List Mode (`viewMode === "list"`)** - **DEFAULT**:
- Hero carousel + bento cards + collapsible sections
- Executive-friendly hierarchical layout
- Better for comprehensive information consumption

## 🧱 **Component Architecture**

### **Component Hierarchy**
```
App.tsx
├── TopNavigation.tsx
│   ├── NavItem components
│   ├── Avatar integration
│   └── View mode toggle
├── Page Components
│   ├── MainCarousel.tsx
│   ├── BentoCards.tsx
│   └── Widget Components
└── Modal Components
    ├── EnhancedRequestModal.tsx
    ├── KanbanBoardModal.tsx
    ├── PaymentModal.tsx
    └── DocumentReaderModal.tsx
```

### **Widget System**
All main content widgets follow consistent patterns:

```typescript
// Standard widget props
interface WidgetProps {
  onOpenModal?: () => void;
  onActionClick?: (action: string) => void;
  className?: string;
}

// Widget wrapper pattern
<CollapsibleSection 
  title="Widget Name"
  icon={<Icon />}
  defaultOpen={true}
>
  {/* Widget content */}
</CollapsibleSection>
```

### **Core Widgets**
1. **LogisticsWidget** - Payment and billing management
2. **DesignUpdatesWidget** - Design asset tracking
3. **DocsInsightsWidget** - Document management and AI chat
4. **MetricsOnlyWidget** - Performance analytics
5. **ProductPlanWidget** - Task and project management  
6. **EnhancedRaiseRequestsSection** - Request submission system

## 🎯 **State Management Patterns**

### **Component-Level State**
```typescript
// Primary application state (App.tsx)
const [currentPage, setCurrentPage] = useState<"design" | "echo" | "calendar" | "labs">("design");
const [viewMode, setViewMode] = useState<"bento" | "list">("list");

// Modal state management
const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
const [selectedRequestType, setSelectedRequestType] = useState<RequestType>();

// Data state
const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
```

### **Props Drilling Pattern**
State flows down through component hierarchy via props:
```typescript
App.tsx 
  → TopNavigation (currentPage, viewMode, handlers)
  → Widgets (modal handlers, action handlers)  
  → Modals (isOpen, onClose, data)
```

### **Event Handler Patterns**
```typescript
// Centralized handler functions in App.tsx
const handleOpenRequest = (type?: RequestType) => {
  setSelectedRequestType(type);
  setIsRequestModalOpen(true);
};

const handlePageChange = (page: PageType) => {
  setCurrentPage(page);
};

// Passed down to child components
<Widget onOpenRequest={() => handleOpenRequest("design-change")} />
```

## 🎨 **Design System Integration**

### **Skeuomorphic Design Language**
The application uses a comprehensive skeuomorphic design system:

```css
/* Core design classes */
.skeuo-card                 /* Standard elevated cards */
.skeuo-card-elevated       /* Higher elevation cards */  
.skeuo-button              /* Standard buttons */
.skeuo-button-primary      /* Primary action buttons */
.skeuo-input               /* Form inputs */
.skeuo-toggle              /* Toggle switches */
```

### **Color System**
```css
:root {
  --primary: #8b3123;        /* Deep maroon primary */
  --primary-dark: #7a2e20;   /* Hover states */
  --background: #ffffff;      /* Pure white base */
  --surface: #fafbfc;        /* Subtle surface tint */
  --border: rgba(139,49,35,0.1); /* Subtle borders */
}
```

### **Typography Scale**
```css
/* Font: Montserrat Alternates */
font-['Montserrat_Alternates:Regular',_sans-serif]    /* Body text */
font-['Montserrat_Alternates:SemiBold',_sans-serif]   /* Subheadings */
font-['Montserrat_Alternates:Bold',_sans-serif]       /* Headings */

/* Scale: text-sm, text-base, text-lg, text-xl, text-2xl */
```

### **Responsive Design**
```typescript
// Container system
<div className="max-w-[1480px] mx-auto w-full px-4 lg:px-8">

// Grid patterns  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

// Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
```

## 🔄 **Navigation System**

### **Sticky Navigation**
The `TopNavigation` component features advanced morphing behavior:

```typescript
// Scroll-based state management
const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrolled = window.scrollY > 60;
    setIsScrolled(scrolled);
  };
}, []);
```

### **Morphing Animation**
```css
/* Container transforms from center origin */
style={{ transformOrigin: 'center center' }}

/* Large state */
height: 80px, width: 90%, full elements visible

/* Compact state */  
height: 64px, width: auto, reduced elements
```

### **Page Routing Logic**
```typescript
// Conditional page rendering
if (currentPage === "echo") {
  return <EchoPage onPageChange={handlePageChange} />;
}

// Default design page renders main App component
return <div>/* Main app content */</div>;
```

## 💫 **Animation & Interactions**

### **Background Animation System**
```typescript
// 12 floating background elements
<div className="fixed inset-0 pointer-events-none">
  {/* Large, medium, small, micro floating elements */}
  <div className="absolute animate-float-1" style={{...}}>
    <div className="bg-gradient-to-br from-[#8B3123] to-[#7a2e20] opacity-[0.03]" />
  </div>
</div>
```

### **CSS Animation Classes**
```css
@keyframes float-1 { /* Complex transform animations */ }
@keyframes float-2 { /* Rotation + scale variations */ }
@keyframes float-3 { /* Translation patterns */ }  
@keyframes float-4 { /* Multi-stage transforms */ }

/* Applied with staggered delays */
.animate-float-1 { animation: float-1 20s ease-in-out infinite; }
```

### **Interaction States**
```css
/* Hover transformations */
.hover\:scale-\[1\.02\]:hover { transform: scale(1.02); }

/* Transition timing */
.transition-all { transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }

/* Focus states */
.focus\:ring-2 { outline: 2px solid rgba(139,49,35,0.5); }
```

## 🖼 **Modal System**

### **Modal Architecture**
All modals follow consistent patterns:

```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Modal-specific props
}

// Usage pattern
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  {/* Modal content */}
</Modal>
```

### **Modal Types**
1. **EnhancedRequestModal** - Request submission with type selection
2. **KanbanBoardModal** - Task management interface  
3. **PaymentModal** - Payment processing interface
4. **DocumentReaderModal** - Document viewer with AI chat

### **Modal State Management**
```typescript
// Individual modal states
const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
const [isKanbanModalOpen, setIsKanbanModalOpen] = useState(false);

// Modal data context
const [selectedRequestType, setSelectedRequestType] = useState<RequestType>();
const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
```

## 📱 **Responsive Design Strategy**

### **Breakpoint System**
```typescript
// Tailwind breakpoints
sm: 640px   // Small tablets
md: 768px   // Large tablets  
lg: 1024px  // Small desktops
xl: 1280px  // Large desktops

// Usage patterns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
className="hidden lg:flex"
className="px-4 lg:px-8"
```

### **Mobile-First Approach**
```typescript
// Start with mobile layout
<div className="flex flex-col gap-4">

// Add larger breakpoint variations  
<div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

// Hide/show elements by breakpoint
<div className="hidden lg:block">Desktop only</div>
<div className="lg:hidden">Mobile only</div>
```

### **Container Strategy**
```typescript
// Main content container
<div className="max-w-[1480px] mx-auto w-full px-4 lg:px-8 pt-[120px]">
  {/* Responsive padding for fixed navbar */}
</div>
```

## 🗂 **File Organization**

### **Directory Structure**
```
/components/
├── ui/                    # ShadCN components (DO NOT modify)
├── figma/                 # Figma-specific components  
├── TopNavigation.tsx      # Navigation system
├── MainCarousel.tsx       # Hero carousel
���── BentoCards.tsx        # Quick action cards
├── *Widget.tsx           # Collapsible section widgets
├── *Modal.tsx            # Modal components
└── *Page.tsx             # Full page components

/styles/
└── globals.css           # Tailwind + custom styles

/imports/ 
├── svg-*.ts              # SVG path definitions
└── *.tsx                 # Figma component imports
```

### **Component Naming Conventions**
```typescript
// Widget components
LogisticsWidget.tsx
DesignUpdatesWidget.tsx  
MetricsOnlyWidget.tsx

// Modal components
EnhancedRequestModal.tsx
KanbanBoardModal.tsx
PaymentModal.tsx

// Page components  
EchoPage.tsx
App.tsx (default design page)
```

### **Import Patterns**
```typescript
// UI components
import { Button } from "./components/ui/button";

// Custom components  
import { TopNavigation } from "./components/TopNavigation";

// SVG imports
import svgPaths from "./imports/svg-dvhla9drce";

// Type definitions
interface ComponentProps {
  // Props definition
}
```

## ⚡ **Performance Considerations**

### **Bundle Optimization**
- **Code Splitting**: Each page component can be lazy loaded
- **Tree Shaking**: Only import used components from libraries
- **Image Optimization**: Use Unsplash tool for optimized images

### **Rendering Optimization**
```typescript
// Conditional rendering to minimize DOM
{viewMode === "bento" ? <BentoGrid /> : <ListView />}

// Event handler optimization
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);

// Heavy component lazy loading
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

### **Animation Performance**
```css
/* Use transform instead of layout properties */
.hover\:scale-\[1\.02\]:hover { transform: scale(1.02); }

/* Hardware acceleration */
.animate-float-1 { transform: translateZ(0); }

/* Reduced motion respect */
@media (prefers-reduced-motion: reduce) {
  .animate-float-1 { animation: none; }
}
```

## 🔧 **Development Workflow**

### **Component Development Pattern**
1. **Create Component File**: `ComponentName.tsx`
2. **Define TypeScript Interface**: Props and state types
3. **Implement Component**: Following design system patterns
4. **Add to Parent**: Import and integrate with state management
5. **Test Responsive**: Verify across breakpoints

### **Styling Approach**
```typescript
// Prefer Tailwind classes
className="skeuo-card rounded-[24px] p-6 hover:scale-[1.02] transition-all"

// Custom CSS for complex animations only
// Use CSS variables for theming

// Component-specific styling
const StyledComponent = styled.div`
  /* Only when Tailwind insufficient */
`;
```

### **State Management Guidelines**
- **Local State**: `useState` for component-specific state
- **Shared State**: Props drilling for parent-child communication  
- **Global State**: Context API for deeply nested shared state
- **Server State**: Custom hooks for API data management

## 📊 **Data Flow Patterns**

### **API Integration Points**
```typescript
// Mock data patterns (current)
const mockData = [
  // Static data arrays
];

// Future API integration points  
const fetchData = async () => {
  // API calls will replace mock data
};

// State updates
const [data, setData] = useState(mockData);
```

### **Event Handling Flow**
```typescript
// App.tsx (State Container)
const handleAction = (params) => {
  // Update state
  // Trigger side effects
};

// Widget Components (Event Sources)
<Button onClick={() => onAction(params)}>

// Modal Components (Event Targets)  
<Modal isOpen={isOpen} onClose={onClose} />
```

## 🎯 **Testing Strategy**

### **Component Testing**
```typescript
// Test component rendering
test('renders widget correctly', () => {
  render(<Widget onAction={mockFn} />);
  expect(screen.getByText('Widget Title')).toBeInTheDocument();
});

// Test interactions
test('handles click events', () => {
  const mockHandler = jest.fn();
  render(<Button onClick={mockHandler} />);
  fireEvent.click(screen.getByRole('button'));
  expect(mockHandler).toHaveBeenCalled();
});
```

### **Integration Testing**
```typescript
// Test state management
test('modal opens when button clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByText('Open Modal'));
  expect(screen.getByRole('dialog')).toBeVisible();
});
```

### **Visual Regression Testing**
- **Storybook**: Component isolation testing
- **Chromatic**: Visual diff testing
- **Percy**: Cross-browser visual testing

## 🚀 **Build & Deployment**

### **Build Configuration**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "preview": "vite preview",
    "type-check": "tsc --noEmit"
  }
}
```

### **Environment Configuration**
```typescript
// Environment variables
VITE_API_URL=http://localhost:3000/api
VITE_UNSPLASH_ACCESS_KEY=your_key_here
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### **Deployment Checklist**
- [ ] TypeScript compilation passes
- [ ] All responsive breakpoints tested
- [ ] Modal interactions functional
- [ ] Navigation morphing works correctly
- [ ] Background animations perform well
- [ ] Image assets loading properly
- [ ] Accessibility standards met

## 🔍 **Debugging Guidelines**

### **Common Issues**
1. **Navigation Morphing**: Check `transformOrigin` and container width
2. **Modal State**: Verify state management and event handlers
3. **Responsive Layout**: Test grid breakpoints and container max-widths
4. **Animation Performance**: Monitor frame rates during interactions

### **Debug Tools**
```typescript
// React DevTools: Component state inspection
// Browser DevTools: CSS layout debugging  
// Performance tab: Animation frame analysis
// Lighthouse: Performance and accessibility audits
```

## 📚 **Knowledge Transfer**

### **Key Files to Understand**
1. **`/App.tsx`** - Main application logic and state management
2. **`/components/TopNavigation.tsx`** - Navigation system with morphing
3. **`/styles/globals.css`** - Design system and animation definitions
4. **`/guidelines/Design-System-Guidelines.md`** - Comprehensive design rules

### **Critical Patterns**
- **Modal State Management**: Centralized in App.tsx with props drilling
- **View Mode System**: Conditional rendering based on viewMode state
- **Navigation Morphing**: Transform-based animations with scroll detection
- **Responsive Design**: Mobile-first with progressive enhancement

### **Extension Points**
- **New Pages**: Add to currentPage type and routing logic
- **New Widgets**: Follow CollapsibleSection wrapper pattern
- **New Modals**: Add state management to App.tsx
- **API Integration**: Replace mock data with API calls

## ⚠️ **Important Notes**

### **Do Not Modify**
- `/components/ui/*` - ShadCN components
- `/components/figma/ImageWithFallback.tsx` - Protected system component

### **Maintain Consistency**
- Use existing color variables and design tokens
- Follow established component patterns
- Maintain responsive design principles
- Preserve animation performance characteristics

### **Performance Priorities**
- Smooth navigation morphing animations
- Responsive grid layouts across breakpoints
- Efficient background animation rendering
- Fast modal open/close transitions

This handoff guide provides the comprehensive foundation needed for any developer to understand, maintain, and extend the Crenoir X MAP frontend application.