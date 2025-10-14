import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-root",
  template:
    '<div class="cursor-dot" #cursorDot></div> <app-layout></app-layout>',
  styles: [],
})
export class AppComponent {
  @ViewChild("cursorDot", { static: true })
  cursorDot!: ElementRef<HTMLDivElement>;
  private mouseX = 0;
  private mouseY = 0;
  private dotX = 0;
  private dotY = 0;

  ngOnInit() {
    this.loop();
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  private loop() {
    this.dotX += (this.mouseX - this.dotX) * 0.15;
    this.dotY += (this.mouseY - this.dotY) * 0.15;
    this.cursorDot.nativeElement.style.transform = `translate(${this.dotX}px, ${this.dotY}px)`;
    requestAnimationFrame(() => this.loop());
  }
}
