import { Mixpanel } from 'mixpanel-react-native';
import Constants from 'expo-constants';

const MIXPANEL_TOKEN = Constants.expoConfig?.extra?.MIXPANEL_TOKEN;

let mixpanel: Mixpanel | null = null;

export async function initMixpanel() {
  if (!MIXPANEL_TOKEN) {
    console.error('No MIXPANEL_TOKEN found in app.json extra');
    return;
  }
  if (!mixpanel) {
    mixpanel = new Mixpanel(MIXPANEL_TOKEN, false);
    await mixpanel.init();
    console.log('Mixpanel initialized');
  }
}
export function trackEvent(eventName: string, props: Record<string, any> = {}) {
  if (!mixpanel) {
    console.log(`[Mixpanel] Event "${eventName}" not tracked - Mixpanel not initialized`);
    return;
  }
  
  console.log(`[Mixpanel] Tracking event: "${eventName}"`, props);
  mixpanel.track(eventName, props);
}
export function identifyUser(userId: string) {
  if (!mixpanel) {
    console.log(`[Mixpanel] User identification failed - Mixpanel not initialized`);
    return;
  }
  console.log(`[Mixpanel] Identifying user: ${userId}`);
  mixpanel.identify(userId);
}
export function resetUser() {
  if (!mixpanel) {
    console.log(`[Mixpanel] User reset failed - Mixpanel not initialized`);
    return;
  }
  console.log(`[Mixpanel] Resetting user`);
  mixpanel.reset();
}
export function getPeopleSet(props: Record<string, any>) {
  if (!mixpanel) {
    console.log(`[Mixpanel] People set failed - Mixpanel not initialized`);
    return;
  }
  console.log(`[Mixpanel] Setting people properties:`, props);
  mixpanel.getPeople().set(props);
}

export default {
  initMixpanel,
  trackEvent,
  identifyUser,
  resetUser,
  getPeopleSet,
};