/// <autosync enabled="true" />
/// <reference path="steeringmanager.ts" />
/// <reference path="iboid.ts" />
module Core {
    export class Boid implements IBoid {

        position: THREE.Vector3;
        velocity: THREE.Vector3;
        mass: number;
        steering: SteeringManager;
        x: number;
        y: number;
        z: number;

        private maxVelocity = 0.1;

        constructor(posX: number, posY: number, posZ: number, totalMass: number) {
            console.info("boid init");
            this.position = new THREE.Vector3(posX, posY, posZ);
            this.velocity = new THREE.Vector3(); // initial velocity = 0
            this.mass = totalMass;
            this.steering = new SteeringManager(this);

            this.x = this.position.x;
            this.y = this.position.y;
            this.z = this.position.z;
        }

        think(): void {
            this.steering.wander();
            console.log("thinking from boid.ts");
        }

        update(): void {
            this.think();
            this.steering.update();
            console.log("updating from boid");
            this.x = this.position.x;
            this.y = this.position.y;
            this.z = this.position.z;
        }

        getVelocity(): THREE.Vector3 {
            return this.velocity;
        }

        getMaxVelocity(): number {
            return this.maxVelocity;
        }

        getPosition(): THREE.Vector3 {
            return this.position;
        }

        getMass(): number {
            return this.mass;
        }
    }
} 