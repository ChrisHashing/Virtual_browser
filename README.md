# Virtual Browser

A React-based virtual browser application with a modern component structure.

## Features

- Modern React component architecture with module CSS
- Tab management system
- Navigation controls (back, forward, refresh, home)
- Address bar with URL input
- Sidebar for additional functionality
- Responsive design for various screen sizes
- Light/dark theme support

## Project Structure

```
src/
├── components/
│   ├── Content/
│   │   ├── BrowserContent.jsx
│   │   ├── BrowserContent.module.css
│   │   ├── DefaultContent.jsx
│   │   └── DefaultContent.module.css
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── Navigation/
│   │   ├── AddressBar.jsx
│   │   ├── AddressBar.module.css
│   │   ├── NavigationControls.jsx
│   │   └── NavigationControls.module.css
│   ├── Sidebar/
│   │   ├── Sidebar.jsx
│   │   └── Sidebar.module.css
│   ├── Tabs/
│   │   ├── Tab.jsx
│   │   ├── Tab.module.css
│   │   ├── TabBar.jsx
│   │   └── TabBar.module.css
│   └── UI/
│       ├── Button.jsx
│       ├── Button.module.css
│       ├── Modal.jsx
│       └── Modal.module.css
├── App.jsx
├── App.module.css
├── index.css
└── main.jsx
```

## Technologies Used

- React
- CSS Modules
- React Icons
- UUID for unique identifiers

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Development

This project uses a component-based architecture with CSS modules for styling. Each component has its own folder with a JSX file and a corresponding CSS module file.

## License

MIT