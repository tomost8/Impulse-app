import { goals } from '@/constants/goals';

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