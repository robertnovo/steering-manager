module Core {
    "use strict";

    export class Camera extends Boid {

        private resting: Boolean;

        private root: CameraRoot;

        constructor(posX: number, posY: number, posZ: number, totalMass: number) {
            console.log("init camera.ts");
            super(posX, posY, posZ, totalMass);
            this.root = new CameraRoot(this.position.x, this.position.y, this.position.z);
            this.resting = false;
        }

        think(): void {
            if (!this.resting) {
                this.steering.seek(this.root.position);
            } else {
                this.steering.wander();
                //this.steering.reset();
            }
        }

        getMaxVelocity(): number {
            return this.resting > 0 ? 0 : 7; // stop if resting
        }
    }
}