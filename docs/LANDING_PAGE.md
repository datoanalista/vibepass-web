# Landing Page Documentation

## Overview

The landing page is a comprehensive, customizable page designed for external customers to promote your events and services. It features a modern, dark-themed design with green (#12C70E) accent colors that matches your brand identity.

## Route

The landing page is accessible at `/landing` and is completely separate from the existing home page, allowing you to customize it specifically for marketing and customer acquisition.

## Features

### 1. Header Component

- **Social Media Links**: Instagram, Facebook, and WhatsApp icons
- **Central Logo**: Prominent Vibepass branding
- **Action Buttons**: Login button and hamburger menu
- **Responsive Design**: Mobile-friendly with hidden social icons on small screens

### 2. Search Bar

- **Full-width Search**: Prominent search functionality with search icon
- **Accessible Design**: Proper focus states and keyboard navigation

### 3. Breadcrumb Navigation

- **Clear Path**: HOME > EVENTOS > KERMESSE
- **Consistent Typography**: Matches overall design language

### 4. Filter Controls

- **Institution Filter**: Dropdown for filtering by institution
- **Location Filter**: Dropdown for filtering by location
- **Mobile Responsive**: Centered layout on mobile devices

### 5. Hero Section

- **Large Image Display**: Prominent featured event image
- **Navigation Controls**: Left/right carousel navigation arrows
- **Event Information Overlay**:
  - Event date and location
  - Event title with bold typography
  - Call-to-action "Comprar QR" button
- **Responsive Design**: Adapts to different screen sizes

### 6. Events Grid

- **Six Event Cards**: Displaying upcoming events
- **Each Event Card Includes**:
  - Ticket availability counter
  - Event image
  - Date badge with day and month
  - Location with map icon
  - Event title and time
  - "Comprar ticket" button
  - Verification checkmark icon
- **Responsive Grid**: 3 columns on desktop, 2 on tablet, 1 on mobile
- **Load More**: "Ver más eventos" button to expand the grid

### 7. Footer Section

- **Wave Background**: Decorative SVG wave transition
- **Vibepass Branding**: Rotated brand element
- **Content Sections**:
  - Social media follow section with description
  - Contact information with email
  - Payment method logos (MercadoPago, WebPay, etc.)
- **Copyright Bar**: Full-width copyright notice

## Components Structure

```
src/components/Landing/
├── Header/
│   ├── Header.tsx
│   └── Header.module.css
├── SearchBar/
│   ├── SearchBar.tsx
│   └── SearchBar.module.css
├── HeroSection/
│   ├── HeroSection.tsx
│   └── HeroSection.module.css
├── EventsGrid/
│   ├── EventsGrid.tsx
│   └── EventsGrid.module.css
└── Footer/
    ├── Footer.tsx
    └── Footer.module.css
```

## Data Management

Event data is managed through a centralized data file:

```
src/data/Landing/
└── eventsData.ts
```

This allows for easy customization and management of event information without modifying components.

## Styling

### Design System

- **Primary Background**: #1D1D1D (Dark theme)
- **Accent Color**: #12C70E (Vibepass green)
- **Text Colors**:
  - Primary: #FFF (White)
  - Secondary: #424040 (Gray)
  - Accent: #121212 (Near black)

### Typography

- **Primary Font**: Inter
- **Secondary Font**: Poppins (for hero titles)
- **Responsive Typography**: Scales appropriately across devices

### Layout

- **Container Padding**: 82px on desktop, 40px on tablet, 20px on mobile
- **Grid System**: CSS Grid with responsive breakpoints
- **Flexbox**: Used for component alignment and spacing

## Customization

### Adding New Events

1. Edit `src/data/Landing/eventsData.ts`
2. Add new event objects with the required properties:
   ```typescript
   {
     id: "unique-id",
     ticketsAvailable: "number",
     imageUrl: "image-url",
     date: "day",
     month: "month-name",
     location: "venue-location",
     title: "event-title",
     time: "start-time - end-time"
   }
   ```

### Updating Hero Content

- Modify `src/components/Landing/HeroSection/HeroSection.tsx`
- Update event details, image, and call-to-action text

### Customizing Colors

- Update CSS custom properties in component styles
- Primary accent color is defined as #12C70E throughout

### Adding Functionality

- Event card clicks can be enhanced with routing
- Search bar can be connected to filtering logic
- Filter dropdowns can be made functional

## Responsive Breakpoints

- **Desktop**: 992px and above
- **Tablet**: 641px to 991px
- **Mobile**: 640px and below

## Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Labels**: Where appropriate for complex interactions
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Color Contrast**: Meets WCAG guidelines for text readability

## Performance

- **Optimized Images**: Uses responsive image loading
- **CSS Modules**: Scoped styles prevent conflicts
- **Tree Shaking**: Only used components are included in the bundle
- **Static Generation**: Page is pre-rendered for optimal performance

## Future Enhancements

1. **Dynamic Content**: Connect to a CMS or API for event management
2. **Search Functionality**: Implement actual search and filtering
3. **Analytics**: Add tracking for user interactions
4. **A/B Testing**: Test different layouts and content variations
5. **Multi-language**: Support for multiple languages
6. **Progressive Enhancement**: Add JavaScript-enhanced features
7. **Animations**: Subtle animations for better user experience

## Usage

To use the landing page:

1. Navigate to `/landing` in your application
2. The page is fully self-contained and ready for production
3. Customize the content in the data files and components as needed
4. Deploy with your existing Next.js application

The landing page is designed to be a powerful marketing tool for promoting your events and services to external customers while maintaining the professional look and feel of your brand.
