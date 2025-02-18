import { goals } from '@/constants/goals';

export const TIMEZONES = [
  { value: 'Etc/GMT+12', label: 'UTC-12:00' },
  { value: 'Etc/GMT+11', label: 'UTC-11:00' },
  { value: 'Etc/GMT+10', label: 'UTC-10:00' },
  { value: 'Etc/GMT+9', label: 'UTC-09:00' },
  { value: 'Etc/GMT+8', label: 'UTC-08:00' },
  { value: 'Etc/GMT+7', label: 'UTC-07:00' },
  { value: 'Etc/GMT+6', label: 'UTC-06:00' },
  { value: 'Etc/GMT+5', label: 'UTC-05:00' },
  { value: 'Etc/GMT+4', label: 'UTC-04:00' },
  { value: 'Etc/GMT+3', label: 'UTC-03:00' },
  { value: 'Etc/GMT+2', label: 'UTC-02:00' },
  { value: 'Etc/GMT+1', label: 'UTC-01:00' },
  { value: 'Etc/GMT+0', label: 'UTC±00:00' },
  { value: 'Etc/GMT-1', label: 'UTC+01:00' },
  { value: 'Etc/GMT-2', label: 'UTC+02:00' },
  { value: 'Etc/GMT-3', label: 'UTC+03:00' },
  { value: 'Etc/GMT-4', label: 'UTC+04:00' },
  { value: 'Etc/GMT-5', label: 'UTC+05:00' },
  { value: 'Etc/GMT-6', label: 'UTC+06:00' },
  { value: 'Etc/GMT-7', label: 'UTC+07:00' },
  { value: 'Etc/GMT-8', label: 'UTC+08:00' },
  { value: 'Etc/GMT-9', label: 'UTC+09:00' },
  { value: 'Etc/GMT-10', label: 'UTC+10:00' },
  { value: 'Etc/GMT-11', label: 'UTC+11:00' },
  { value: 'Etc/GMT-12', label: 'UTC+12:00' }
];

export const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

export const GOAL_OPTIONS = [
  { value: '', label: 'Select Primary Goal' },
  ...goals.map(goal => ({ value: goal.category, label: goal.label }))
]; 

export const DEFAULT_PROFILE_PICTURE = "https://firebasestorage.googleapis.com/v0/b/quizdemov1.appspot.com/o/posts%2F1739826855768-wqa3uv.jpg?alt=media&token=f8e9530a-f266-4ccc-aa5e-9c3f914f6ece"