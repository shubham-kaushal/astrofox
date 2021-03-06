import ShaderPass from 'graphics/ShaderPass';
import CopyShader from 'shaders/CopyShader';

export default class CopyPass extends ShaderPass {
  static defaultProperties = {
    transparent: true,
    needsSwap: false,
    copyToBuffer: true,
  };

  constructor(buffer, properties) {
    super(CopyShader, { ...CopyPass.defaultProperties, ...properties });

    this.buffer = buffer;
  }

  dispose() {
    this.buffer.dispose();
  }

  render(renderer, inputBuffer) {
    const { copyToBuffer, buffer } = this;

    super.render(
      renderer,
      copyToBuffer ? inputBuffer : buffer,
      copyToBuffer ? buffer : inputBuffer,
    );
  }
}
