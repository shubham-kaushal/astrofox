import Effect from 'core/Effect';
import ShaderPass from 'graphics/ShaderPass';
import DotScreenShader from 'shaders/DotScreenShader';
import { deg2rad } from 'utils/math';

export default class DotScreenEffect extends Effect {
  static config = {
    name: 'DotScreenEffect',
    description: 'Dot screen effect.',
    type: 'effect',
    label: 'Dot Screen',
    defaultProperties: {
      angle: 90,
      scale: 1.0,
    },
    controls: {
      scale: {
        label: 'Amount',
        type: 'number',
        min: 0,
        max: 2.0,
        step: 0.01,
        withRange: true,
        withReactor: true,
      },
      angle: {
        label: 'Angle',
        type: 'number',
        min: 0,
        max: 360,
        withRange: true,
        withReactor: true,
      },
    },
  };

  constructor(properties) {
    super(DotScreenEffect, properties);
  }

  updatePass() {
    this.pass.setUniforms({
      scale: this.properties.scale,
      angle: deg2rad(this.properties.angle),
    });
  }

  addToScene() {
    this.pass = new ShaderPass(DotScreenShader);

    this.updatePass();
  }

  removeFromScene() {
    this.pass = null;
  }
}
