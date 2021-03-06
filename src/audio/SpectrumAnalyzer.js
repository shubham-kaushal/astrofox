import { FFT_SIZE, SAMPLE_RATE } from 'view/constants';

export default class SpectrumAnalyzer {
  static defaultProperties = {
    fftSize: FFT_SIZE,
    minDecibels: -100,
    maxDecibels: 0,
    smoothingTimeConstant: 0,
  };

  constructor(context, properties) {
    this.audioContext = context;
    this.analyzer = Object.assign(
      context.createAnalyser(),
      SpectrumAnalyzer.defaultProperties,
      properties,
    );
    this.fft = new Uint8Array(this.analyzer.frequencyBinCount);
    this.td = new Float32Array(this.analyzer.fftSize);
  }

  getFrequencyData(update) {
    if (update) {
      this.analyzer.getByteFrequencyData(this.fft);
    }

    return this.fft;
  }

  getTimeData(update) {
    if (update) {
      this.analyzer.getFloatTimeDomainData(this.td);
    }

    return this.td;
  }

  getVolume() {
    return this.fft.reduce((a, b) => a + b) / this.fft.length;
  }

  clearFrequencyData() {
    this.fft.fill(0);
  }

  clearTimeData() {
    this.td.fill(0);
  }

  static getMaxFrequency() {
    return SAMPLE_RATE / 2;
  }
}
