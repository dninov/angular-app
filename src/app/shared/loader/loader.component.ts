import { rendererTypeName } from '@angular/compiler';
import {Component, OnInit, ElementRef, ViewChild, Injectable, NgZone, OnDestroy} from '@angular/core';
import { render } from '@fullcalendar/angular';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent  implements OnDestroy, OnInit {
  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;
  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private light!: THREE.AmbientLight;
  private lightPoint!: THREE.DirectionalLight;
  private frameId: number = 0;
  private loader!: GLTFLoader;
  private object: any;
  constructor(private ngZone: NgZone) { 
    
  }
  ngOnInit(): void {
    this.createScene(this.rendererCanvas);
  }

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(200, 200);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, 1, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);
    this.light = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(this.light);
    this.lightPoint  = new THREE.DirectionalLight(0xffffff, 0.9);
    this.lightPoint.position.set(0.5, 0, 0.866); // ~60º
    this.scene.add( this.lightPoint );

    this.loader = new GLTFLoader();
    this.loader.load( '../../assets/chip.blend.gltf',  ( gltf ) => {
	    gltf.scene.scale.set( 2, 2, 2 );			   
    	gltf.scene.position.x = 0;				   
      gltf.scene.position.y = 0;				    
    	gltf.scene.position.z = 0;
      this.object = gltf.scene;				    
	    this.scene.add( gltf.scene );
      this.animate();
    });

  }
 
  ngOnDestroy(): void {
    if (this.frameId != null) {
      cancelAnimationFrame(this.frameId);
    }
  }
  animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }
    });
  }
  render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.object.rotation.y += 0.05;
    this.renderer.render(this.scene, this.camera);
  }
}
