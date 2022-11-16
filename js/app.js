m = document.getElementById('life').getContext('2d');
draw = (x, y, c, s) => {
    m.fillStyle = c;
    m.fillRect(x, y, s, s);
};

particles = [];
particle = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
};

random = () => {
    return Math.random() * 400 + 50;
};

createOrganism = (num, color) => {
    group = [];
    for (let i = 0; i < num; i++) {
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }
    return group;
};

attractionParticles = (particles1, particles2, attraction) => {
    for (let i = 0; i < particles1.length; i++) {
        fx = 0;
        fy = 0;

        for (let j = 0; j < particles2.length; j++) {
            a = particles1[i];
            b = particles2[j];
            dx = a.x - b.x;
            dy = a.y - b.y;
            d = Math.sqrt(dx * dx + dy * dy);
            if (d > 0 && d < 30) {
                F = attraction - 1 / d; //Fuerza
                fx += F * dx;
                fy += F * dy;
            }
        }
        a.vx = (a.vx + fx) * 0.5; //aceleración/2
        a.vy = (a.vy + fy) * 0.5;
        a.x += a.vx;
        a.y += a.vy;

        if (a.x < 0 || a.x >= 500) {
            a.vx *= -1;
        }
        if (a.y <= 0 || a.y >= 500) {
            a.vy *= -1;
        }
    }
};

yellowParticles = createOrganism(200, 'yellow');
redParticles = createOrganism(200, 'red');
greenParticles = createOrganism(200, 'green');

update = () => {
    //Instantiate the function attraction Particles() and pass the particles and the magnitude of the attraction as attributes (preferably values close to 0).
    attractionParticles(greenParticles, redParticles, -0.17);
    attractionParticles(greenParticles, yellowParticles, 0.34);
    attractionParticles(yellowParticles, yellowParticles, 0.15);
    attractionParticles(yellowParticles, greenParticles, -0.2);

    m.clearRect(0, 0, 500, 500);
    draw(0, 0, 'black', 900);
    for (i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 5);
    }
    requestAnimationFrame(update);
};

update();
