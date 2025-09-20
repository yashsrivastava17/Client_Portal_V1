# Crenoir X MAP - Design System Guidelines

## 🎨 **Visual Foundation**

### **Color Palette**
```
Primary: #8b3123 (Deep Maroon)
Primary Dark: #7a2e20 (Hover State)
Background: #f7efdb (Warm Beige)
Surface: rgba(255, 255, 255, 0.4) (Glass Cards)
Text: #8b3123 (Primary Text)
Border: rgba(139, 49, 35, 0.1-0.2) (Subtle Borders)
Accent: #f3e1b7 (Button Text/Highlights)
```

### **Typography System**
```
Font Family: 'Montserrat_Alternates' (Primary)
Font Weights:
- Regular: 400
- Medium: 500  
- SemiBold: 600
- Bold: 700

Font Scale:
- text-[10px] - Small metadata
- text-[11px] - Caption text
- text-[12px] - Body small
- text-[13px] - Body default
- text-[14px] - Body large
- text-[16px] - Subheadings
- text-[18px] - Section titles
- text-[20px] - Card titles
- text-[24px] - Page headers
- text-[32px] - Hero titles
```

### **Spacing Scale**
```
gap-1: 4px
gap-2: 8px  
gap-3: 12px
gap-4: 16px
gap-6: 24px
gap-8: 32px
gap-10: 40px
gap-16: 64px

Padding/Margin:
p-3: 12px
p-4: 16px
p-5: 20px
p-6: 24px
p-8: 32px
```

### **Border Radius System**
```
rounded-[12px] - Small elements (badges, small cards)
rounded-[16px] - Medium components
rounded-[24px] - Standard cards and containers
rounded-[32px] - Large panels and navigation
```

## 🧱 **Component Architecture**

### **Glass Effect Cards**
All cards should use the standard glass effect:
```tsx
style={{
  background: 'linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.04)), rgba(255, 255, 255, 0.4)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)'
}}
className="border border-[rgba(139,49,35,0.1)] rounded-[24px]"
```

### **Collapsible Sections**
- Header: Solid maroon background (`bg-[#8b3123]`)
- Content: Glass effect background
- Border radius: 24px
- Always include expand/collapse animation

### **Navigation Components**
- Active state: Glass effect with glow
- Hover state: Subtle scale and opacity changes
- Padding: px-6 py-3 for nav items
- Transitions: 300ms ease-in-out

### **Button Hierarchy**
```tsx
// Primary Button
className="bg-[#8b3123] hover:bg-[#7a2e20] text-[#f3e1b7] rounded-[12px] px-6 py-2"

// Secondary Button  
className="border border-[#8b3123] text-[#8b3123] hover:bg-[rgba(139,49,35,0.1)] rounded-[12px] px-6 py-2"

// Ghost Button
className="text-[#8b3123] hover:bg-[rgba(139,49,35,0.05)] rounded-[12px] px-4 py-2"
```

## 📱 **Responsive Patterns**

### **Grid Systems**
```tsx
// Bento Cards
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

// Content Cards
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Quick Actions
<div className="flex flex-col lg:flex-row gap-4 lg:gap-[20px]">
```

### **Container Widths**
```tsx
// Main container
<div className="max-w-[1480px] mx-auto w-full">

// Content sections
<div className="px-4 lg:px-8 py-6">
```

## 🎭 **Animation Guidelines**

### **Hover Animations**
```tsx
className="transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
```

### **Loading States**
```tsx
// Skeleton loading
className="animate-pulse bg-[rgba(139,49,35,0.1)]"

// Spinner loading  
className="animate-spin h-4 w-4"
```

### **Page Transitions**
- Fade in: 400ms ease-out
- Scale: 1.02 max scale on hover
- Shadow: Subtle lift on interaction

## 🎯 **Interaction States**

### **Focus States**
```tsx
className="focus:outline-none focus:ring-2 focus:ring-[#8b3123] focus:ring-opacity-50"
```

### **Disabled States**
```tsx
className="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
```

### **Loading States**
```tsx
className="relative disabled:pointer-events-none"
// Add loading overlay
```

## 📦 **Component Composition Rules**

### **Modal Structure**
1. Backdrop: Semi-transparent overlay
2. Container: Glass effect with 24px radius
3. Header: Consistent title styling
4. Content: Proper spacing and typography
5. Actions: Right-aligned button group

### **Widget Structure**
1. Use CollapsibleSection wrapper
2. Header with icon and title
3. Content with proper spacing
4. Action buttons in consistent positions

### **Card Structure**
1. Container with glass effect
2. Border and radius consistency
3. Hover states and transitions
4. Content hierarchy with typography scale

## 🔧 **Implementation Standards**

### **File Organization**
```
/components
  /ui - ShadCN components (don't modify)
  /[WidgetName].tsx - Page-specific widgets
  /[SharedComponent].tsx - Reusable components
```

### **Component Props**
```tsx
interface ComponentProps {
  // Always include these for consistency
  className?: string;
  children?: React.ReactNode;
  // Specific props...
}
```

### **State Management**
- Use useState for local component state
- Props drilling for parent-child communication
- Context for deeply nested shared state

## 🎨 **Icon Usage**

### **Icon Library**
- Primary: Lucide React icons
- Size: h-4 w-4 (standard), h-5 w-5 (headers), h-6 w-6 (large)
- Color: Inherit from parent text color

### **Icon Patterns**
```tsx
// With text
<div className="flex items-center gap-2">
  <Icon className="h-4 w-4" />
  <span>Label</span>
</div>

// Icon buttons
<Button size="icon" variant="ghost">
  <Icon className="h-4 w-4" />
</Button>
```

## 🌊 **Background Elements**

### **Floating Blobs**
- 6 animated SVG elements
- Varying sizes and opacities
- Smooth, continuous animations
- Z-index below content (z-0)

### **Glass Effects**
- Consistent blur(10px) backdrop filter
- Proper fallbacks for older browsers
- Border styling for definition

## ✅ **Quality Checklist**

Before implementing any new page/component:

- [ ] Follows color palette exactly
- [ ] Uses correct font families and weights  
- [ ] Implements proper glass effects
- [ ] Has consistent 24px border radius
- [ ] Includes hover and focus states
- [ ] Responsive across breakpoints
- [ ] Accessible keyboard navigation
- [ ] Proper semantic HTML structure
- [ ] Optimized for performance
- [ ] Follows component composition rules

## 🚀 **Performance Guidelines**

### **Optimization Rules**
- Lazy load components not in viewport
- Minimize re-renders with React.memo
- Use CSS transforms for animations
- Optimize SVG assets
- Implement proper loading states

### **Asset Management**
- Use Unsplash tool for images
- SVG icons preferred over raster
- Optimize image sizes for viewport
- Implement proper caching strategies