import ShaderPass from 'graphics/ShaderPass';
import BlendShader from 'shaders/BlendShader';
import blendModes from 'graphics/blendModes';

export default class BlendPass extends ShaderPass {
  static defaultProperties = {
    transparent: true,
    needsSwap: true,
    blendMode: 'Normal',
    opacity: 1.0,
  };

  constructor(buffer, properties) {
    super(BlendShader, { ...BlendPass.defaultProperties, ...properties });

    this.buffer = buffer;
  }

  render(renderer, inputBuffer, outputBuffer) {
    const { opacity, blendMode } = this;

    this.setUniforms({
      baseBuffer: this.buffer,
      blendBuffer: inputBuffer.texture,
      mode: blendModes[blendMode],
      opacity,
    });

    super.render(renderer, inputBuffer, outputBuffer);
  }
}
