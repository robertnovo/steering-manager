/// <autosync enabled="true" />
/// <reference path="../app.ts" />
module Core {
    export class SteeringManager {

        private circleDistance = 6;
        private circleRadius = 8;

        // seek / flee
        desired: THREE.Vector3;

        // pursuit / evade
        distance: THREE.Vector3;
        targetFuturePosition: THREE.Vector3;

        // manager only members
        steering: THREE.Vector3;
        host: IBoid;

        constructor(host: IBoid) {
            console.log("steering manager init", host);
            this.host = host;
            this.desired = new THREE.Vector3();
            this.steering = new THREE.Vector3();

            this.truncate(host.getVelocity(), host.getMaxVelocity());
        }

        seek(target: THREE.Vector3, slowingRadius: number = 20): void {
            this.steering.add(this.doSeek(target, this.host.getMaxVelocity()));
        }

        private doSeek(target: THREE.Vector3, slowingRadius: number = 20): THREE.Vector3 {
            this.desired = target.sub(this.host.getPosition());

            var distance = this.desired.length();
            this.desired.normalize();

            // check if inside the slowing area
            if (distance <= slowingRadius) {
                this.desired.multiplyScalar(this.host.getMaxVelocity() * distance / slowingRadius);
            } else { // full speed ahead
                this.desired.multiplyScalar(this.host.getMaxVelocity());
            }

            var force = this.desired.sub(this.host.getVelocity());

            return force;
        }

        update(): void {
            var velocity = this.host.getVelocity();
            var position = this.host.getPosition();
            this.truncate(this.steering, 100); // max force
            this.steering.multiplyScalar(1 / this.host.getMass());
            velocity.add(this.steering);
            this.truncate(velocity, this.host.getMaxVelocity());

            /*
             * TODO: Återkom hit och se om det ska vara this.position
             */
            position.add(velocity);
        }

        reset(): void {
            this.desired.x = this.desired.y = this.desired.z = 0;
            this.steering.x = this.steering.y = this.steering.z = 0;
        }

        truncate(vector: THREE.Vector3, max: number): void {
            var i: number;

            i = max / vector.length();
            i = i < 1.0 ? i : 1.0;
            vector.multiplyScalar(i);
        }

        wander() {
            this.steering.add(this.doWander());
        }

        private doWander(): THREE.Vector3 {
            var circleCenter = this.host.getVelocity().clone();
            circleCenter.normalize();
            circleCenter.multiplyScalar(this.circleDistance);

            /*TODO: Kolla vad den här rackaren gör, praktiskt*/
            var displacement = new THREE.Vector3(0, -1, 0);
            displacement.multiplyScalar(this.circleRadius);

            var wanderForce = circleCenter.add(displacement);

            return wanderForce;
        }
    }
}