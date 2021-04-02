// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float easeInOutElastic(float x){
float c5 = (2.0 * PI) / 4.5;
float a  = x == 0. ? 0. 
          :x == 1. ? 1.
          :x < 0.5 ? -(pow(2., 20. * x - 10.) * sin((20. * x - 11.125) * c5)) / 2.
          :(pow(2., -20. * x + 10.) * sin((20. * x - 11.125) * c5)) / 2. + 1.;
return a;
}


void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float centerX = cos(2. * u_time)/4. + 1.;
    float centerY = sin(2. * u_time)/4. + 1.;

    vec2 center = vec2(centerX, centerY);
    float pct = 0.0;
    
    //pct = distance(st,vec2(0.8)) + distance(st,vec2(1.3));
    //pct = distance(st,vec2(0.4)) * distance(st,vec2(1.6));
    //pct = min(distance(st,vec2(0.8)),distance(st,vec2(1.2)));
    //pct = max(distance(st,vec2(0.8)),distance(st,vec2(1.2)));
    pct = pow(distance(st,vec2(0.8)),distance(st,vec2(1.)));

    //rotating circle
    float dist = distance(st,center);
    //pct = step(0.5,dist);
    //pct = 1. - step(0.1,dist); 

    //float delta = easeInOutElastic(abs(cos(u_time))) /2.;
    //pct = smoothstep(.8 - delta, .9 - delta, dist); 
    //vec3 color = mix(vec3(1.0,0.0,0.0), vec3(1.), pct);

    vec3 color = vec3(1.0,1.0,0.0) * pct;

	gl_FragColor = vec4( color, 1.0 );
}
