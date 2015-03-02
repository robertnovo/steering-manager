/// <reference path="ts/camera.ts" />
/// <reference path="ts/environment.ts" />
module Core {
    export class App {
        overviewCamera;
        controls;
        followCamera: Camera;

        constructor() {
            this.followCamera = new Camera(30, 20, 10, 1);
            this.overviewCamera = Environment.overviewCamera;
            this.controls = new THREE.OrbitControls(this.overviewCamera);
            Environment.scene.add(new THREE.AxisHelper(15));
            this.animate();
        }

        render(): void {
            Environment.renderer.render(Environment.scene, this.overviewCamera);
        }

        animate(): void {
            this.render();
            this.update();
            window.requestAnimationFrame(() => this.animate());
        }

        update(): void {
            this.followCamera.update();
            this.controls.update();
        }
    }
}

(() => {
    "use strict";
    var app = new Core.App();
})();