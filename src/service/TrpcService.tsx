import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type {AppRouter} from "../routes/api/trpc/[trpc]";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
});