#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 red = vec3(1.0, 0.0, 0.0);
    vec3 yellow = vec3(0.77, 0.67, 0.06);
    vec3 blue = vec3(0.0, 0.0, 1.0);
 
    // for the first line we have the possition of the line * the lenth of it
    float bordersX = (step(.15,st.x) - step(.20, st.x)) * step(1.3,st.y)  +
                     step(.40,st.x) - step(.45, st.x)  + 
                     step(1.4,st.x) - step(1.45, st.x) + 
                     step(1.8,st.x) - step(1.85, st.x);

    float bordersY = (step(.15,st.y) - step(.20, st.y))  * step(0.4 ,st.x) +
                     step(1.3,st.y) - step(1.35, st.y) + 
                     step(1.65,st.y) - step(1.7, st.y);

    float pct = 1.- clamp(bordersX + bordersY,0.,1.);
    
    //isRedX * isRedY
    float isRed = (step(0.0, st.x) - step(.15, st.x) + step(0.20, st.x) - step(.40, st.x)) * step(1.3,st.y);
    float isYellow = step(1.8, st.x) * step(1.3,st.y);
    float isBlue = (step(1.45, st.x) - step(1.8, st.x) + step(1.85, st.x) - step(2., st.x)) * (step(0.0,st.y) - step(.15, st.y));

    if(isRed == 1.)
        color = pct * red;
    else if( isYellow == 1.)
        color = pct * yellow;
    else if( isBlue == 1.)
        color = pct * blue;
    else 
      color = vec3(pct);
    
    gl_FragColor = vec4(color,1.0);
}