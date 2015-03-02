module Core {
    export interface IBoid {
        getVelocity(): THREE.Vector3;
        getMaxVelocity(): number;
        getPosition(): THREE.Vector3;
        getMass(): number;
    }
} 