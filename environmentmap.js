 /*
global THREE, AFRAME
*/

AFRAME.registerSystem('environmentmap',{
    schema: {
        auto: {default: false}
    },
    init(){
        const scene = this.el.object3D;
        const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 128, { format: THREE.RGBFormat, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );
        const cubeCamera = new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
        this.cubeCamera= cubeCamera;
        this.needsUpdate = true;
        scene.environment = cubeRenderTarget.texture;
        this.el.addEventListener('loaded', function () {
            this.needsUpdate = true;
        });
    },
    tick(){
        if (!this.data.auto &&!this.needsUpdate) return;
        const scene = this.el.object3D;
        const renderer = this.el.renderer;
        const camera = this.el.camera;

        this.el.object3D.add( this.cubeCamera );
        this.cubeCamera.position.copy(camera.position);
        this.cubeCamera.update( renderer, scene );
        this.needsUpdate = false;
    }
})