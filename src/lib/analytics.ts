// lib/analytics.ts

type AnalyticsEvent = 'chat_opened' | 'chat_completed' | 'calculator_used' | 'form_submitted' | 'phone_call_clicked';

export const trackEvent = (event: AnalyticsEvent, properties?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  // PostHog/Plausible event tracking
  // For free tier, we can also use custom events or simple console logging if no provider is set up
  const win = window as unknown as { posthog?: { capture: (e: string, p?: object) => void }, plausible?: (e: string, p?: object) => void };
  
  if (win.posthog) {
    win.posthog.capture(event, properties);
  } else if (win.plausible) {
    win.plausible(event, { props: properties });
  } else {
    console.log(`[Analytics Event]: ${event}`, properties);
  }
};
