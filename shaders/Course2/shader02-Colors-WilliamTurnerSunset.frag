#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorTL = vec3(0.149,0.141,0.912);
vec3 colorML = vec3(0.85, 0.86, 0.75);
vec3 colorBL = vec3(0.33, 0.42, 0.55);

vec3 colorTR = vec3(0.71, 0.51, 0.14);
vec3 colorMR = vec3(0.92, 0.82, 0.43);
vec3 colorBR = vec3(0.59, 0.25, 0.09);

//easing functions for different types of transitions can be found here https://easings.net/# 
/*
float easeOutBounce(float x){
float n1 = 7.5625;
float d1 = 2.75;
if (x < 1.0 / d1) {
    return n1 * x * x;
} else if (x < 2.0 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
} else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
} else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
}
}
*/

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    //float pct = easeOutBounce(abs(sin(u_time)));
    float pct = st.x;
     
    vec3 fColorTL = (2.0 - distance(st, vec2(0.0, 2.0))) * colorTL;
    vec3 fColorML = (2.0 - distance(st, vec2(0.0, 1.0))) * colorML;
    vec3 fColorBL = (2.0 - distance(st, vec2(0.0, 0.0))) * colorBL;

    vec3 fColorTR = (2.0 - distance(st, vec2(2.0, 2.0))) * colorTR;
    vec3 fColorMR = (2.0 - distance(st, vec2(2.0, 1.0))) * colorMR;
    vec3 fColorBR = (2.0 - distance(st, vec2(2.0, 0.0))) * colorBR;

    color = (fColorTL + fColorML + fColorBL + fColorTR + fColorMR + fColorBR) /6.0; //mix(colorTL, colorTR, pct);
    
    gl_FragColor = vec4(color,1.0);
}
