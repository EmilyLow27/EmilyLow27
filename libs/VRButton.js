showEnterVR(button) {
    let currentSession = null;
    const self = this;

    this.stylizeElement(button, true, 30, true);

    function onSessionStarted(session) {
        session.addEventListener('end', onSessionEnded);
        self.renderer.xr.setSession(session);
        self.stylizeElement(button, false, 12, true);
        button.textContent = 'EXIT VR';
        currentSession = session;

        if (self.onSessionStart !== undefined) self.onSessionStart();
    }

    function onSessionEnded() {
        currentSession.removeEventListener('end', onSessionEnded);
        self.stylizeElement(button, true, 12, true);
        button.textContent = 'ENTER VR';
        currentSession = null;

        if (self.onSessionEnd !== undefined) self.onSessionEnd();
    }

    // Center the button
    button.style.display = '';
    button.style.position = 'fixed';
    button.style.top = '50%';
    button.style.left = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    button.style.width = '80px';
    button.style.cursor = 'pointer';
    button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';

    button.onmouseenter = function () {
        button.style.fontSize = '12px';
        button.textContent = (currentSession === null) ? 'ENTER VR' : 'EXIT VR';
        button.style.opacity = '1.0';
    };

    button.onmouseleave = function () {
        button.style.fontSize = '30px';
        button.innerHTML = '<i class="fas fa-vr-cardboard"></i>';
        button.style.opacity = '0.5';
    };

    button.onclick = function () {
        if (currentSession === null) {
            navigator.xr.requestSession(self.sessionMode, self.sessionInit).then(onSessionStarted);
        } else {
            currentSession.end();
        }
    };
}
