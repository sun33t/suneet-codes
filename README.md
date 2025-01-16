# suneet codes website

This repo holds the source code for https://suneet.codes. It uses NextJS as the front-end framework as well as a few other libraries, all of which are listed below. It uses the tailwind spotlight template as a starter but replaces their use of headless/ui with shadcn/ui.

## Run Locally

Clone the project

```bash
  git clone https://github.com/sun33t/suneet-codes
```

Go to the project directory

```bash
  cd suneet-codes
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

If you're not using the 1Password CLI locally to store environment variables, modify the `dev` script from:

```json
{
  "dev": "op run --env-file=.env -- next dev"
}
```

to

```json
{
  "dev": "next dev"
}
```

## Environment Variables

To run this project, you will need to add a number of environment variables.

```bash
# The canonical hostname for your website
PROJECT_DOMAIN="example.com"

# Your name
PROJECT_AUTHOR="John Smith"

# Your location
PROJECT_AUTHOR_LOCATION="Mars, Solar Sytem"

# The base title used across the website
PROJECT_BASE_TITLE="My Portfolio"

# The environment mode (defaults to "development" when using npm run dev)
NODE_ENV="development"

# The base description used across the website
PROJECT_BASE_DESCRIPTION="Your project description"

# The URL of your GitHub repository
PROJECT_GITHUB_URL=https://github.com/yourusername

# The URL of your LinkedIn profile
PROJECT_LINKEDIN_URL=https://linkedin.com/in/yourusername

# Your API key with resend.com
RESEND_API_KEY="re_123..." # Required: Get this from https://resend.com/api-keys

# The email address used for sending emails from the website
RESEND_EMAIL_ADDRESS="website@yourdomain.com" # Required: Must be a verified domain in Resend

# Site Key retrieved from the cloudflare turnstile dashboard. Required for turnstile implementation on the contact form. See https://developers.cloudflare.com/turnstile/
NEXT_PUBLIC_TURNSTILE_SITE_KEY="qeq_123..."

# Secret Key retrieved from the cloudflare turnstile dashboard. Required for turnstile implementation on the contact form. See https://developers.cloudflare.com/turnstile/
TURNSTILE_SECRET_KEY="re_123..."

# Project API Key from PostHog (found in Project Settings > Project API Key)
NEXT_PUBLIC_POSTHOG_KEY="asd21313..."

# PostHog API URL (varies by region - EU: eu.i.posthog.com, US: app.posthog.com)
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"
```

The following credentials are alternatives for the `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` which can be used during development to simulate challenge responses on the client and server:

```bash
# Always Passes:
NEXT_PUBLIC_TURNSTILE_SITE_KEY="1x00000000000000000000AA"
TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"

#  Always Blocks:
NEXT_PUBLIC_TURNSTILE_SITE_KEY="2x00000000000000000000AB"

#  Forces Interactive Challenge:
NEXT_PUBLIC_TURNSTILE_SITE_KEY="3x00000000000000000000FF"

#  Always Fails:
TURNSTILE_SECRET_KEY="2x0000000000000000000000000000000AA"

#  Yields A Token Already Spent Error:
TURNSTILE_SECRET_KEY="3x0000000000000000000000000000000AA"

# Your cloudinary cloud name, required for next-cloudinary dependency. See - https://next.cloudinary.dev/installation
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"

```

This project is using [t3-env](https://github.com/t3-oss/t3-env) for runtime validation of variables. When attempting to run the project, the server will error out in the event of a missing required variable, details of which will be printed in the terminal.

## Acknowledgements

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com)
- [TailwindUI](https://tailwindui.com)
- [shadcn/ui](https://ui.shadcn.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Daniel C Gilberts's Blog Template](https://github.com/danielcgilibert/blog-template)
- [vercel](https://vercel.com/)
- [t3-env](https://github.com/t3-oss/t3-env)
- [1Password CLI](https://developer.1password.com/docs/cli/secret-references/)
- [CodeRabbit](https://coderabbit.ai)
- [Content Collections](https://www.content-collections.dev/)
- [Code Hike](https://codehike.org/)
- [Favicon generator](https://favicon.io/favicon-converter/)
- [Resend](https://resend.com)
- [next-cloudinary](https://next.cloudinary.dev)

## Authors

- [@sun33t](https://www.github.com/sun33t)
