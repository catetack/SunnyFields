let pcUser = false;
let opacity = 100;
AFRAME.registerComponent("movement-mechanics", {
    tick: function(){
        const playerBody = this.el;
        //get camera position
        const camera = document.querySelector('[camera]');
        const cameraPosition = camera.getAttribute('position');
        
        playerBody.setAttribute("position",  `${cameraPosition.x} ${-.5} ${cameraPosition.z}`);
        
        detectDevice();
    }
})
//if the program detects keyboard usage the simulated body is made invisible
//otherwise the program assumes that the player is using a VR system
function detectDevice(){
    document.addEventListener('keydown', () => {
        pcUser = true;
    })
    if (pcUser){

        const spheres = playerBody.querySelectorAll('a-sphere');
        const cylinder = playerBody.querySelector('a-cylinder');
        
        spheres.forEach(sphere => {
            sphere.setAttribute('material', 'opacity', opacity);
        });

        cylinder.setAttribute('material', 'opacity', opacity);
        //lerp 
        if (opacity != 0){
            opacity = opacity - opacity/12;
            if(opacity < 0.01){
                opacity = 0;
            }
        }
    }
}