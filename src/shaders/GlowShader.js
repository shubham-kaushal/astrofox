import { Vector2 } from 'three';
import vertexShader from 'shaders/glsl/vertex/basic.glsl';
import fragmentShader from 'shaders/glsl/fragment/glow.glsl';

export default {
  uniforms: {
    inputBuffer: { type: 't', value: null },
    amount: { type: 'f', value: 1.0 },
    intensity: { type: 'f', value: 1.0 },
    resolution: { type: 'v2', value: new Vector2(1, 1) },
  },
  vertexShader,
  fragmentShader,
};
