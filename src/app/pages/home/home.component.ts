import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import * as THREE from "three";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {








  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private shootingStars: THREE.Points[] = [];
  private animationId!: number;
  private time: number = 0;

  skills: string[] = [
    'Angular',
    'Node.js',
    'Express',
    'TypeScript',
    'MongoDB',
    'PostgreSQL',
    'REST APIs',
    'Git'
  ];

  roles: string[] = [
    'Full-Stack Developer',
    'Angular Developer',
    'Node.js Developer',
    'React Developer',
    'Express.js Developer'
  ];

  private roleIndex: number = 0;
  private roleInterval: any;

  ngOnInit(): void {
    // Start role animation after component loads
    this.startRoleAnimation();
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.roleInterval) {
      clearInterval(this.roleInterval);
    }

    // Clean up Three.js resources
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.scene) {
      // Dispose of shooting star geometries and materials
      this.shootingStars.forEach(star => {
        star.geometry.dispose();
        (star.material as THREE.Material).dispose();
      });
      this.scene.clear();
    }
  }

  private initThreeJS(): void {
    // Get the canvas element
    const canvas = document.getElementById('bgCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    // Create scene
    this.scene = new THREE.Scene();

    // Create camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // Create particles
    this.createParticles();

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize());

    // Start animation loop
    this.animate();
  }

  private createParticles(): void {
    const particleCount = 6000; // Adjusted for larger stars - fewer needed for great visibility
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const twinkles = new Float32Array(particleCount);

    // Create particles in multiple layers for depth
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Multi-layered distribution for better coverage
      const layer = Math.floor(Math.random() * 3); // 3 layers
      const radius = 5 + layer * 8 + Math.random() * 6; // 5-7, 13-19, 21-27
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Enhanced color palette with more variety
      const colorType = Math.random();
      let hue, saturation, lightness;

      if (colorType < 0.4) {
        // Bright blue to purple (40%) - more vibrant
        hue = (Math.random() * 60 + 220) / 360;
        saturation = 0.8 + Math.random() * 0.2;
        lightness = 0.7 + Math.random() * 0.3; // Increased brightness
      } else if (colorType < 0.7) {
        // Bright white to light blue (30%) - very bright
        hue = (Math.random() * 30 + 200) / 360;
        saturation = 0.05 + Math.random() * 0.15;
        lightness = 0.9 + Math.random() * 0.1; // Much brighter
      } else {
        // Bright cyan to turquoise (30%)
        hue = (Math.random() * 40 + 180) / 360;
        saturation = 0.7 + Math.random() * 0.3;
        lightness = 0.8 + Math.random() * 0.2; // Brighter
      }

      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Varied sizes for depth (larger, more attention-grabbing stars)
      sizes[i] = 0.08 + Math.random() * 0.28; // 0.08 to 0.2

      // Twinkle effect data
      twinkles[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('twinkle', new THREE.BufferAttribute(twinkles, 1));

    // Enhanced material with size attenuation
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 }
      },
      vertexShader: `
        attribute float size;
        attribute float twinkle;
        uniform float time;
        varying vec3 vColor;
        varying float vTwinkle;

        void main() {
          vColor = color;
          vTwinkle = twinkle;

          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float time;

        void main() {
          // Enhanced twinkle effect with more dramatic range
          float twinkleEffect = 0.4 + 0.6 * sin(time * 3.0 + vTwinkle);

          // Add extra brightness for more attention-grabbing shine
          float brightness = 1.5 + 0.5 * sin(time * 4.0 + vTwinkle * 2.0);

          // Create circular star shape with soft edges
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

          // Combine all effects for stunning shine
          vec3 finalColor = vColor * twinkleEffect * brightness * alpha;
          gl_FragColor = vec4(finalColor, alpha * 0.9);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    // Create particle system
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    // Create shooting stars
    this.createShootingStars();
  }

  private createShootingStars(): void {
    // Create a few shooting stars
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(20 * 3); // Trail of 20 points
      const colors = new Float32Array(20 * 3);

      // Initialize trail positions (will be updated in animation)
      for (let j = 0; j < 20; j++) {
        const j3 = j * 3;
        positions[j3] = 0;
        positions[j3 + 1] = 0;
        positions[j3 + 2] = 0;

        // White to transparent gradient
        const alpha = 1 - (j / 20);
        colors[j3] = 1.0 * alpha;
        colors[j3 + 1] = 1.0 * alpha;
        colors[j3 + 2] = 1.0 * alpha;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.25, // Much larger for maximum attention-grabbing effect
        vertexColors: true,
        transparent: true,
        opacity: 1.0, // Full opacity for maximum brightness
        blending: THREE.AdditiveBlending
      });

      const shootingStar = new THREE.Points(geometry, material);
      shootingStar.visible = false; // Start invisible
      shootingStar.userData = {
        active: false,
        speed: 0,
        direction: '',
        velocity: [0, 0, 0],
        trailIndex: 0,
        lastSpawn: 0
      };

      this.shootingStars.push(shootingStar);
      this.scene.add(shootingStar);
    }
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.time += 0.016; // ~60fps

    // Update particle system
    if (this.particles) {
      // Gentle rotation
      this.particles.rotation.x += 0.0005;
      this.particles.rotation.y += 0.0008;

      // Update shader uniforms for twinkling
      (this.particles.material as THREE.ShaderMaterial).uniforms['time'].value = this.time;

      // Subtle wave motion (less frequent for performance)
      if (Math.floor(this.time * 10) % 2 === 0) { // Every ~0.2 seconds
        const positions = this.particles.geometry.attributes['position'].array as Float32Array;
        const waveStrength = 0.05;

        for (let i = 0; i < positions.length; i += 9) { // Process every 3rd particle for performance
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];

          positions[i + 1] = y + Math.sin(this.time * 0.5 + x * 0.005) * waveStrength;
          positions[i + 2] = z + Math.cos(this.time * 0.3 + y * 0.005) * waveStrength;
        }

        this.particles.geometry.attributes['position'].needsUpdate = true;
      }
    }

    // Update shooting stars
    this.updateShootingStars();

    this.renderer.render(this.scene, this.camera);
  }

  private updateShootingStars(): void {
    this.shootingStars.forEach((shootingStar, index) => {
      const data = shootingStar.userData;

      // Randomly activate shooting stars from left and right
      if (!data['active'] && Math.random() < 0.001) { // ~0.1% chance per frame
        data['active'] = true;
        data['speed'] = 0.15 + Math.random() * 0.40; // Faster speed
        data['trailIndex'] = 0;

        // Determine direction: left or right
        const fromLeft = Math.random() < 0.5; // 50% chance for left or right

        if (fromLeft) {
          // Shooting star from left side (moving right)
          data['direction'] = 'left';
          const startX = -35 + Math.random() * 5; // Start from left edge
          const startY = (Math.random() - 0.5) * 20; // Random Y position
          const startZ = (Math.random() - 0.5) * 15; // Random Z position
          data['startPos'] = [startX, startY, startZ];
          data['velocity'] = [data['speed'], (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.05]; // Move right with slight variation
        } else {
          // Shooting star from right side (moving left)
          data['direction'] = 'right';
          const startX = 35 - Math.random() * 5; // Start from right edge
          const startY = (Math.random() - 0.5) * 20; // Random Y position
          const startZ = (Math.random() - 0.5) * 15; // Random Z position
          data['startPos'] = [startX, startY, startZ];
          data['velocity'] = [-data['speed'], (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.05]; // Move left with slight variation
        }

        data['currentPos'] = [...data['startPos']];
        shootingStar.visible = true;
      }

      if (data['active']) {
        // Update position using velocity
        data['currentPos'][0] += data['velocity'][0];
        data['currentPos'][1] += data['velocity'][1];
        data['currentPos'][2] += data['velocity'][2];

        // Update trail
        const positions = shootingStar.geometry.attributes['position'].array as Float32Array;
        const trailLength = 20;

        // Shift trail positions
        for (let i = (trailLength - 1) * 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3];
          positions[i + 1] = positions[i - 2];
          positions[i + 2] = positions[i - 1];
        }

        // Add new position at start of trail
        positions[0] = data['currentPos'][0];
        positions[1] = data['currentPos'][1];
        positions[2] = data['currentPos'][2];

        shootingStar.geometry.attributes['position'].needsUpdate = true;

        // Deactivate when off screen (moved too far in their direction)
        let shouldDeactivate = false;

        if (data['direction'] === 'left') {
          // Left-to-right stars: deactivate when they move too far right or are too far vertically
          shouldDeactivate = data['currentPos'][0] > 40 || Math.abs(data['currentPos'][1]) > 25;
        } else {
          // Right-to-left stars: deactivate when they move too far left or are too far vertically
          shouldDeactivate = data['currentPos'][0] < -40 || Math.abs(data['currentPos'][1]) > 25;
        }

        if (shouldDeactivate) {
          data['active'] = false;
          shootingStar.visible = false;
        }
      }
    });
  }

  private onWindowResize(): void {
    if (this.camera && this.renderer) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  startRoleAnimation(): void {
    const roleElement = document.getElementById('role-text');
    if (!roleElement) return;

    const typeRole = (text: string, callback?: () => void) => {
      let charIndex = 0;
      roleElement.textContent = '';

      const typeInterval = setInterval(() => {
        if (charIndex < text.length) {
          roleElement.textContent += text[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          if (callback) {
            setTimeout(callback, 2000); // Wait 2 seconds before erasing
          }
        }
      }, 100); // Type each character every 100ms
    };

    const eraseRole = (callback?: () => void) => {
      const currentText = roleElement.textContent || '';
      let charIndex = currentText.length;

      const eraseInterval = setInterval(() => {
        if (charIndex > 0) {
          roleElement.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
        } else {
          clearInterval(eraseInterval);
          if (callback) {
            setTimeout(callback, 300); // Small pause before typing next role
          }
        }
      }, 50); // Erase faster than typing
    };

    const cycleRoles = () => {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typeRole(this.roles[this.roleIndex], () => {
        eraseRole(cycleRoles);
      });
    };

    // Start with first role
    typeRole(this.roles[this.roleIndex], () => {
      eraseRole(cycleRoles);
    });
  }
}