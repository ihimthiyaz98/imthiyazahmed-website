/* ==========================================
   Three.js 3D Scene Setup
   Camera on Gimbal & Studio Lights
   ========================================== */

class ThreeJsScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.cameraModel = null;
        this.lights = [];
        this.animationId = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollProgress = 0;
        
        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.createLights();
        this.createCameraModel();
        this.createStudioLights();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0f0f1e, 10, 50);
    }

    setupCamera() {
        const container = document.getElementById('canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );
        this.camera.position.z = 8;
    }

    setupRenderer() {
        const container = document.getElementById('canvas-container');
        
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 0);
        
        container.appendChild(this.renderer.domElement);
    }

    createLights() {
        // Ambient light with purple tint
        const ambientLight = new THREE.AmbientLight(0x8b5cf6, 0.3);
        this.scene.add(ambientLight);

        // Main purple directional light
        const mainLight = new THREE.DirectionalLight(0x8b5cf6, 0.8);
        mainLight.position.set(5, 5, 5);
        this.scene.add(mainLight);

        // Accent violet light
        const accentLight = new THREE.PointLight(0x7c3aed, 1, 100);
        accentLight.position.set(-5, 3, -5);
        this.scene.add(accentLight);
    }

    createCameraModel() {
        // Create a stylized camera on gimbal
        const cameraGroup = new THREE.Group();

        // Camera body
        const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 1);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a3e,
            shininess: 100
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        cameraGroup.add(body);

        // Lens
        const lensGeometry = new THREE.CylinderGeometry(0.4, 0.5, 0.8, 32);
        const lensMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a2e,
            shininess: 150,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.2
        });
        const lens = new THREE.Mesh(lensGeometry, lensMaterial);
        lens.rotation.z = Math.PI / 2;
        lens.position.x = 1.1;
        cameraGroup.add(lens);

        // Lens glass
        const glassGeometry = new THREE.CircleGeometry(0.35, 32);
        const glassMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.6,
            shininess: 200,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.3
        });
        const glass = new THREE.Mesh(glassGeometry, glassMaterial);
        glass.position.x = 1.5;
        cameraGroup.add(glass);

        // Viewfinder
        const viewfinderGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.2);
        const viewfinder = new THREE.Mesh(viewfinderGeometry, bodyMaterial);
        viewfinder.position.set(-0.5, 0.7, 0);
        cameraGroup.add(viewfinder);

        // Gimbal ring (outer)
        const gimbalGeometry = new THREE.TorusGeometry(2, 0.05, 16, 100);
        const gimbalMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.5,
            shininess: 100
        });
        const gimbalOuter = new THREE.Mesh(gimbalGeometry, gimbalMaterial);
        gimbalOuter.rotation.y = Math.PI / 4;
        
        // Gimbal ring (inner)
        const gimbalInner = new THREE.Mesh(gimbalGeometry, gimbalMaterial);
        gimbalInner.rotation.x = Math.PI / 2;
        
        // Create complete gimbal system
        const gimbalGroup = new THREE.Group();
        gimbalGroup.add(gimbalOuter);
        gimbalGroup.add(gimbalInner);
        gimbalGroup.add(cameraGroup);

        this.cameraModel = gimbalGroup;
        this.scene.add(this.cameraModel);
    }

    createStudioLights() {
        // Softbox light (left)
        const softboxGroup = this.createSoftbox();
        softboxGroup.position.set(-4, 2, 2);
        softboxGroup.rotation.y = Math.PI / 6;
        this.scene.add(softboxGroup);
        this.lights.push(softboxGroup);

        // Softbox light (right)
        const softboxGroup2 = this.createSoftbox();
        softboxGroup2.position.set(4, 2, 2);
        softboxGroup2.rotation.y = -Math.PI / 6;
        this.scene.add(softboxGroup2);
        this.lights.push(softboxGroup2);

        // Ring light (top)
        const ringLight = this.createRingLight();
        ringLight.position.set(0, 4, -3);
        this.scene.add(ringLight);
        this.lights.push(ringLight);
    }

    createSoftbox() {
        const group = new THREE.Group();

        // Softbox panel
        const panelGeometry = new THREE.BoxGeometry(1.5, 2, 0.2);
        const panelMaterial = new THREE.MeshPhongMaterial({
            color: 0x2a2a3e,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.3
        });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        group.add(panel);

        // Light face
        const faceGeometry = new THREE.PlaneGeometry(1.4, 1.9);
        const faceMaterial = new THREE.MeshBasicMaterial({
            color: 0xa78bfa,
            transparent: true,
            opacity: 0.7
        });
        const face = new THREE.Mesh(faceGeometry, faceMaterial);
        face.position.z = 0.11;
        group.add(face);

        // Stand
        const standGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3, 16);
        const standMaterial = new THREE.MeshPhongMaterial({ color: 0x2a2a3e });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.y = -2.5;
        group.add(stand);

        return group;
    }

    createRingLight() {
        const group = new THREE.Group();

        // Ring
        const ringGeometry = new THREE.TorusGeometry(0.8, 0.1, 16, 100);
        const ringMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b5cf6,
            emissive: 0x8b5cf6,
            emissiveIntensity: 0.8
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        group.add(ring);

        // Inner glow
        const glowGeometry = new THREE.CircleGeometry(0.7, 32);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xa78bfa,
            transparent: true,
            opacity: 0.5
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        group.add(glow);

        return group;
    }

    setupEventListeners() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // Window resize
        window.addEventListener('resize', () => this.onWindowResize());

        // Scroll
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            this.scrollProgress = scrollTop / scrollHeight;
        });
    }

    onWindowResize() {
        const container = document.getElementById('canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        // Rotate camera model on gimbal
        if (this.cameraModel) {
            // Base rotation
            this.cameraModel.rotation.y += 0.002;
            
            // Mouse influence
            this.cameraModel.rotation.x += (this.mouseY * 0.3 - this.cameraModel.rotation.x) * 0.05;
            this.cameraModel.rotation.y += (this.mouseX * 0.5 - this.cameraModel.rotation.y) * 0.05;
            
            // Scroll influence
            this.cameraModel.position.y = Math.sin(this.scrollProgress * Math.PI * 2) * 0.5;
        }

        // Animate studio lights based on scroll
        this.lights.forEach((light, index) => {
            const offset = index * (Math.PI * 2 / this.lights.length);
            const intensity = 0.3 + Math.sin(this.scrollProgress * Math.PI * 2 + offset) * 0.2;
            
            if (light.children[1]) { // Light face
                light.children[1].material.opacity = intensity;
            }
            
            // Gentle floating motion
            light.position.y += Math.sin(Date.now() * 0.001 + offset) * 0.001;
        });

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize the scene when DOM is ready
let threeScene;

function initThreeScene() {
    try {
        threeScene = new ThreeJsScene();
    } catch (error) {
        console.warn('WebGL not supported, 3D scene disabled:', error);
        // Hide canvas container if WebGL is not supported
        const container = document.getElementById('canvas-container');
        if (container) {
            container.style.display = 'none';
        }
    }
}

// Auto-initialize if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThreeScene);
} else {
    initThreeScene();
}
