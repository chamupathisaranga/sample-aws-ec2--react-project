# Items Management Frontend

A modern React + TypeScript + Vite frontend application for managing items. This application provides a complete CRUD interface for interacting with the NestJS backend API.

## Features

- ✅ Create new items with name and description
- ✅ Read/View all items in a responsive list
- ✅ Update existing items
- ✅ Delete items with confirmation
- ✅ Real-time error handling
- ✅ Loading states for all operations
- ✅ Responsive design for mobile and desktop
- ✅ TypeScript for type safety

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **Modern CSS** - Responsive design with gradients and animations

## Prerequisites

- Node.js 16+ and npm or yarn
- NestJS backend running on `http://localhost:3000`

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Ensure backend is running:**
   - The NestJS backend should be running on `http://localhost:3000`
   - Verify the `/items` endpoint is accessible

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite's default port).

The dev server includes:
- Hot Module Replacement (HMR) for instant updates
- TypeScript compilation with type checking
- ESLint for code quality

## Building

Create a production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

## Project Structure

```
src/
├── App.tsx              # Main application component with CRUD logic
├── App.css              # Styling for the application
├── main.tsx             # React entry point
├── index.css            # Global styles
├── types/
│   └── item.ts          # Item interface definitions
├── services/
│   └── itemService.ts   # API service for backend communication
└── assets/              # Static assets
```

## API Integration

The application communicates with the NestJS backend through RESTful API:

- `GET /items` - Fetch all items
- `GET /items/:id` - Fetch a specific item
- `POST /items` - Create a new item
- `PUT /items/:id` - Update an existing item
- `DELETE /items/:id` - Delete an item

### API Configuration

The API URL is configured in [services/itemService.ts](src/services/itemService.ts#L1):

```typescript
const API_URL = 'http://localhost:3000/items';
```

Change this if your backend runs on a different port or URL.

## UI Components

### Form Section
- Input fields for item name and description
- Create and Update modes
- Form validation and error handling
- Submit and Cancel buttons

### Items List
- Grid display of all items
- Item details (name, description, ID)
- Edit button to modify items
- Delete button with confirmation
- Empty state message
- Loading indicators

## Styling

The application features:
- Purple gradient background (#667eea to #764ba2)
- Clean card-based UI
- Responsive grid layout that adapts to mobile screens
- Smooth transitions and hover effects
- Color-coded action buttons (green for edit, red for delete)

## Error Handling

The application includes comprehensive error handling:
- Network error messages
- Validation feedback
- Fallback states
- Error recovery options

## Tips

- Items are stored in memory on the backend (resets on server restart)
- Confirmation dialog appears before deleting items
- Form automatically clears after successful submission
- Edit mode shows a "Cancel" button to reset the form

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Troubleshooting

### Backend Connection Issues
- Ensure NestJS backend is running on port 3000
- Check CORS is enabled in the backend
- Verify the API_URL in `services/itemService.ts`

### Port Already in Use
- Change Vite's port in `vite.config.ts`
- Or kill the process using the port

### CORS Errors
- Make sure backend has CORS enabled for `http://localhost:5173`
- Check backend's `main.ts` for CORS configuration
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
