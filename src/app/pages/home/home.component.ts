import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import * as THREE from "three";
import { BackendService } from '../../service/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private backendService: BackendService) { }

  @Input() page: string = 'home';

  // Three.js properties
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

  // Rating-related properties
  ratings: any[] = [];
  averageRating: number = 0;
  totalRatings: number = 0;
  isLoadingRatings: boolean = false;
  isReviewsDrawerOpen: boolean = false;
  isAddReviewDialogOpen: boolean = false;

  // Review dialog properties
  reviewDialog = {
    rating: 0,
    name: '',
    feedback: '',
    isSubmitted: false
  };

  ngOnInit(): void {
    // Start role animation after component loads
    this.startRoleAnimation();
    this.loadRatings();
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
  }

  ngOnDestroy(): void {
    // Clean up role interval when component is destroyed
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

  // ============================================
  // THREE.JS METHODS
  // ============================================

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
    const particleCount = 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const twinkles = new Float32Array(particleCount);

    // Create particles in multiple layers for depth
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Multi-layered distribution for better coverage
      const layer = Math.floor(Math.random() * 3);
      const radius = 5 + layer * 8 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Enhanced color palette with more variety
      const colorType = Math.random();
      let hue, saturation, lightness;

      if (colorType < 0.4) {
        hue = (Math.random() * 60 + 220) / 360;
        saturation = 0.8 + Math.random() * 0.2;
        lightness = 0.7 + Math.random() * 0.3;
      } else if (colorType < 0.7) {
        hue = (Math.random() * 30 + 200) / 360;
        saturation = 0.05 + Math.random() * 0.15;
        lightness = 0.9 + Math.random() * 0.1;
      } else {
        hue = (Math.random() * 40 + 180) / 360;
        saturation = 0.7 + Math.random() * 0.3;
        lightness = 0.8 + Math.random() * 0.2;
      }

      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = 0.08 + Math.random() * 0.28;
      twinkles[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('twinkle', new THREE.BufferAttribute(twinkles, 1));

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
          float twinkleEffect = 0.4 + 0.6 * sin(time * 3.0 + vTwinkle);
          float brightness = 1.5 + 0.5 * sin(time * 4.0 + vTwinkle * 2.0);

          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);

          vec3 finalColor = vColor * twinkleEffect * brightness * alpha;
          gl_FragColor = vec4(finalColor, alpha * 0.9);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    this.createShootingStars();
  }

  private createShootingStars(): void {
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(20 * 3);
      const colors = new Float32Array(20 * 3);

      for (let j = 0; j < 20; j++) {
        const j3 = j * 3;
        positions[j3] = 0;
        positions[j3 + 1] = 0;
        positions[j3 + 2] = 0;

        const alpha = 1 - (j / 20);
        colors[j3] = 1.0 * alpha;
        colors[j3 + 1] = 1.0 * alpha;
        colors[j3 + 2] = 1.0 * alpha;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.25,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending
      });

      const shootingStar = new THREE.Points(geometry, material);
      shootingStar.visible = false;
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
    this.time += 0.016;

    if (this.particles) {
      this.particles.rotation.x += 0.0005;
      this.particles.rotation.y += 0.0008;

      (this.particles.material as THREE.ShaderMaterial).uniforms['time'].value = this.time;

      if (Math.floor(this.time * 10) % 2 === 0) {
        const positions = this.particles.geometry.attributes['position'].array as Float32Array;
        const waveStrength = 0.05;

        for (let i = 0; i < positions.length; i += 9) {
          const x = positions[i];
          const y = positions[i + 1];
          const z = positions[i + 2];

          positions[i + 1] = y + Math.sin(this.time * 0.5 + x * 0.005) * waveStrength;
          positions[i + 2] = z + Math.cos(this.time * 0.3 + y * 0.005) * waveStrength;
        }

        this.particles.geometry.attributes['position'].needsUpdate = true;
      }
    }

    this.updateShootingStars();
    this.renderer.render(this.scene, this.camera);
  }

  private updateShootingStars(): void {
    this.shootingStars.forEach((shootingStar, index) => {
      const data = shootingStar.userData;

      if (!data['active'] && Math.random() < 0.001) {
        data['active'] = true;
        data['speed'] = 0.15 + Math.random() * 0.40;
        data['trailIndex'] = 0;

        const fromLeft = Math.random() < 0.5;

        if (fromLeft) {
          data['direction'] = 'left';
          const startX = -35 + Math.random() * 5;
          const startY = (Math.random() - 0.5) * 20;
          const startZ = (Math.random() - 0.5) * 15;
          data['startPos'] = [startX, startY, startZ];
          data['velocity'] = [data['speed'], (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.05];
        } else {
          data['direction'] = 'right';
          const startX = 35 - Math.random() * 5;
          const startY = (Math.random() - 0.5) * 20;
          const startZ = (Math.random() - 0.5) * 15;
          data['startPos'] = [startX, startY, startZ];
          data['velocity'] = [-data['speed'], (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.05];
        }

        data['currentPos'] = [...data['startPos']];
        shootingStar.visible = true;
      }

      if (data['active']) {
        data['currentPos'][0] += data['velocity'][0];
        data['currentPos'][1] += data['velocity'][1];
        data['currentPos'][2] += data['velocity'][2];

        const positions = shootingStar.geometry.attributes['position'].array as Float32Array;
        const trailLength = 20;

        for (let i = (trailLength - 1) * 3; i >= 3; i -= 3) {
          positions[i] = positions[i - 3];
          positions[i + 1] = positions[i - 2];
          positions[i + 2] = positions[i - 1];
        }

        positions[0] = data['currentPos'][0];
        positions[1] = data['currentPos'][1];
        positions[2] = data['currentPos'][2];

        shootingStar.geometry.attributes['position'].needsUpdate = true;

        let shouldDeactivate = false;

        if (data['direction'] === 'left') {
          shouldDeactivate = data['currentPos'][0] > 40 || Math.abs(data['currentPos'][1]) > 25;
        } else {
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

  // ============================================
  // ROLE ANIMATION METHODS
  // ============================================

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
            setTimeout(callback, 2000);
          }
        }
      }, 100);
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
            setTimeout(callback, 300);
          }
        }
      }, 50);
    };

    const cycleRoles = () => {
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      typeRole(this.roles[this.roleIndex], () => {
        eraseRole(cycleRoles);
      });
    };

    typeRole(this.roles[this.roleIndex], () => {
      eraseRole(cycleRoles);
    });
  }

  // ============================================
  // RATINGS METHODS
  // ============================================

  private loadRatings(): void {
    this.isLoadingRatings = true;
    this.backendService.getRatings().subscribe({
      next: (data: any) => {
        // Handle both direct array and object with ratings array
        if (data && data.ratings && Array.isArray(data.ratings)) {
          this.ratings = data.ratings;
          this.averageRating = data.averageRating || 0;
          this.totalRatings = data.totalRatings || data.ratings.length;
        } else if (Array.isArray(data)) {
          this.ratings = data;
          this.calculateAverageRating();
        } else {
          this.ratings = [];
        }
        
        this.isLoadingRatings = false;
        console.log('Ratings loaded:', this.ratings.length, 'items');
        console.log('Average rating:', this.averageRating);
      },
      error: (error) => {
        console.error('Error fetching ratings:', error);
        this.isLoadingRatings = false;
        this.ratings = [];
      }
    });
  }

  // Calculate average rating if not provided by backend
  private calculateAverageRating(): void {
    if (this.ratings.length === 0) {
      this.averageRating = 0;
      this.totalRatings = 0;
      return;
    }

    const sum = this.ratings.reduce((acc, rating) => acc + (rating.rating || 0), 0);
    this.averageRating = Number((sum / this.ratings.length).toFixed(1));
    this.totalRatings = this.ratings.length;
  }

  // Toggle reviews drawer
  toggleReviewsDrawer(): void {
    this.isReviewsDrawerOpen = !this.isReviewsDrawerOpen;
    
    // Prevent body scroll when drawer is open
    if (this.isReviewsDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  // Open add review dialog
  openAddReviewDialog(): void {
    this.isAddReviewDialogOpen = true;
    this.reviewDialog = {
      rating: 0,
      name: '',
      feedback: '',
      isSubmitted: false
    };
    document.body.style.overflow = 'hidden';
  }

  // Close add review dialog
  closeAddReviewDialog(): void {
    this.isAddReviewDialogOpen = false;
    document.body.style.overflow = '';
  }

  // Set rating
  setRating(rating: number): void {
    this.reviewDialog.rating = rating;
  }

  // Submit review
  submitReview(): void {
    if (this.reviewDialog.rating === 0 || !this.reviewDialog.name || this.reviewDialog.name.trim() === '') {
      return;
    }

    const reviewData = {
      rating: this.reviewDialog.rating.toString(),
      rating_message: this.reviewDialog.feedback.trim() || 'No message provided',
      username: this.reviewDialog.name.trim()
    };

    this.backendService.submitRating(reviewData).subscribe({
      next: (response) => {
        console.log('Review submitted successfully:', response);
        this.reviewDialog.isSubmitted = true;

        // Reload ratings
        this.loadRatings();

        // Auto close after 2 seconds
        setTimeout(() => {
          this.closeAddReviewDialog();
        }, 2000);
      },
      error: (error) => {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
      }
    });
  }

  // Format date for display
  formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }
}