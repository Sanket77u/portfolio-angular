import { Injectable, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private cursorPosition = new THREE.Vector2();
  private targetPosition = new THREE.Vector2();
  private particleCount = 1000;
  private isAnimating = false;

  initScene(canvas: ElementRef<HTMLCanvasElement>) {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas.nativeElement,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particle system
    this.createParticles();

    // Start animation
    this.animate();

    // Event listeners
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);
    const colors = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount * 3; i += 3) {
      // Random positions in a sphere
      const r = 3 * Math.random();
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);

      // Gradient colors from purple to blue
      colors[i] = 0.5 + Math.random() * 0.5;     // R: purple-blue range
      colors[i + 1] = 0.2 + Math.random() * 0.3; // G: low for vibrant colors
      colors[i + 2] = 0.8 + Math.random() * 0.2; // B: high blue component
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  private onMouseMove(event: MouseEvent) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    this.cursorPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.cursorPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animateParticles();
    }
  }

  private animateParticles() {
    // Smoothly move particles towards cursor
    gsap.to(this.targetPosition, {
      x: this.cursorPosition.x * 2,
      y: this.cursorPosition.y * 2,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        this.particles.rotation.x = this.targetPosition.y * 0.3;
        this.particles.rotation.y = this.targetPosition.x * 0.3;
      },
      onComplete: () => {
        this.isAnimating = false;
      }
    });
  }

  private onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    // Rotate particles slowly
    this.particles.rotation.x += 0.001;
    this.particles.rotation.y += 0.001;

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.dispose();
  }
}