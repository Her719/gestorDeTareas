# 📋 Task Manager - Modern Task Management Application

A professional, fully-functional task management web application built with **TypeScript**, **HTML5**, and **CSS3** — no frameworks, no unnecessary dependencies.

## ✨ Features

- ✅ **Create Tasks** - Add tasks with title, description, priority, and due dates
- ✅ **Complete Tasks** - Mark tasks as done with smooth animations
- ✅ **Delete Tasks** - Remove tasks with confirmation
- ✅ **Smart Sorting** - Automatic sorting by priority and due date
- ✅ **Visual Alerts** - Color-coded warnings for upcoming and overdue tasks
- ✅ **Filters & Search** - Filter by priority, status, and search in real-time
- ✅ **Statistics** - Dashboard with task count, pending, completed, and overdue tasks
- ✅ **Dark/Light Mode** - Theme toggle with persistent storage
- ✅ **Local Persistence** - All data saved to localStorage
- ✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ✅ **Modern UI/UX** - Minimalist design inspired by Notion, Linear, and Todoist
- ✅ **Smooth Animations** - Polished micro-interactions and transitions

## 🛠️ Tech Stack

- **Language**: TypeScript (strict mode)
- **Markup**: HTML5
- **Styling**: CSS3 (variables, grid, flexbox)
- **Build Tool**: TypeScript Compiler (tsc)
- **Package Manager**: npm

## 📁 Project Structure

```
task-manager/
├── src/
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces and types
│   ├── utils/
│   │   ├── storage.ts             # localStorage management
│   │   ├── validation.ts          # Input validation utilities
│   │   ├── date.ts                # Date manipulation utilities
│   │   └── taskManager.ts         # Core task management logic
│   ├── components/
│   │   ├── taskForm.ts            # Task creation form
│   │   ├── taskList.ts            # Task list renderer
│   │   ├── taskCard.ts            # Individual task card component
│   │   ├── themeToggle.ts         # Theme switcher
│   │   ├── statsPanel.ts          # Statistics panel
│   │   └── filters.ts             # Filter controls
│   ├── styles/
│   │   ├── variables.css          # CSS custom properties and design tokens
│   │   ├── main.css               # Main styles
│   │   └── responsive.css         # Media queries for all screen sizes
│   ├── config/
│   │   └── index.ts               # Application constants and config
│   └── main.ts                    # Application entry point
├── dist/                          # Compiled JavaScript output
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ or later
- **npm** 7+ or later

### Installation

1. **Clone or navigate to the project directory:**

```bash
cd path/to/task-manager
```

2. **Install dependencies:**

```bash
npm install
```

3. **Compile TypeScript to JavaScript:**

```bash
npm run build
```

4. **Open the application:**

Simply open `index.html` in your web browser:

- Double-click the file, or
- Use a local server (recommended):

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## 🔧 Development

### Watch Mode

Watch for TypeScript changes and automatically recompile:

```bash
npm run dev
```

This command will monitor all `.ts` files in the `src` directory and recompile whenever changes are detected.

### Manual Compilation

Compile TypeScript once:

```bash
npm run build
```

## 📋 Usage Guide

### Creating Tasks

1. Enter the task title in the input field
2. (Optional) Add a description
3. Select priority level (Low, Medium, High)
4. (Optional) Set a due date
5. Click "Add Task" or press Enter

### Managing Tasks

- **Complete a Task**: Click the checkbox next to the task
- **Delete a Task**: Click the trash icon (confirmation required)
- **Toggle Theme**: Click the sun/moon icon in the header

### Filtering Tasks

- **Search**: Type in the search box to find tasks by title or description
- **Priority Filter**: Select a priority level to show only those tasks
- **Status Filter**: Show all tasks, only pending, or only completed

### Understanding Visual Alerts

Tasks change appearance based on due date proximity:

- **Normal**: Standard appearance
- **Alert** (3 days before): Orange border and highlighted background
- **Overdue**: Red border and highlighted background

Configure alert days in the application (default: 3 days).

## 💾 Data Persistence

All data is automatically saved to browser localStorage:

- Tasks and their status
- Application theme preference
- Filter and search settings
- User configuration

Data persists across browser sessions until manually cleared.

## 🎨 Customization

### Theme Colors

Edit `src/styles/variables.css` to customize colors:

```css
:root[data-theme="dark"] {
  --color-priority-low: #79c0ff;
  --color-priority-medium: #ffa657;
  --color-priority-high: #ff7b72;
  /* ... more variables */
}
```

### Default Configuration

Edit `src/config/index.ts`:

```typescript
export const DEFAULT_CONFIG = {
  theme: "dark" as const,
  alertDaysBefore: 3, // Change alert window
};
```

## 📱 Responsive Breakpoints

The application is fully responsive with optimized views for:

- **Desktop**: 1025px and up
- **Tablet**: 768px - 1024px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px
- **Landscape Mobile**: Specific optimizations

## 🚀 Deployment

### Deploy to Vercel (Free & Recommended)

1. **Push your project to GitHub:**

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/task-manager.git
git push -u origin main
```

2. **Visit Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect TypeScript and build correctly

3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `./`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Your app will be live at `yourname.vercel.app`

### Deploy to Netlify

1. **Build locally:**

```bash
npm run build
```

2. **Drag & Drop Deploy:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Drag and drop the project folder
   - Done! Your app is live

### Deploy to GitHub Pages

1. **Build the project:**

```bash
npm run build
```

2. **Create a `gh-pages` branch:**

```bash
git checkout -b gh-pages
git add -A
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

3. **Enable GitHub Pages:**
   - Go to repository Settings
   - Select "gh-pages" as the source branch
   - Your app will be live at `username.github.io/task-manager`

## 🏗️ Architecture Highlights

### Modular Design

- **Separation of Concerns**: Logic, UI, and utilities are completely separated
- **Reusable Components**: Each component is independent and composable
- **Type Safety**: Full TypeScript with strict mode enabled
- **Single Responsibility**: Each file has one clear purpose

### Performance

- **No Framework Overhead**: Pure TypeScript and CSS
- **Efficient DOM Updates**: Targeted element updates, not full re-renders
- **CSS Animations**: Hardware-accelerated transitions
- **Optimized Bundle**: Minimal code, maximum functionality

### Best Practices

- **Clean Code**: Following industry standards and conventions
- **Error Handling**: Validation and safe error recovery
- **Accessibility**: Semantic HTML, proper labels, keyboard support
- **Browser Compatibility**: Works on all modern browsers
- **Mobile-First**: Responsive design starts from mobile

## 📊 Statistics Dashboard

The app displays real-time statistics:

- **Total**: Total number of tasks
- **Pending**: Tasks not yet completed
- **Completed**: Finished tasks
- **Overdue**: Tasks past their due date

All statistics update automatically when tasks are created, completed, or deleted.

## 🔒 Data Privacy

- ✅ All data stored locally in your browser
- ✅ No server uploads
- ✅ No tracking or analytics
- ✅ No third-party services
- ✅ Complete user privacy

## 🐛 Troubleshooting

### Tasks not saving?

- Check browser localStorage is enabled
- Check browser console for errors (F12)
- Try clearing cache and reloading

### Theme not applying?

- Clear browser cache
- Hard refresh the page (Ctrl+Shift+R)
- Check that JavaScript is enabled

### TypeScript not compiling?

- Make sure Node.js 16+ is installed: `node --version`
- Run `npm install` to ensure dependencies are installed
- Try deleting `node_modules` and `dist` folders and reinstalling

## 📝 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or issues.

## 💡 Future Enhancements

Potential features for future versions:

- Task categories/tags
- Recurring tasks
- Task notes/attachments
- Export/Import functionality
- Keyboard shortcuts
- Collaborative features
- Cloud synchronization
- Task templates
- Advanced analytics
- Notification system

## 📞 Support

For issues or questions, create an issue in the repository.

---

**Built with ❤️ using TypeScript, HTML5, and CSS3**

Enjoy your modern task management experience! 🚀
