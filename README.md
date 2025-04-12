This is template project using Next.js with Better-Auth and Drizzle ORM.

## Getting Started

```bash
cp .default.env .env
```

Fill in the `.env` file with missing variables

Run the following command to migrate the database

```bash
npx drizzle-kit push
```

Then you can run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
