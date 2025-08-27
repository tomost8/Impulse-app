// Camera Performance Monitoring Utility
export class CameraPerformanceMonitor {
  private static instance: CameraPerformanceMonitor;
  private timers: Map<string, number> = new Map();
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): CameraPerformanceMonitor {
    if (!CameraPerformanceMonitor.instance) {
      CameraPerformanceMonitor.instance = new CameraPerformanceMonitor();
    }
    return CameraPerformanceMonitor.instance;
  }

  startTimer(label: string): void {
    this.timers.set(label, Date.now());
  }

  endTimer(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      console.warn(`Timer ${label} was not started`);
      return 0;
    }

    const duration = Date.now() - startTime;
    this.timers.delete(label);

    // Store metric for averaging
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    this.metrics.get(label)!.push(duration);

    console.log(`⏱️ ${label}: ${duration}ms`);
    return duration;
  }

  getAverageTime(label: string): number {
    const times = this.metrics.get(label);
    if (!times || times.length === 0) return 0;
    
    const average = times.reduce((sum, time) => sum + time, 0) / times.length;
    console.log(`📊 Average ${label}: ${average.toFixed(2)}ms (${times.length} samples)`);
    return average;
  }

  logPerformanceSummary(): void {
    console.log('📈 Camera Performance Summary:');
    for (const [label, times] of this.metrics.entries()) {
      const average = times.reduce((sum, time) => sum + time, 0) / times.length;
      const min = Math.min(...times);
      const max = Math.max(...times);
      console.log(`  ${label}: avg=${average.toFixed(2)}ms, min=${min}ms, max=${max}ms, samples=${times.length}`);
    }
  }

  clearMetrics(): void {
    this.metrics.clear();
    this.timers.clear();
  }
}

// Performance monitoring constants
export const PERFORMANCE_LABELS = {
  CAMERA_CAPTURE: 'Camera Capture',
  IMAGE_PROCESSING: 'Image Processing',
  CAMERA_SWITCH: 'Camera Switch',
  NAVIGATION: 'Navigation',
  TOTAL_PROCESS: 'Total Process',
} as const;

// Helper function to monitor async operations
export const monitorAsync = async <T>(
  label: string,
  operation: () => Promise<T>
): Promise<T> => {
  const monitor = CameraPerformanceMonitor.getInstance();
  monitor.startTimer(label);
  try {
    const result = await operation();
    return result;
  } finally {
    monitor.endTimer(label);
  }
};
