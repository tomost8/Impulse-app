import { Mixpanel } from 'mixpanel-react-native';
import { debugMixpanel } from '@/debug/utils';
import Constants from 'expo-constants';

let mixpanel: Mixpanel | null = null;
const MIXPANEL_TOKEN = Constants.expoConfig?.extra?.MIXPANEL_TOKEN;

/* Initialize Mixpanel with token from app config */
export async function initMixpanel() {
  if (!MIXPANEL_TOKEN) {
    console.error('MIXPANEL_TOKEN not found in app.config.js extra section');
    return;
  }
  if (!mixpanel) {
    mixpanel = new Mixpanel(MIXPANEL_TOKEN, false);
    await mixpanel.init();
    console.log('📊 Mixpanel initialized');
  }
}

/* Set the distinct ID for user tracking */
export function identifyUser(userId: string) {
  if (!mixpanel) {
    console.error(`[Mixpanel] User identification failed - Mixpanel not initialized`);
    return;
  }
  if (debugMixpanel) console.log(`📊 [Mixpanel] Identifying user: ${userId}`);
  mixpanel.identify(userId);
}

/* Set user profile properties in Mixpanel */
export function getPeopleSet(props: Record<string, any>) {
  if (!mixpanel) {
    console.error(`[Mixpanel] People set failed - Mixpanel not initialized`);
    return;
  }
  if (debugMixpanel) console.log(`📊 [Mixpanel] Setting people properties:`, props);
  mixpanel.getPeople().set(props);
}

/* Clear local tracking state and reset distinct ID */
export function resetUser() {
  if (!mixpanel) {
    console.error(`[Mixpanel] User reset failed - Mixpanel not initialized`);
    return;
  }
  if (debugMixpanel) console.log(`📊 [Mixpanel] Resetting user`);
  mixpanel.reset();
}

/* Track an event with optional properties */
export function trackEvent(eventName: string, props: Record<string, any> = {}) {
  if (!mixpanel) {
    console.error(`[Mixpanel] Event "${eventName}" not tracked - Mixpanel not initialized`);
    return;
  }
  if (debugMixpanel) console.log(`📊 [Mixpanel] Tracking event: "${eventName}"`, props);
  mixpanel.track(eventName, props);
}

export default {
  initMixpanel,
  identifyUser,
  getPeopleSet,
  resetUser,
  trackEvent,
};