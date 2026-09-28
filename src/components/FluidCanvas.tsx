import React, { useEffect, useRef } from 'react';

interface FluidCanvasProps {
  className?: string;
  palette?: 'luxury' | 'gold' | 'monochrome';
}

export const FluidCanvas: React.FC<FluidCanvasProps> = ({ className = '', palette = 'luxury' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Simulation configuration tuned for silky couture smoke trails
    const config = {
      SIM_RESOLUTION: 64,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 3.2,
      VELOCITY_DISSIPATION: 2.0,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 16,
      CURL: 22,
      SPLAT_RADIUS: 0.22,
      SPLAT_FORCE: 4500,
      COLOR_UPDATE_SPEED: 8,
    };

    const glParams = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2', glParams) as WebGL2RenderingContext | null;
    const isWebGL2 = Boolean(gl);
    if (!gl) {
      gl = (canvas.getContext('webgl', glParams) || canvas.getContext('experimental-webgl', glParams)) as WebGLRenderingContext | null;
    }
    if (!gl) return;

    let halfFloat: any;
    let supportLinearFiltering: any;

    if (isWebGL2) {
      (gl as WebGL2RenderingContext).getExtension('EXT_color_buffer_float');
      supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
    } else {
      halfFloat = gl.getExtension('OES_texture_half_float');
      supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 0.0);

    const halfFloatTexType = isWebGL2 ? (gl as any).HALF_FLOAT : (halfFloat ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE);

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      if (!gl) return null as any;
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture,
        fbo,
        width: w,
        height: h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param);
      let fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        width: w,
        height: h,
        texType: type,
        read: fbo1,
        write: fbo2,
        swap() {
          const temp = this.read;
          this.read = this.write;
          this.write = temp;
        },
      };
    }

    const filtering = supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
    const rgbaFormat = isWebGL2 ? (gl as any).RGBA16F : gl.RGBA;
    const rgFormat = isWebGL2 ? (gl as any).RG16F : gl.RGBA;
    const rFormat = isWebGL2 ? (gl as any).R16F : gl.RGBA;
    const texType = halfFloatTexType;

    let density: any;
    let velocity: any;
    let divergence: any;
    let curl: any;
    let pressure: any;

    function initFramebuffers() {
      if (!canvas || !gl) return;
      const width = canvas.width;
      const height = canvas.height;

      const simRes = config.SIM_RESOLUTION;
      const dyeRes = config.DYE_RESOLUTION;

      const simW = Math.max(2, Math.floor(simRes));
      const simH = Math.max(2, Math.floor((simRes * height) / width));
      const dyeW = Math.max(2, Math.floor(dyeRes));
      const dyeH = Math.max(2, Math.floor((dyeRes * height) / width));

      density = createDoubleFBO(dyeW, dyeH, rgbaFormat, gl.RGBA, texType, filtering);
      velocity = createDoubleFBO(simW, simH, rgFormat, isWebGL2 ? (gl as any).RG : gl.RGBA, texType, filtering);
      divergence = createFBO(simW, simH, rFormat, isWebGL2 ? (gl as any).RED : gl.RGBA, texType, gl.NEAREST);
      curl = createFBO(simW, simH, rFormat, isWebGL2 ? (gl as any).RED : gl.RGBA, texType, gl.NEAREST);
      pressure = createDoubleFBO(simW, simH, rFormat, isWebGL2 ? (gl as any).RED : gl.RGBA, texType, gl.NEAREST);
    }

    function compileShader(type: number, source: string) {
      if (!gl) return null;
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `
    )!;

    class Program {
      program: WebGLProgram;
      uniforms: Record<string, WebGLUniformLocation> = {};

      constructor(fragSrc: string) {
        const frag = compileShader(gl!.FRAGMENT_SHADER, fragSrc)!;
        this.program = gl!.createProgram()!;
        gl!.attachShader(this.program, baseVertexShader);
        gl!.attachShader(this.program, frag);
        gl!.linkProgram(this.program);

        const count = gl!.getProgramParameter(this.program, gl!.ACTIVE_UNIFORMS);
        for (let i = 0; i < count; i++) {
          const name = gl!.getActiveUniform(this.program, i)!.name;
          this.uniforms[name] = gl!.getUniformLocation(this.program, name)!;
        }
      }

      bind() {
        gl!.useProgram(this.program);
      }
    }

    const displayProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;

      void main () {
        vec4 c = texture2D(uTexture, vUv);
        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c.rgb * 1.35, a * 0.85);
      }
    `);

    const splatProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;

      void main () {
        vec2 p = vUv - point.xy;
        p.x *= aspectRatio;
        vec3 splat = exp(-dot(p, p) / radius) * color;
        vec3 base = texture2D(uTarget, vUv).xyz;
        gl_FragColor = vec4(base + splat, 1.0);
      }
    `);

    const advectionProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
        gl_FragColor.a = 1.0;
      }
    `);

    const divergenceProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).x;
        float R = texture2D(uVelocity, vR).x;
        float T = texture2D(uVelocity, vT).y;
        float B = texture2D(uVelocity, vB).y;

        vec2 C = texture2D(uVelocity, vUv).xy;
        if (vL.x < 0.0) { L = -C.x; }
        if (vR.x > 1.0) { R = -C.x; }
        if (vT.y > 1.0) { T = -C.y; }
        if (vB.y < 0.0) { B = -C.y; }

        float div = 0.5 * (R - L + T - B);
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
    `);

    const curlProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uVelocity, vL).y;
        float R = texture2D(uVelocity, vR).y;
        float T = texture2D(uVelocity, vT).x;
        float B = texture2D(uVelocity, vB).x;
        float vorticity = R - L - T + B;
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
    `);

    const vorticityProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;

      void main () {
        float L = texture2D(uCurl, vL).x;
        float R = texture2D(uCurl, vR).x;
        float T = texture2D(uCurl, vT).x;
        float B = texture2D(uCurl, vB).x;
        float C = texture2D(uCurl, vUv).x;

        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
        force /= length(force) + 0.0001;
        force *= curl * C;
        force.y *= -1.0;

        vec2 vel = texture2D(uVelocity, vUv).xy;
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
    `);

    const pressureProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;

      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        float C = texture2D(uPressure, vUv).x;
        float divergence = texture2D(uDivergence, vUv).x;
        float pressure = (L + R + B + T - divergence) * 0.25;
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
    `);

    const gradSubtractProgram = new Program(`
      precision highp float;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;

      void main () {
        float L = texture2D(uPressure, vL).x;
        float R = texture2D(uPressure, vR).x;
        float T = texture2D(uPressure, vT).x;
        float B = texture2D(uPressure, vB).x;
        vec2 velocity = texture2D(uVelocity, vUv).xy;
        velocity.xy -= vec2(R - L, T - B);
        gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
    `);

    const quadVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target: any) {
      if (!gl) return;
      if (target == null) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function splat(x: number, y: number, dx: number, dy: number, color: [number, number, number]) {
      if (!gl) return;
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x, y);
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color[0], color[1], color[2]);
      blit(density.write);
      density.swap();
    }

    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    let colorStep = 0;
    function getNextCoutureColor(): [number, number, number] {
      colorStep += 0.08;
      const t = Math.sin(colorStep);
      if (t > 0.3) {
        // Metallic Gold: [1.25, 1.05, 0.65]
        return [1.25, 1.05, 0.65];
      } else if (t < -0.3) {
        // Deep Crimson Zari: [1.15, 0.22, 0.32]
        return [1.15, 0.22, 0.32];
      } else {
        // Champagne Cream: [1.0, 0.92, 0.75]
        return [1.0, 0.92, 0.75];
      }
    }

    function handlePointerMove(e: PointerEvent | MouseEvent | Touch) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;

      if (!hasMoved) {
        lastX = x;
        lastY = y;
        hasMoved = true;
        return;
      }

      const dx = (x - lastX) * config.SPLAT_FORCE;
      const dy = (y - lastY) * config.SPLAT_FORCE;
      lastX = x;
      lastY = y;

      const dist = Math.hypot(dx, dy);
      if (dist > 1.0) {
        splat(x, y, dx, dy, getNextCoutureColor());
      }
    }

    function onPointerMove(e: PointerEvent) {
      handlePointerMove(e);
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0]);
      }
    }

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        initFramebuffers();
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    resize();
    initFramebuffers();

    // Trigger initial gentle ambient gold and crimson swirls
    const t1 = setTimeout(() => {
      if (!canvas) return;
      splat(0.48, 0.52, 40, 60, [1.2, 0.95, 0.55]);
      splat(0.52, 0.48, -40, -50, [0.95, 0.2, 0.3]);
    }, 200);

    const t2 = setTimeout(() => {
      if (!canvas) return;
      splat(0.45, 0.55, 30, -35, [1.1, 0.85, 0.5]);
    }, 800);

    let lastTime = Date.now();
    let animId: number;

    function step() {
      if (!gl || !canvas) return;
      const now = Date.now();
      let dt = Math.min((now - lastTime) / 1000, 0.032);
      lastTime = now;

      // 1. Curl & Vorticity
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / velocity.width, 1.0 / velocity.height);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / velocity.width, 1.0 / velocity.height);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write);
      velocity.swap();

      // 2. Divergence
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / velocity.width, 1.0 / velocity.height);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      // 3. Pressure Poisson iterations
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / velocity.width, 1.0 / velocity.height);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(1));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(0));
        blit(pressure.write);
        pressure.swap();
      }

      // 4. Gradient subtract
      gradSubtractProgram.bind();
      gl.uniform2f(gradSubtractProgram.uniforms.texelSize, 1.0 / velocity.width, 1.0 / velocity.height);
      gl.uniform1i(gradSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write);
      velocity.swap();

      // 5. Advection: Velocity & Density
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / velocity.width, 1.0 / velocity.height);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, Math.exp(-dt * config.VELOCITY_DISSIPATION));
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, Math.exp(-dt * config.DENSITY_DISSIPATION));
      blit(density.write);
      density.swap();

      // 6. Display to Screen
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      displayProgram.bind();
      gl.uniform1i(displayProgram.uniforms.uTexture, density.read.attach(0));
      blit(null);

      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [palette]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
};
