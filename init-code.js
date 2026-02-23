
// Python用初期コード

window.INIT_PYTHON_CODE =
`import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 10, 100)
y = np.sin(x)
fig, ax = plt.subplots(figsize=(8,4))
ax.plot(x, y)
ax.set_title('Sample Sin Wave')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.grid(True)

print(y)
show_plot(fig)`;

// GLSL用初期コード

window.INIT_GLSL_CODE =
`#ifdef GL_ES
precision mediump float;
#endif

uniform vec3  iResolution;
uniform vec4  iMouse;
uniform float iTime;
uniform int   iFrame;

// --------[ ShaderToy begins here ]---------- //

#define Seed0 vec4(12.9898, 78.233, 45.164, 94.673)
#define Seed1 vec4(43758.5453, 28618.3756, 56812.5453, 83758.5453)

float rand21(in vec2 co)
{
    return fract(sin(dot(co, Seed0.xy)) * Seed1.x );
}

vec2 rand22(in vec2 co)
{
    return fract(sin(dot(co, Seed0.xy)) * Seed1.xy);
}

float voronoi2(
    in vec2 x,
    in float randScale,
    in bool IsHexagonal)
{
	const float SQRT3 = 1.73205080757;
	if(IsHexagonal) { x.y /= SQRT3 * 0.5; }
	vec2 p  = floor(x);
	vec3 oA = vec3(x, 10000000.0);
	vec3 oB = vec3(x, 10000000.0);
	vec2 mg = vec2(0.0, 0.0);
	for (int j=-1; j<=1; j++) {
	for (int i=-1; i<=1; i++) {
		vec2 b = vec2(i, j);
		vec2 t = p + b;
		if(IsHexagonal)
        {
            t.x += fract(t.y * 0.5) - 0.25;
        }
        
		vec2 o = rand22(t);
		o *= randScale;

		vec2 r = t + o - x;
		if(IsHexagonal)
        {
            r.y *= SQRT3 * 0.5;
        }

        float d = dot(r, r);
        if (d < oA.z)
        {
            oB = oA;
            oA = vec3(t, d);
            mg = b;
        }
        else if(d < oB.z)
        {
            oB = vec3(t, d);
        }
	} }
	return oA.z;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
	vec2 uv = fragCoord / iResolution.xx;

    vec2 p = cos(iTime + vec2(0.0, 2.0)) * 0.5 + 0.5;
	if(iMouse.z > 0.0)
    {
        p = iMouse.xy / iResolution.xy;
    }
	
    float f = 1.0 - voronoi2(10.0*uv, p.x, true);
	fragColor = vec4(f, f, f, 1.0);
}

// --------[ ShaderToy ends here ]---------- //

void main(void)
{
	mainImage(gl_FragColor, gl_FragCoord.xy);
}`;


// P5.js用初期コード

window.INIT_P5_CODE =
`function setup()
{
    createCanvas(512, 512);
}

function draw()
{
    ellipse(mouseX, mouseY, 80, 80);
}`;