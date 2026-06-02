'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import peixinhoSvg from '../assets/images/home/peixinho.svg'

const VERTEX_SHADER = `
  uniform float time;
  varying vec3 vNormal;
  varying vec3 vPosition;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vNormal = normal;
    vPosition = position;
    float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
    vec3 newPosition = position + normal * displacement;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

const FRAGMENT_SHADER = `
  uniform vec3 pointLightPos;
  uniform float time;
  varying vec3 vNormal;
  varying vec3 vPosition;

  vec3 gradientColor(float t) {
    vec3 c0 = vec3(0.145, 0.388, 0.922);
    vec3 c1 = vec3(0.412, 0.420, 0.922);
    vec3 c2 = vec3(0.918, 0.369, 0.784);
    vec3 c3 = vec3(0.910, 0.298, 0.290);
    vec3 c4 = vec3(0.933, 0.478, 0.098);

    if (t < 0.25) return mix(c0, c1, t / 0.25);
    if (t < 0.5)  return mix(c1, c2, (t - 0.25) / 0.25);
    if (t < 0.75) return mix(c2, c3, (t - 0.5) / 0.25);
    return mix(c3, c4, (t - 0.75) / 0.25);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(pointLightPos - vPosition);
    float diffuse = max(dot(normal, lightDir), 0.0);
    float fresnel = 1.0 - dot(normal, vec3(0.0, 0.0, 1.0));
    fresnel = pow(fresnel, 2.0);

    float t = fract(vPosition.y * 0.5 + vPosition.x * 0.3 + time * 0.15);
    vec3 color = gradientColor(t);

    vec3 brightColor = mix(color, vec3(1.0), 0.35);
    vec3 finalColor = brightColor * (diffuse + 0.7) + brightColor * fresnel * 0.3;
    gl_FragColor = vec4(finalColor, 1.0);
  }
`

const MASK_STYLE: React.CSSProperties = {
  maskImage: `url(${peixinhoSvg.src})`,
  WebkitMaskImage: `url(${peixinhoSvg.src})`,
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskMode: 'alpha',
  position: 'relative',
  overflow: 'hidden',
} as React.CSSProperties

export default function SecaoPeixe3D() {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 1.6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const geometry = new THREE.IcosahedronGeometry(1.2, 64)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pointLightPos: { value: new THREE.Vector3(0, 0, 5) },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      wireframe: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const pointLight = new THREE.PointLight(0xffffff, 1, 100)
    pointLight.position.set(0, 0, 5)
    scene.add(pointLight)

    let frameId: number
    const animate = (t: number) => {
      material.uniforms.time.value = t * 0.0003
      mesh.rotation.y += 0.0005
      mesh.rotation.x += 0.0002
      const breathe = 1 + Math.sin(t * 0.001) * 0.08
      mesh.scale.setScalar(breathe)
      renderer.render(scene, camera)
      frameId = requestAnimationFrame(animate)
    }
    animate(0)

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      pointLight.position.set(x * 3, y * 3, 5)
      material.uniforms.pointLightPos.value.set(x * 3, y * 3, 5)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative w-full h-screen pl-4 pr-4 pt-20 pb-4 lg:pl-48 lg:pt-4 z-10">
      {/* Layout centralizado */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 lg:gap-6">
        {/* Peixinho 3D com máscara */}
        <div
          ref={canvasRef}
          className="w-full h-[12rem] md:w-[30rem] md:h-[16rem] lg:w-[36rem] lg:h-[20rem] flex-shrink-0 bg-white/20"
          style={MASK_STYLE}
        />

        {/* Título */}
        <div className="text-center px-4">
          <span className="text-white/70 text-xs md:text-sm font-medium tracking-wide block mb-2">
            Birutinha Filmes
          </span>
          <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.15]">
            <span className="text-white/80">Energia para criar!</span>
            {' '}
            <span className="text-white/80">Experiência para entregar!</span>
          </h2>
        </div>

        {/* Parágrafo */}
        <p className="text-white/70 text-xs md:text-sm lg:text-base leading-relaxed text-center w-full max-w-[42rem] px-4 lg:px-0">
          Produção audiovisual ágil, criativa e com tecnologia aplicada — dentro da verba real.
          {' '}Se é para sair do papel, a gente acelera.
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  )
}
