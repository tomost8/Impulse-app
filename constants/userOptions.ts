import { goals } from '@/constants/goals';

export const TIMEZONES = [
  { value: 'UTC-12:00', label: 'Etc/GMT+12' },
  { value: 'UTC-11:00', label: 'Etc/GMT+11' },
  { value: 'UTC-10:00', label: 'Etc/GMT+10' },
  { value: 'UTC-09:00', label: 'Etc/GMT+9' },
  { value: 'UTC-08:00', label: 'Etc/GMT+8' },
  { value: 'UTC-07:00', label: 'Etc/GMT+7' },
  { value: 'UTC-06:00', label: 'Etc/GMT+6' },
  { value: 'UTC-05:00', label: 'Etc/GMT+5' },
  { value: 'UTC-04:00', label: 'Etc/GMT+4' },
  { value: 'UTC-03:00', label: 'Etc/GMT+3' },
  { value: 'UTC-02:00', label: 'Etc/GMT+2' },
  { value: 'UTC±00:00', label: 'Etc/GMT+0' },
  { value: 'UTC+01:00', label: 'Etc/GMT-1' },
  { value: 'UTC+02:00', label: 'Etc/GMT-2' },
  { value: 'UTC+03:00', label: 'Etc/GMT-3' },
  { value: 'UTC+04:00', label: 'Etc/GMT-4' },
  { value: 'UTC+05:00', label: 'Etc/GMT-5' },
  { value: 'UTC+06:00', label: 'Etc/GMT-6' },
  { value: 'UTC+07:00', label: 'Etc/GMT-7' },
  { value: 'UTC+08:00', label: 'Etc/GMT-8' },
  { value: 'UTC+09:00', label: 'Etc/GMT-9' },
  { value: 'UTC+10:00', label: 'Etc/GMT-10' },
  { value: 'UTC+11:00', label: 'Etc/GMT-11' },
  { value: 'UTC+12:00', label: 'Etc/GMT-12' }
];

export const GENDER_OPTIONS = [
  { value: '', label: 'Select Gender' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non-binary', label: 'Non-binary' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' }
];

export const GOAL_OPTIONS = [
  { value: '', label: 'Select Primary Goal' },
  ...goals.map(goal => ({ value: goal.category, label: goal.label }))
]; 

export const DEFAULT_PROFILE_PICTURE = "https://firebasestorage.googleapis.com/v0/b/quizdemov1.appspot.com/o/posts%2F1739826855768-wqa3uv.jpg?alt=media&token=f8e9530a-f266-4ccc-aa5e-9c3f914f6ece"