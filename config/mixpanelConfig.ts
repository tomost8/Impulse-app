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
  if (!mixpanel) return;
  mixpanel.track(eventName, props);
}
export function identifyUser(userId: string) {
  if (!mixpanel) return;
  mixpanel.identify(userId);
}
export function resetUser() {
  if (!mixpanel) return;
  mixpanel.reset();
}
export function getPeopleSet(props: Record<string, any>) {
  if (!mixpanel) return;
  mixpanel.getPeople().set(props);
}

export default {
  initMixpanel,
  trackEvent,
  identifyUser,
  resetUser,
  getPeopleSet,
};