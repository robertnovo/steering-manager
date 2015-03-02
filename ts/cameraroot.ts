/// <autosync enabled="true" />
module Core {
    export class CameraRoot extends THREE.Object3D {
        constructor(posX: number, posY: number, posZ: number) {
            super();
            console.info("cameraRoot init");
            this.position.set(posX, posY, posZ);
            var geometry = new THREE.BoxGeometry(5, 5, 5);
            var material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
            var mesh = new THREE.Mesh(geometry, material);
            this.add(mesh);
            Environment.scene.add(this);
        }

        moveTo(target: THREE.Vector3): void {
            
        }
    }
} 