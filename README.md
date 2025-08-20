# TaskFlow Pro - Professional Task Management App

A beautiful, modern, and professional task management application built with React, TypeScript, and Tailwind CSS. TaskFlow Pro offers a clean, intuitive interface for managing your daily tasks with style and efficiency.

![TaskFlow Pro](https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=600&fit=crop&crop=edges)

## 🖼️ Screenshots

<img width="1920" height="1080" alt="Screenshot (174)" src="https://github.com/user-attachments/assets/43bdd506-9dcf-4aa8-a2f1-523b32b26e09" />
<img width="1920" height="1080" alt="Screenshot (175)" src="https://github.com/user-attachments/assets/56178b08-e1aa-47b1-a2ab-b59156f16d99" />
<img width="1920" height="1080" alt="Screenshot (176)" src="https://github.com/user-attachments/assets/98ec0e55-e12f-4f57-8e77-44e8073fb596" />
<img width="1920" height="1080" alt="Screenshot (177)" src="https://github.com/user-attachments/assets/c87cc006-ac5b-4ca4-823c-c1344fe1545c" />
<img width="1920" height="1080" alt="Screenshot (178)" src="https://github.com/user-attachments/assets/d4951d5e-bb9f-49fd-b562-e7fab1b63913" />

## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, complete, and delete tasks with ease
- **Priority Levels**: Organize tasks by High, Medium, and Low priority
- **Categories**: Filter tasks by All, Today, Upcoming, and Completed
- **Search**: Instantly find tasks with real-time search functionality
- **Due Dates**: Set and track task deadlines with overdue indicators

### 🎨 Design & User Experience
- **Professional UI**: Clean, modern interface inspired by productivity tools like Linear and Notion
- **Responsive Design**: Seamlessly works across desktop, tablet, and mobile devices
- **Smooth Animations**: Delightful micro-interactions and transitions
- **Beautiful Gradients**: Professional blue-purple color palette
- **Card-based Layout**: Organized, scannable task presentation
- **Visual Feedback**: Toast notifications for all user actions

### 🚀 Technical Excellence
- **TypeScript**: Full type safety for reliable development
- **React**: Modern hooks-based architecture
- **Tailwind CSS**: Utility-first styling with custom design system
- **Component Architecture**: Reusable, maintainable components
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant interface elements

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router for navigation
- **State Management**: React hooks and Context API

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd taskflow-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to see the application running.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, inputs, etc.)
│   ├── TaskSidebar.tsx  # Left navigation sidebar
│   ├── TaskCard.tsx     # Individual task display component
│   └── TaskForm.tsx     # Task creation/editing form
├── pages/               # Page components
│   ├── Index.tsx        # Main task management page
│   └── NotFound.tsx     # 404 error page
├── hooks/               # Custom React hooks
│   └── use-toast.ts     # Toast notification hook
├── lib/                 # Utility functions
│   └── utils.ts         # Helper functions
├── index.css           # Global styles and design system
└── main.tsx            # Application entry point
```

## 🎨 Design System

TaskFlow Pro implements a comprehensive design system with:

### Color Palette
- **Primary**: Professional blue (`hsl(225, 71%, 47%)`)
- **Secondary**: Elegant purple (`hsl(250, 46%, 50%)`)
- **Accent**: Success green (`hsl(142, 71%, 45%)`)
- **Warning**: Attention orange (`hsl(38, 92%, 50%)`)
- **Destructive**: Error red (`hsl(0, 84%, 60%)`)

### Design Tokens
- **Gradients**: Beautiful gradient combinations for buttons and backgrounds
- **Shadows**: Subtle depth with custom shadow definitions
- **Typography**: Clean, readable font hierarchy
- **Spacing**: Consistent spacing scale
- **Border Radius**: Rounded corners for modern feel

### Components
All components follow the design system with:
- Semantic color usage (no hardcoded colors)
- Consistent spacing and typography
- Hover states and transitions
- Focus states for accessibility

## 📱 Features Overview

### Task Management
- **Create Tasks**: Quick task creation with title, description, priority, and due date
- **Edit Tasks**: Inline editing of existing tasks
- **Complete Tasks**: Mark tasks as done with satisfying animations
- **Delete Tasks**: Remove tasks with confirmation
- **Priority Levels**: Visual priority indicators (High/Medium/Low)

### Organization
- **Categories**: 
  - All Tasks: Complete overview
  - Today: Tasks due today
  - Upcoming: Future tasks
  - Completed: Finished tasks
- **Search**: Real-time task filtering
- **Statistics**: Task completion metrics

### User Experience
- **Responsive Sidebar**: Collapsible navigation
- **Visual Feedback**: Toast notifications for all actions
- **Loading States**: Smooth animations during interactions
- **Empty States**: Helpful messaging when no tasks exist
- **Keyboard Navigation**: Full keyboard accessibility

## 🔧 Customization

### Adding New Priority Levels
1. Update the `Task` interface in `TaskCard.tsx`
2. Add new priority configuration in `priorityConfig`
3. Update the form select options in `TaskForm.tsx`
4. Add corresponding CSS classes in `index.css`

### Modifying the Color Scheme
1. Update CSS custom properties in `index.css`
2. Modify the Tailwind configuration in `tailwind.config.ts`
3. Ensure all components use semantic color tokens

### Adding New Categories
1. Update the `categories` array in `TaskSidebar.tsx`
2. Modify the filtering logic in `Index.tsx`
3. Add corresponding icons and labels

## 🚀 Deployment

### Production Build
```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Connect your Git repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **AWS S3**: Upload the build files to an S3 bucket
- **Any Static Host**: The app is a static site and can be hosted anywhere

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and patterns
- Use TypeScript for all new code
- Ensure components are accessible
- Write meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

### Planned Features
- [ ] **Data Persistence**: Local storage integration
- [ ] **Task Templates**: Pre-defined task templates
- [ ] **Drag & Drop**: Reorder tasks with drag and drop
- [ ] **Dark Mode**: Toggle between light and dark themes
- [ ] **Export/Import**: Backup and restore task data
- [ ] **Collaboration**: Share tasks with team members
- [ ] **Calendar View**: Visual calendar for task scheduling
- [ ] **Subtasks**: Break down complex tasks
- [ ] **Tags**: Flexible task categorization
- [ ] **Time Tracking**: Track time spent on tasks

### Technical Improvements
- [ ] **PWA Support**: Offline functionality
- [ ] **API Integration**: Backend synchronization
- [ ] **Performance**: Virtual scrolling for large task lists
- [ ] **Testing**: Comprehensive test suite
- [ ] **Accessibility**: Enhanced screen reader support

## 🙏 Acknowledgments

- **Radix UI** for accessible component primitives
- **Lucide** for beautiful, consistent icons
- **Tailwind CSS** for the utility-first CSS framework
- **React Team** for the amazing framework
- **Vite** for the lightning-fast build tool
