import mixpanel from '../config/mixpanelConfig';

export const track = (event: string, props?: object) => {
  mixpanel.trackEvent(event, props);
};

// Usage: track('Sign Up Completed', { user_id: ... })