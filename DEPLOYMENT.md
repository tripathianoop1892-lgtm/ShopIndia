# ShopIndia production deployment

The recommended layout is a static Vite build served by Nginx, with Nginx proxying
`/api` to the Node process on `127.0.0.1:5000`. Docker is not required for this
single-service application.

## 1. Rotate credentials before uploading

`backend/.env` existed in Git history. Rotate every credential that was ever in
that file: MongoDB, JWT, Razorpay, SMTP, Twilio, and Gemini. Do not reuse the
current values. Generate `JWT_SECRET` from at least 32 random bytes.

Uploaded prescription images also existed in Git history. They are removed from
the current index, but history must be purged with a coordinated `git filter-repo`
rewrite before the repository is shared or made public. A history rewrite changes
commit IDs and requires a force-push, so coordinate it with every collaborator and
retain a private backup first.

## 2. Prepare the VPS

- Install a currently supported Node.js LTS release, Nginx, and Certbot.
- Create an unprivileged `shopindia` system user.
- Allow inbound SSH from trusted administrator IPs and public ports 80/443.
- Do not expose port 5000 publicly.
- Add the VPS public IPv4 address as a single `/32` entry in MongoDB Atlas.

Suggested application paths:

```text
/opt/shopindia/backend       backend application
/var/www/shopindia           contents of ShopNowIndia/dist
/etc/shopindia/backend.env   production secrets (mode 600)
```

The upload directories under `/opt/shopindia/backend/uploads` must be writable by
the service user and included in backups.

## 3. Production environment

Copy `backend/.env.example` to `/etc/shopindia/backend.env` and replace every
placeholder. The important production values are:

```dotenv
NODE_ENV=production
HOST=127.0.0.1
PORT=5000
CORS_ORIGINS=https://YOUR_DOMAIN,https://www.YOUR_DOMAIN
PUBLIC_SERVER_URL=https://YOUR_DOMAIN
JWT_SECRET=GENERATE_A_NEW_SECRET_WITH_AT_LEAST_32_RANDOM_CHARACTERS
```

Use Razorpay live credentials only after completing a test payment and refund in
Razorpay test mode. `GEMINI_API_KEY` is optional; without it, prescription reading
returns a controlled unavailable response.

## 4. Install and build

From the repository checkout:

```bash
cd backend
npm ci --omit=dev

cd ../ShopNowIndia
npm ci
npm run lint
npm run build
```

Copy the contents of `ShopNowIndia/dist` to `/var/www/shopindia`. Do not copy a
developer `.env` to the web root. `VITE_API_BASE_URL=/api` is compiled into the
frontend build.

## 5. Enable the service and HTTPS

1. Replace placeholders in `deploy/shopindia.service.example`, copy it to
   `/etc/systemd/system/shopindia.service`, then run `systemctl daemon-reload` and
   `systemctl enable --now shopindia`.
2. Replace `YOUR_DOMAIN` in `deploy/nginx.conf.example`, install it as the Nginx
   site, and validate with `nginx -t` before reloading Nginx.
3. Point GoDaddy `@` and `www` A records to the VPS IPv4 address.
4. After DNS resolves, obtain the certificate with Certbot and reload Nginx.

## 6. Verify before launch

```bash
curl -fsS https://YOUR_DOMAIN/api/health/live
curl -fsS https://YOUR_DOMAIN/api/health/ready
```

Then test registration OTP, password reset, all four roles, medicine uploads,
prescription access boundaries, coupon application, Razorpay checkout, duplicate
checkout submissions, order rejection/refund, SPA refreshes, and upload recovery
from backup. Keep Razorpay in test mode until every flow passes.

## 7. Operations

- Back up MongoDB and `backend/uploads` independently.
- Monitor `journalctl -u shopindia` and Nginx access/error logs.
- Apply dependency and OS security updates on a regular schedule.
- Test restore procedures, not only backup creation.
