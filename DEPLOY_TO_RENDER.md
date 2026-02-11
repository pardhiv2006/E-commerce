# Quick Deployment Steps for Render.com

## Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create free account
2. Create a **FREE M0 cluster**
3. Create database user (Database Access → Add New User)
4. Whitelist all IPs (Network Access → Add IP → 0.0.0.0/0)
5. Get connection string (Database → Connect → Connect your application)
   - Replace `<username>` and `<password>` with your credentials
   - Add `/firstmart` before the `?` in the URL

**Example connection string:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/firstmart?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub (3 minutes)

```bash
cd /Users/rajeshchinthala/Desktop/Pardhiv_Intern/Cyborg/application-4

# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Ready for Render deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend on Render (5 minutes)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `firstmart-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate with `openssl rand -base64 32`
   - `FRONTEND_URL`: Leave empty for now (add after frontend deployment)
6. Click **"Create Web Service"**
7. **Copy the backend URL** (e.g., `https://firstmart-backend.onrender.com`)

---

## Step 4: Deploy Frontend on Render (5 minutes)

1. Click **"New +"** → **"Static Site"**
2. Select same repository
3. Configure:
   - **Name**: `firstmart-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL`: `https://firstmart-backend.onrender.com/api` (use your backend URL)
5. Click **"Create Static Site"**
6. **Copy the frontend URL** (e.g., `https://firstmart-frontend.onrender.com`)

---

## Step 5: Update Backend CORS (2 minutes)

1. Go back to your backend service on Render
2. Go to **Environment** tab
3. Add new variable:
   - `FRONTEND_URL`: Your frontend URL from Step 4
4. Click **"Save Changes"** (this will redeploy)

---

## 🎉 Done! Your Application is Live

**Your live URL:** The frontend URL from Step 4

**Test it:**
- Visit your frontend URL
- Sign up for an account
- Browse products
- Add items to cart
- Place an order

---

## ⚠️ Important Notes

- **First load may be slow** (30-60 seconds) - Render free tier spins down after inactivity
- **Local development unchanged** - Run `npm run dev` locally as before
- **Auto-deploy enabled** - Push to GitHub to automatically redeploy

---

## Troubleshooting

**Backend won't start:**
- Check Render logs for errors
- Verify MongoDB connection string is correct

**Frontend shows errors:**
- Ensure `VITE_API_URL` includes `/api` at the end
- Check browser console for CORS errors

**Database connection fails:**
- Verify IP whitelist is 0.0.0.0/0 in MongoDB Atlas
- Check username/password in connection string
