import mixpanel from '../config/mixpanelConfig';

export const track = (event: string, props?: object) => {
  console.log(`[Tracking] Event: "${event}"`, props);
  mixpanel.trackEvent(event, props);
};

// Usage: track('Sign Up Completed', { user_id: ... })