'use strict';

//based on Don's existing component https://github.com/donmccurdy/aframe-extras/blob/99535cd878eb36cb25cdcda4a32a40eb248c990a/src/misc/cube-env-map.js
AFRAME.registerComponent('circles-sphere-env-map', {
  //dependencies: ['circles-gltf'],
  schema: {
    src:            {type:'asset',      default:''},
    format:         {type:'string',     default:'RGBFormat'}
  },
  multiple: false, //do not allow multiple instances of this component on this entity
  init: function() {
    this.loader = new THREE.TextureLoader();
    this.applyEnvMap();
    this.el.addEventListener('object3dset', this.applyEnvMap.bind(this));
  },
  //custom function
  applyEnvMap : function () {
    const CONTEXT_AF = this;
    const mesh = CONTEXT_AF.el.getObject3D('mesh');

    console.log(CONTEXT_AF.el.sceneEl.renderer);

    //using PMREMGenerator is now necessary for modifying envMap textures!!
    CONTEXT_AF.mPmremGenerator = new THREE.PMREMGenerator(CONTEXT_AF.el.sceneEl.renderer);
    CONTEXT_AF.mPmremGenerator.compileEquirectangularShader();

    if ( CONTEXT_AF.data.src === '' ) {
      console.warn('No src defined in component');
    }
    else {
      const imagePath = (typeof CONTEXT_AF.data.src === 'string') ? CONTEXT_AF.data.src : CONTEXT_AF.data.src.getAttribute('src');

      console.log(imagePath);

      CONTEXT_AF.loader.load( imagePath,
        function onLoad(texture) {
          // texture.mapping    = THREE.EquirectangularReflectionMapping;
          // texture.magFilter  = THREE.LinearFilter;
          // texture.minFilter  = THREE.LinearMipMapLinearFilter;
          // texture.format     = THREE[CONTEXT_AF.data.format];
          const aProcessedTexture = CONTEXT_AF.mPmremGenerator.fromEquirectangular(texture).texture;
          CONTEXT_AF.mPmremGenerator.fromEquirectangular(texture).texture

          if (mesh) {
            mesh.traverse(function (node) {
              if (node.material && 'envMap' in node.material) {
                node.material.envMap = aProcessedTexture;
                //node.material.envMap = texture;
                //node.material.envMap.intensity = 10;
                node.material.needsUpdate = true;
              }
            });
          }
        },
        function onProgress(xmlHttpRequest) {
          //xmlHttpRequest.total (bytes), xmlHttpRequest.loaded (bytes)
        },
        function onError(message) {
          var message = (error && error.message) ? error.message : 'Failed to load spherical env map';
          console.log(message);
        }
      );
    }
  },
  // update: function () {},
  // tick: function(time, timeDelta) {},
  // tock: function(time, timeDelta) {},
  // remove: function() {},
  // pause: function() {},
  // play: function() {},
  // updateScheme: function(data) {}
});
