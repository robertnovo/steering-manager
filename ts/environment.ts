/// <autosync enabled="true" />

module Environment {
    "use strict";

    class SceneFactory {
        private static scene = new THREE.Scene();

        static get getSceneInstance(): THREE.Scene {
            return SceneFactory.scene;
        }
    }

    class RenderFactory {
        private renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        constructor() {
            var container = Container.getContainer;
            this.renderer.setClearColor(0xf2f2f2);
            container.appendChild(this.renderer.domElement);
            this.updateSize = () => {
                this.renderer.setSize(window.innerWidth - 30, window.innerHeight - 30);
            };
            window.addEventListener("resize", this.updateSize, false);
            this.updateSize();
        }

        updateSize: () => void;

        getRenderer(): THREE.WebGLRenderer {
            return this.renderer;
        }
    }

    class Container {
        private static container = document.getElementById("app-container");

        static get getContainer(): HTMLElement {
            return Container.container;
        }
    }

    class CameraFactory {
        _camera: THREE.PerspectiveCamera;
        updateSize: () => void;

        constructor(fov: number, aspect: number, near: number, far: number) {
            this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            this._camera.position.x = 200;
            this._camera.position.y = 200;
            this._camera.position.z = 200;
            this._camera.lookAt(new THREE.Vector3(0, 0, 0));

            this.updateSize = () => {
                this._camera.aspect = window.innerWidth / window.innerHeight;
                this._camera.updateProjectionMatrix();
            };
            window.addEventListener("resize", this.updateSize, false);
            this.updateSize();
        }

        get getCameraInstance(): THREE.PerspectiveCamera {
            return this._camera;
        }
    }

    export var scene = SceneFactory.getSceneInstance;
    export var container = Container.getContainer;
    export var renderer = new RenderFactory().getRenderer();
    export var overviewCamera = new CameraFactory(60, 1, 1, 10000).getCameraInstance;
}