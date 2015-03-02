/// <autosync enabled="true" />
/// <reference path="ts/environment.ts" />

module Core {
    export class App {
        overviewCamera;
        controls;
        constructor() {
            this.overviewCamera = Environment.overviewCamera;
            this.controls = new THREE.OrbitControls(this.overviewCamera);
            Environment.scene.add(new THREE.AxisHelper(15));
            this.animate();
        }

        render(): void {
            Environment.renderer.render(Environment.scene, this.overviewCamera);
        }

        update(): void {
            this.controls.update();
        }

        animate(): void {
            this.render();
            this.update();
            window.requestAnimationFrame(() => this.animate());
        }
    }   
}

(() => {
    "use strict";
    var app = new Core.App();
})();