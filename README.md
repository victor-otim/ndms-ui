# NDMS UI

Network Device Management System - User Interface

A modern, responsive React-based web application for managing and monitoring network devices. Built with Vite, TypeScript, Tailwind CSS, and React Router.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (version 9.0.0 or higher) - comes with Node.js
- **Git** - [Download](https://git-scm.com/)

To verify your installations, run:
```bash
node --version
npm --version
git --version
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/victor-otim/ndms-ui.git
cd ndms-ui
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

This command will install:
- React and React DOM
- React Router for navigation
- TypeScript for type safety
- Vite for fast development and building
- Tailwind CSS for styling
- ESLint for code quality
- Additional UI and utility libraries

### 3. Verify Installation

To verify everything is installed correctly, run:

```bash
npm run lint
```

This should complete without errors.

## Usage

### Development Mode

To start the development server with hot module replacement:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another available port).

**Features in development mode:**
- Hot reload: Changes are reflected instantly
- Source maps for easy debugging
- Full TypeScript support

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This command will:
1. Compile TypeScript to JavaScript
2. Bundle and optimize all assets
3. Generate production-ready files in the `dist/` directory
4. Output minified CSS and JavaScript

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

This serves the contents of the `dist/` directory.

### Code Quality

To lint and check code quality:

```bash
npm run lint
```

This runs ESLint to identify and report style issues in your TypeScript and React code.

## Project Structure

```
ndms-ui/
├── src/
│   ├── Components/
│   │   ├── DeviceForm.tsx          # Device form component
│   │   ├── DeviceList.tsx          # Device listing component
│   │   ├── DeviceStatusReportForm.tsx
│   │   ├── DeviceStatusReportHistory.tsx
│   │   ├── SearchBar.tsx           # Search functionality
│   │   ├── Tables.tsx              # Table components
│   │   └── Form/
│   │       ├── Button.tsx          # Reusable button
│   │       ├── Dropdown.tsx        # Dropdown component
│   │       ├── Error.tsx           # Error display
│   │       ├── Field.tsx           # Form field wrapper
│   │       ├── Input.tsx           # Input field
│   │       └── Label.tsx           # Form label
│   ├── Hooks/
│   │   ├── useDevices.tsx          # Custom hook for device data
│   │   └── useDeviceTypes.tsx      # Custom hook for device types
│   ├── Utils/
│   │   ├── Api.tsx                 # API calls and axios setup
│   │   └── Common.tsx              # Common utility functions
│   ├── App.tsx                     # Main application component
│   ├── App.css                     # Application styles
│   ├── Dashboard.tsx               # Dashboard component
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── index.html                      # HTML entry point
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint configuration
└── package.json                    # Project dependencies and scripts
```

## Configuration Files

### TypeScript
- `tsconfig.json` - Main TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript settings
- `tsconfig.node.json` - Node-specific TypeScript settings

### Styling
- `tailwind.config.js` - Tailwind CSS customization
- `postcss.config.js` - PostCSS plugins configuration

### Tooling
- `vite.config.ts` - Vite build tool configuration
- `eslint.config.js` - Code quality and linting rules

## Key Features

- **React 19** - Modern React with hooks and latest features
- **TypeScript** - Full type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Lightning-fast build tool and dev server
- **React Router** - Client-side routing and navigation
- **ESLint** - Code quality and consistency checking
- **Axios** - HTTP client for API requests
- **React Spinners** - Loading indicators and spinners

## User Interface Navigation & Usage

### Main Dashboard

When you launch the application, you'll see the main Dashboard page. This is the central hub for all device management activities.

**Dashboard Features:**
- Overview of all network devices
- Quick access to main features
- Device status at a glance
- Navigation menu for different sections

### Navigation Menu

The application uses a navigation system powered by React Router. Key sections include:

1. **Dashboard** - Home page with device overview
2. **Devices** - Complete device management
3. **Reports** - Device status reports and history
4. **Search** - Find specific devices quickly

### Device Management

#### Viewing Devices

Navigate to the **Devices** section to see all registered devices in your network:

- **Device List View** - Browse all devices in a sortable table format
- **Device Information** - Click on a device to view detailed information
- **Status Indicators** - Visual indicators show device status (online, offline, maintenance)

#### Adding a New Device

1. Click the **"Add Device"** or **"New Device"** button
2. Fill out the Device Form with the following information:
   - Device Name (required)
   - Device Type (select from dropdown)
   - IP Address (required)
   - Location
   - Description (optional)
   - Other relevant device properties

3. Click **"Save"** to add the device to the system

#### Editing a Device

1. Locate the device in the device list
2. Click the **"Edit"** button or icon
3. Modify the desired fields in the Device Form
4. Click **"Save"** to apply changes

#### Deleting a Device

1. Find the device in the device list
2. Click the **"Delete"** button or icon
3. Confirm the deletion in the popup dialog

### Device Types

The system supports multiple device types. When adding or editing a device:

1. Click the **Device Type** dropdown menu
2. Select from available device types:
   - Router
   - Switch
   - Firewall
   - Server
   - Workstation
   - Network Printer
   - Other network equipment
3. The selected type determines which properties are available

### Device Status Reports

#### Viewing Status Reports

Navigate to the **Reports** section to monitor device status:

1. **Status Report Form** - Generate custom reports based on:
   - Device Type filter
   - Date range
   - Status (Online/Offline/Maintenance)
   - Location filter

2. **Report Results** - View formatted results with:
   - Device information
   - Current status
   - Last check time
   - Performance metrics

#### Creating a Status Report

1. Go to the **Reports** section
2. Click **"New Report"** or **"Generate Report"**
3. Fill in the Device Status Report Form:
   - Select device(s) to include
   - Choose time period
   - Select report type
   - Add any filters needed
4. Click **"Generate"** or **"Create Report"**
5. View results in table format
6. Export or print if needed

#### Viewing Report History

1. Navigate to **Device Status Report History**
2. Browse previously generated reports
3. Click on a report to view details
4. Access historical data for trend analysis


## API Integration

The application uses Axios for API communication. API endpoints and configurations are defined in:

- `src/Utils/Api.tsx` - API setup and requests
- `src/Hooks/useDevices.tsx` - Device data fetching
- `src/Hooks/useDeviceTypes.tsx` - Device type data fetching



## Environment Variables

If your project requires environment variables, create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

Access them in your code using:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```
