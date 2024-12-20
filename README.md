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

To run this project, you will need to add a number of environment variables. Please see the [env.example](./env.example) file at project root for more details.

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

## Authors

- [@sun33t](https://www.github.com/sun33t)
