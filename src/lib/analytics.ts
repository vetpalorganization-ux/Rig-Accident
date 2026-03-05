// lib/analytics.ts

type AnalyticsEvent = 'chat_opened' | 'chat_completed' | 'calculator_used' | 'form_submitted' | 'phone_call_clicked';

export const trackEvent = (event: AnalyticsEvent, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // PostHog/Plausible event tracking
  // For free tier, we can also use custom events or simple console logging if no provider is set up
  if ((window as any).posthog) {
    (window as any).posthog.capture(event, properties);
  } else if ((window as any).plausible) {
    (window as any).plausible(event, { props: properties });
  } else {
    console.log(`[Analytics Event]: ${event}`, properties);
  }
};
