# Portfolio Admin Panel

A modern React-based admin panel for managing portfolio content through a clean, intuitive interface.

## Features

- 🔐 **Simple Authentication** - localStorage-based login with environment variable password
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS
- ⚡ **Real-time Updates** - Instant feedback with toast notifications
- 🔄 **CRUD Operations** - Complete create, read, update, delete functionality
- 🎯 **Form Validation** - Client-side validation with helpful error messages

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Notifications**: React Hot Toast
- **State Management**: React Context API

## Quick Start

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# Admin Password (for localStorage auth)
VITE_ADMIN_PASSWORD=admin123
```

### 3. Start Development Server

```bash
npm run dev
```

The admin panel will be available at `http://localhost:3001`

### 4. Default Login

- **Password**: `admin123` (or whatever you set in `VITE_ADMIN_PASSWORD`)

## Project Structure

```
admin/
├── public/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout with sidebar
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── pages/
│   │   ├── Dashboard.jsx       # Dashboard overview
│   │   ├── Login.jsx          # Login page
│   │   ├── About.jsx          # About info management
│   │   ├── Education.jsx      # Education CRUD
│   │   ├── Experience.jsx     # Work experience CRUD
│   │   ├── Skills.jsx         # Skills management
│   │   ├── Portfolio.jsx      # Portfolio projects CRUD
│   │   ├── Services.jsx       # Services CRUD
│   │   ├── Testimonials.jsx   # Testimonials CRUD
│   │   └── Pricing.jsx        # Pricing plans CRUD
│   ├── services/
│   │   └── api.js             # API service layer
│   ├── App.jsx                # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── .env.example              # Environment variables template
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## API Integration

The admin panel connects to your existing backend API endpoints:

- `GET /api/about` - Get about information
- `PUT /api/about` - Update about information
- `GET /api/education` - Get all education records
- `POST /api/education` - Create education record
- `PUT /api/education/:id` - Update education record
- `DELETE /api/education/:id` - Delete education record
- `GET /api/experience` - Get all work experience
- `POST /api/experience` - Create experience record
- `PUT /api/experience/:id` - Update experience record
- `DELETE /api/experience/:id` - Delete experience record
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill
- Similar patterns for portfolio, services, testimonials, and pricing

## Deployment

### Vercel Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

3. **Environment Variables**: Set up environment variables in Vercel dashboard:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-api.onrender.com`)
   - `VITE_ADMIN_PASSWORD`: Your admin password

### Custom Domain Setup

1. Add custom domain in Vercel dashboard (e.g., `admin.yourportfolio.com`)
2. Update DNS records to point to Vercel
3. SSL certificate will be automatically provisioned

## Backend Connection

### For Render/Railway Backend

Update your `.env` or Vercel environment variables:

```env
VITE_API_URL=https://your-backend.onrender.com
```

### CORS Configuration

Make sure your backend allows requests from your admin domain:

```javascript
// In your backend server.js
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://admin.yourportfolio.com'
  ]
}));
```

## Authentication

The admin panel uses a simple localStorage-based authentication system:

- Password is stored in environment variables
- No database authentication required
- Session persists until logout or localStorage is cleared
- Perfect for single-user admin scenarios

## Development

### Adding New Sections

To add a new CRUD section:

1. **Create API service** in `src/services/api.js`
2. **Create page component** following the pattern in existing pages
3. **Add route** to `src/App.jsx`
4. **Add navigation item** to `src/components/Layout.jsx`

### Customizing the UI

- **Colors**: Modify `tailwind.config.js` primary colors
- **Layout**: Edit `src/components/Layout.jsx`
- **Styling**: Update component classes or `src/index.css`

## Security Notes

- Change the default password in production
- Use HTTPS for all API communications
- Consider implementing proper JWT authentication for enhanced security
- Restrict admin panel access via IP allowlisting if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include environment details and steps to reproduce

## License

MIT License - see LICENSE file for details