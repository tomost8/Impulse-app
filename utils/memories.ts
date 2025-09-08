import dayjs from 'dayjs';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export function toMonthFilter(date: Date, categories?: string[]) {
  return {
    year: dayjs(date).year(),
    month: dayjs(date).month() + 1, // 1..12
    categories,
  };
}

export function formatMonthDayYear(iso: string) {
  // Month Day Year (e.g., August 24 2025)
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export async function saveImageToCameraRoll(remoteUrl: string) {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') throw new Error('Permission not granted');

  const fileUri = FileSystem.cacheDirectory + `mem-${Date.now()}.jpg`;
  const { uri } = await FileSystem.downloadAsync(remoteUrl, fileUri);
  const asset = await MediaLibrary.createAssetAsync(uri);
  return asset;
}