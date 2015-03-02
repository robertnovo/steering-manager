/// <reference path="boid.ts" />
/// <reference path="cameraroot.ts" />
/// <reference path="target.ts" />

module Core {
    "use strict";

    export class Camera extends Boid {

        private resting: Boolean;
        private target: IBoid;
        private root: CameraRoot;
        private camera: THREE.PerspectiveCamera;

        constructor(posX: number, posY: number, posZ: number, totalMass: number) {
            console.info("camera init (camera.ts)");
            super(posX, posY, posZ, totalMass);
            //this.root = new CameraRoot(this.position.x, this.position.y, this.position.z);
            //this.root = new CameraRoot(100, 0, 100);
            this.resting = false;

            this.target = new Target(100, 0, 100, 2);
            
            this.camera = new THREE.PerspectiveCamera(60, 1, 1, 100);
            this.camera.position.set(posX, posY, posZ);
            Environment.scene.add(this.camera);
            var cameraHelper = new THREE.CameraHelper(this.camera);
            Environment.scene.add(cameraHelper);
        }

        // override think method
        think(): void {
            if (!this.resting) {
                //console.log("not resting");
                //console.log(this.root.position);
                //this.steering.pursuit(this.root.position);
                this.steering.pursuit(this.target);
                //this.steering.seek(this.root.position);
                //this.steering.reset();
            } else {
                //console.log("resting");
                this.steering.wander();
                //this.steering.reset();
            }
        }

        update(): void {
            super.update();
        }

        getMaxVelocity(): number {
            return this.resting > 0 ? 0 : 20; // stop if resting
        }
    }
}