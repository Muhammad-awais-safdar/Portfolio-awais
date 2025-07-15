# Portfolio Deployment Guide

Complete guide for deploying both the backend API and admin panel.

## Backend Deployment (Render/Railway)

### Option 1: Render

1. **Create Render Account** at [render.com](https://render.com)

2. **Connect GitHub Repository**
   - Link your GitHub account
   - Select your portfolio repository

3. **Create Web Service**
   - Service name: `portfolio-backend`
   - Root directory: `server`
   - Build command: `npm install`
   - Start command: `npm start`

4. **Environment Variables**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
   JWT_SECRET=your_jwt_secret_here_make_it_strong
   ADMIN_PASSWORD=your_secure_admin_password
   ALLOWED_ORIGINS=https://your-admin-app.vercel.app,https://admin.yourportfolio.com
   NODE_ENV=production
   ```

5. **Database Setup**
   - Use MongoDB Atlas (recommended)
   - Or deploy MongoDB on Render

### Option 2: Railway

1. **Create Railway Account** at [railway.app](https://railway.app)

2. **Deploy from GitHub**
   - Connect GitHub repository
   - Select portfolio repo
   - Choose `server` folder as root

3. **Environment Variables**
   - Same as Render above

4. **Custom Domain** (Optional)
   - Add custom domain in Railway dashboard
   - Update DNS records

## Frontend Admin Panel Deployment (Vercel)

### Step 1: Prepare for Deployment

1. **Update API URL** in admin/.env.production:
   ```env
   VITE_API_URL=https://your-backend.onrender.com
   VITE_ADMIN_PASSWORD=your_secure_admin_password
   ```

2. **Test Production Build**:
   ```bash
   cd admin
   npm run build
   npm run preview
   ```

### Step 2: Deploy to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd admin
   vercel
   ```

4. **Follow Prompts**:
   - Set up and deploy: Yes
   - Which scope: Your account
   - Link to existing project: No
   - Project name: portfolio-admin
   - In which directory: `./` (current)

### Step 3: Configure Environment Variables

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend.onrender.com
     VITE_ADMIN_PASSWORD=your_secure_admin_password
     ```

2. **Redeploy**:
   ```bash
   vercel --prod
   ```

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Vercel dashboard: Settings → Domains
   - Add `admin.yourportfolio.com`

2. **Update DNS**:
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation

## Backend CORS Configuration

Update your backend to allow requests from your admin domain:

```javascript
// server/server.js
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:3001',
  'https://your-admin-app.vercel.app',
  'https://admin.yourportfolio.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
```

## Environment Variables Summary

### Backend (.env)
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
PORT=5000
NODE_ENV=production
JWT_SECRET=your_jwt_secret_key_here
ADMIN_PASSWORD=your_admin_password_here
ALLOWED_ORIGINS=https://your-admin-app.vercel.app,https://admin.yourportfolio.com
```

### Admin Panel (.env.production)
```env
VITE_API_URL=https://your-backend.onrender.com
VITE_ADMIN_PASSWORD=your_admin_password_here
```

## SSL/HTTPS

- **Vercel**: Automatic SSL certificates
- **Render**: Automatic SSL certificates
- **Railway**: Automatic SSL certificates
- **Custom Domains**: SSL automatically provisioned

## Monitoring & Logs

### Backend Logs
- **Render**: View logs in dashboard
- **Railway**: Check deployment logs
- **MongoDB Atlas**: Monitor database performance

### Frontend Logs
- **Vercel**: Function logs and analytics available
- **Browser**: Check console for client-side errors

## Security Checklist

- [ ] Strong admin password (not default)
- [ ] CORS properly configured
- [ ] HTTPS enabled everywhere
- [ ] Environment variables secured
- [ ] Database credentials protected
- [ ] API rate limiting enabled (optional)

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check ALLOWED_ORIGINS in backend
   - Verify API URL in admin panel

2. **API Connection Failed**
   - Verify backend is running
   - Check API URL environment variable
   - Test API endpoints directly

3. **Login Not Working**
   - Verify VITE_ADMIN_PASSWORD matches
   - Check browser localStorage
   - Clear cache and cookies

4. **Build Errors**
   - Run `npm run build` locally first
   - Check for TypeScript/ESLint errors
   - Verify all dependencies installed

### Getting Help

1. Check deployment logs
2. Test API endpoints with Postman
3. Verify environment variables
4. Review browser console errors

## Cost Estimates

### Free Tier Options
- **Vercel**: Free tier (hobby projects)
- **Render**: Free tier (with limitations)
- **Railway**: $5/month for hobby plan
- **MongoDB Atlas**: Free tier (512MB)

### Production Recommendations
- **Backend**: Railway Hobby ($5/month) or Render Pro ($7/month)
- **Database**: MongoDB Atlas M2 ($9/month)
- **Frontend**: Vercel Pro ($20/month) for team features
- **Total**: ~$15-35/month for production setup

## Maintenance

1. **Regular Updates**
   - Update dependencies monthly
   - Monitor security vulnerabilities
   - Review API usage and performance

2. **Backups**
   - Database backups (MongoDB Atlas handles this)
   - Code repository backups
   - Environment variables documentation

3. **Monitoring**
   - Set up uptime monitoring
   - Monitor API response times
   - Track error rates