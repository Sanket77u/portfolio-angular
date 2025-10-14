import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import * as THREE from "three";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  skills = [
    "Angular",
    "Node.js",
    "Express",
    "TypeScript",
    "SQL",
    "Ant Design (NG-ZORRO)",
  ];
  @ViewChild("bgCanvas", { static: true })
  bgCanvas!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private frameId!: number;

  ngAfterViewInit() {
    const canvas = this.bgCanvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.resizeCanvas();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Solid semi-transparent triangle
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0,
      2.8,
      0, // top
      -2.8,
      -2.8,
      0, // bottom left
      2.8,
      -2.8,
      0, // bottom right
    ]);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({
      color: 0x007acc,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    const triangle = new THREE.Mesh(geometry, material);
    triangle.position.set(1, 0, -1);
    triangle.rotation.z = Math.PI / 8;
    this.scene.add(triangle);

    // Animate
    const animate = () => {
      triangle.rotation.z += 0.005;
      this.renderer.render(this.scene, this.camera);
      this.frameId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", this.resizeCanvas.bind(this));
  }

  private resizeCanvas() {
    const canvas = this.bgCanvas.nativeElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    this.renderer.setSize(width, height);
    if (this.camera) {
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.frameId);
    this.renderer.dispose();
  }
}
