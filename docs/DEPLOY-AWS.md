# Deploy Brain Ring to AWS (Cheapest Method)

This guide uses **AWS Lightsail** — the simplest and cheapest way to host on AWS.
Cost: **$3.50/month** (first 3 months free).

No Docker, no Kubernetes, no complex setup. Just a small server running your app.

---

## Prerequisites

- GitHub account with the repo pushed (github.com/Cripry/BringO)
- AWS account (https://aws.amazon.com — create one if you don't have it)
- Your `.env` file with the `DATABASE_URL` value

---

## Step 1: Create a Lightsail Instance

1. Go to https://lightsail.aws.amazon.com
2. Click **"Create instance"**
3. Choose:
   - **Region**: Frankfurt (eu-central-1) — closest to Eastern Europe
   - **Platform**: Linux/Unix
   - **Blueprint**: OS Only → **Ubuntu 22.04 LTS**
   - **Plan**: $3.50/month (512 MB RAM, 1 vCPU) — this is enough
   - **Name**: `bringo-web`
4. Click **"Create instance"**
5. Wait 1-2 minutes for it to start

---

## Step 2: Set Up a Static IP

1. In Lightsail dashboard, go to **Networking** tab
2. Click **"Create static IP"**
3. Attach it to your `bringo-web` instance
4. **Write down this IP** — you'll need it for DNS later

---

## Step 3: Open Port 80 and 443

1. Click on your `bringo-web` instance
2. Go to **Networking** tab
3. Under **IPv4 Firewall**, click **"+ Add rule"**
4. Add these rules:
   - HTTP (port 80) — already there by default
   - HTTPS (port 443) — click "Add rule", select "HTTPS"
5. Save

---

## Step 4: Connect to Your Server

1. In Lightsail, click on your instance
2. Click the **"Connect using SSH"** button (opens a terminal in the browser)

Or if you prefer your own terminal:
```bash
ssh -i ~/path-to-key.pem ubuntu@YOUR_STATIC_IP
```

---

## Step 5: Install Node.js on the Server

Copy-paste these commands one by one in the SSH terminal:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (keeps your app running 24/7)
sudo npm install -g pm2

# Install Nginx (web server for HTTPS)
sudo apt install -y nginx

# Install Certbot (free SSL certificate)
sudo apt install -y certbot python3-certbot-nginx

# Verify
node -v
npm -v
```

---

## Step 6: Clone Your Project

```bash
# Go to home directory
cd ~

# Clone your repo
git clone https://github.com/Cripry/BringO.git
cd BringO

# Install dependencies
npm install
```

---

## Step 7: Set Up Environment Variables

```bash
# Create .env file
nano .env
```

Paste your environment variables:
```
DATABASE_URL=postgresql://postgres.xxxxx:password@aws-0-region.pooler.supabase.com:6543/postgres
```

Save: press `Ctrl+X`, then `Y`, then `Enter`.

---

## Step 8: Build the App

```bash
npm run build
```

This creates the `dist/` folder with your production app.

---

## Step 9: Start the App with PM2

```bash
# Start the app
pm2 start dist/server/entry.mjs --name bringo

# Make PM2 restart on server reboot
pm2 startup
pm2 save

# Check it's running
pm2 status
```

Your app is now running on port **4321** (Astro default).

Test it: `curl http://localhost:4321` — you should see HTML output.

---

## Step 10: Configure Nginx (Reverse Proxy)

```bash
sudo nano /etc/nginx/sites-available/bringo
```

Paste this:
```nginx
server {
    listen 80;
    server_name www.bring-o.net bring-o.net;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save (`Ctrl+X`, `Y`, `Enter`), then:

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/bringo /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## Step 11: Point Your Domain to AWS

Go to your domain registrar (where you bought bring-o.net) and update DNS:

| Type | Name | Value |
|------|------|-------|
| A | @ | YOUR_STATIC_IP |
| A | www | YOUR_STATIC_IP |

Wait 5-30 minutes for DNS to propagate.

Test: visit `http://www.bring-o.net` — you should see your site.

---

## Step 12: Enable HTTPS (Free SSL)

```bash
sudo certbot --nginx -d bring-o.net -d www.bring-o.net
```

Follow the prompts:
- Enter your email
- Agree to terms
- Choose "Redirect HTTP to HTTPS" when asked

Certbot auto-renews every 90 days. Done!

Visit: **https://www.bring-o.net**

---

## How to Update the Site

When you push new code to GitHub:

```bash
# SSH into your server
ssh ubuntu@YOUR_STATIC_IP

# Pull latest code
cd ~/BringO
git pull

# Rebuild
npm install
npm run build

# Restart app
pm2 restart bringo
```

---

## Quick Reference

| What | Command |
|------|---------|
| Check app status | `pm2 status` |
| View app logs | `pm2 logs bringo` |
| Restart app | `pm2 restart bringo` |
| Stop app | `pm2 stop bringo` |
| Restart Nginx | `sudo systemctl restart nginx` |
| Renew SSL manually | `sudo certbot renew` |
| Edit .env | `nano ~/BringO/.env` |

---

## Monthly Cost

| Service | Cost |
|---------|------|
| Lightsail instance | $3.50/month |
| Static IP | Free (when attached) |
| SSL certificate | Free (Let's Encrypt) |
| **Total** | **$3.50/month** |

First 3 months are free on the $3.50 plan.

---

## Troubleshooting

**Site not loading?**
```bash
pm2 status          # Is the app running?
pm2 logs bringo     # Check for errors
sudo nginx -t       # Is Nginx config valid?
```

**502 Bad Gateway?**
- App crashed. Check: `pm2 logs bringo`
- Restart: `pm2 restart bringo`

**SSL not working?**
```bash
sudo certbot --nginx -d bring-o.net -d www.bring-o.net
```

**Can't connect via SSH?**
- Check Lightsail firewall has port 22 open
- Use the browser SSH from Lightsail dashboard instead
