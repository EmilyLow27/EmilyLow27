class VRButton {
	constructor(options) {
		this.renderer = renderer;
		// ... existing code ...

		const button = document.createElement('button');
		button.style.display = 'none';
		button.style.height = '40px';

		navigator.xr.isSessionSupported(this.sessionMode).then((supported) => {
			supported ? this.showEnterVR(button) : this.showWebXRNotFound(button);
			if (options && options.vrStatus) options.vrStatus(supported);
		});

		document.body.appendChild(button);
	}

	showEnterVR(button) {
		let currentSession = null;
		const self = this;

		this.stylizeElement(button, true, 30, true);

		button.style.animation = 'none'; // Reset animation

		button.onmouseenter = function () {
			button.style.fontSize = '12px';
			button.textContent = (currentSession === null) ? 'ENTER VR' : 'EXIT VR';
			button.style.opacity = '1.0';
			button.style.animation = 'pound 0.5s ease infinite'; // Add animation
		};

		button.onmouseleave = function () {
			button.style.fontSize = '30px';
			button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';
			button.style.opacity = '0.5';
			button.style.animation = 'none'; // Remove animation
		};

		button.onclick = function () {
			// ... existing click handling ...
		};

		// ... existing code ...
	}

	// ... existing methods ...

	stylizeElement(element, active = true, fontSize = 13, ignorePadding = false) {
		element.style.position = 'absolute';
		element.style.bottom = '20px';
		if (!ignorePadding) element.style.padding = '12px 6px';
		element.style.border = '1px solid #fff';
		element.style.borderRadius = '4px';
		element.style.background = (active) ? 'rgba(0,0,255,1)' : 'rgba(180,20,20,1)';
		element.style.color = '#fff';
		element.style.font = `normal ${fontSize}px sans-serif`;
		element.style.textAlign = 'center';
		element.style.opacity = '0.5';
		element.style.outline = 'none';
		element.style.zIndex = '999';
	}

	// Add CSS keyframes for pounding effect
	static addStyles() {
		const style = document.createElement('style');
		style.innerHTML = `
			@keyframes pound {
				0%, 100% { transform: scale(1); }
				50% { transform: scale(1.1); }
			}
		`;
		document.head.appendChild(style);
	}
}

// Call this static method once to add styles
VRButton.addStyles();

export { VRButton };
