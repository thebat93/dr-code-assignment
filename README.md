This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description of the App

Hello from Igor! Here's my solution for the coding challenge.

I have decided to use Next.js App Router as this is becoming a default approach for the new apps. Apollo Client has a separate experimental package that allows it to work with RSC and client components with SSR. I have used it and faced the problem when search indicator didn't hide after the search was complete. For some reason `isPending` flag from `useTransition` doesn't return to its initial state after new data is loaded. I believe this is a problem with experimental package and not with the business logic, so I decided to show the loading indicator only for infinite scroll.

### Used packages:

1. Next.js
2. Apollo Client + [package](https://github.com/apollographql/apollo-client-nextjs) for experimental App Router support
3. clsx - like classnames, but smaller size
4. lodash.debounce - debouncing function from lodash

### Structure of files:

1. `models` - types for client models (`Recipe`, `RecipeList`, `Variables` for query)
2. `hooks` - hooks that contain business logic (`useDebouncedSearch`, `useLoadMoreRecipes`) or utility functions (`useIntersectionObserver`)
3. `components` - shared components
4. `app` - pages of the app. It also contains Wrapper with custom Apollo Provider to support SSR

### Features:
1. Debounced search
2. Infinite scroll (implementation with intersection observer)
3. Basic A11Y with semantic HTML elements
4. Lazy loading for images with <Image> Next.js component
5. Loading state using `useTransition`
6. SSR - data is loaded on the first render with `useSuspenseQuery`

### Possible improvements:
1. Types generation from GraphQL schemas
2. E2E tests
3. Lazy loading for images using intersection observer

## How to use

Place .env.local to thr root folder. It contains environment variables.
Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
