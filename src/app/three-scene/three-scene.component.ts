import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-three-scene",
  template: `<canvas #canvas3d class="w-full h-full"></canvas>`,
  styles: [":host { display: block; width: 100%; height: 400px; }"],
})
export class ThreeSceneComponent implements AfterViewInit, OnDestroy {
  @ViewChild("canvas3d", { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private frameId: number = 0;

  ngAfterViewInit() {
    this.initScene();
    this.animate();
  }

  private initScene() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 4);

    // Add a rotating 3D torus knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0x007acc,
      metalness: 0.6,
      roughness: 0.4,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    this.scene.add(torusKnot);

    // Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    const point = new THREE.PointLight(0xffffff, 1);
    point.position.set(5, 5, 5);
    this.scene.add(ambient, point);

    // Rotate on each frame
    this.frameId = 0;
    this.renderer.setAnimationLoop(() => {
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.02;
      this.renderer.render(this.scene, this.camera);
    });
  }

  private animate() {
    // handled by renderer.setAnimationLoop
  }

  ngOnDestroy() {
    if (this.frameId) {
      this.renderer.setAnimationLoop(null!);
    }
  }
}
