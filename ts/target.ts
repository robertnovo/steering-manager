/// <reference path="boid.ts" />
module Core {
    export class Target extends Boid {
        camera: Boid;
        container: THREE.Object3D;
        constructor(posX: number, posY: number, posZ: number, totalMass: number) {
            super(posX, posY, posZ, totalMass);
            var geometry = new THREE.BoxGeometry(5, 5, 5);
            var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            var mesh = new THREE.Mesh(geometry, material);
            this.container = new THREE.Object3D();
            this.container.add(mesh);
            Environment.scene.add(this.container);
        }

        think(): void {
            if (this.camera != null) {
                
            } else if (this.camera == null) {
                this.steering.wander();
            }
        }

        update(): void {
            super.update();
            console.log("hej");
            this.container.position = this.getPosition();
        }

        getMaxVelocity(): number {
            return this.camera != null ? 3 : 1;
        }
    }
} 