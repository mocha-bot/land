import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import getConfig from 'next/config';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { theme } from './theme';

const queryClient = new QueryClient();

const LOGOUT_CHANNEL = 'mocha-auth-logout';
const POLL_INTERVAL_MS = 30_000;

function broadcastLogout() {
  try {
    const ch = new BroadcastChannel(LOGOUT_CHANNEL);
    ch.postMessage({ type: 'logout' });
    ch.close();
  } catch {
    localStorage.setItem(LOGOUT_CHANNEL, String(Date.now()));
    localStorage.removeItem(LOGOUT_CHANNEL);
  }
}

function SessionWatcher() {
  useEffect(() => {
    const { publicRuntimeConfig } = getConfig();
    const apiBaseUrl: string =
      publicRuntimeConfig?.apiBaseUrl ?? 'https://api.mocha-bot.xyz';
    const ssoUrl: string =
      publicRuntimeConfig?.ssoUrl ?? 'https://sso.mocha-bot.xyz';
    const ssoRedirect = `${ssoUrl}?redirect_to=${encodeURIComponent(
      window.location.origin,
    )}`;

    // Only redirect if user was previously authenticated (session expiry),
    // not if they were never logged in (unauthenticated visitor).
    let wasAuthenticated = false;

    async function checkSession() {
      if (document.hidden) {
        return;
      }
      try {
        const resp = await fetch(`${apiBaseUrl}/api/v1/user/me`, {
          credentials: 'include',
        });
        if (resp.ok) {
          wasAuthenticated = true;
        } else if (resp.status === 401 && wasAuthenticated) {
          broadcastLogout();
          window.location.replace(ssoRedirect);
        }
      } catch {
        // network error — don't logout
      }
    }

    const id = setInterval(checkSession, POLL_INTERVAL_MS);
    window.addEventListener('focus', checkSession);

    let ch: BroadcastChannel | null = null;
    try {
      ch = new BroadcastChannel(LOGOUT_CHANNEL);
      ch.onmessage = (e) => {
        if (e.data?.type === 'logout') {
          window.location.replace(ssoRedirect);
        }
      };
    } catch {
      // no BroadcastChannel support
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === LOGOUT_CHANNEL) {
        window.location.replace(ssoRedirect);
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(id);
      window.removeEventListener('focus', checkSession);
      window.removeEventListener('storage', onStorage);
      ch?.close();
    };
  }, []);

  return null;
}

type Props = {
  children: ReactNode;
};

function AppProvider(props: Props) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SessionWatcher />
        {props.children}
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export { AppProvider };
