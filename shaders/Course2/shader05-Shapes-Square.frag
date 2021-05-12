#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float manhattanDist(vec2 v1, vec2 v2){
    return abs(v1.x-v2.x) + abs(v1.y - v2.y);

}

float drawRectOutlineBL(vec2 st){
    float rectLength = .5;
    float outlineSize =.01;

    //draw lines starting at the right points of the right thickness AND from a certain height 
    if(abs(st.x - rectLength) <= outlineSize && st.y >= rectLength - outlineSize && st.y <= 2.0 - rectLength + outlineSize)
        return 1.0;
    
    if(abs(st.y - rectLength) <= outlineSize && st.x >= rectLength - outlineSize && st.x <= 2.0 - rectLength + outlineSize)
        return 1.0;
    
    return 0.0;
}

float drawRectOutlineTR(vec2 st){
    float rectLength = .5;
    float outlineSize =.01;

    //draw lines starting at the right points of the right thickness AND from a certain height AND to a certain height
    if(abs(2. - st.x - rectLength) <= outlineSize && 2. - st.y >= rectLength - outlineSize && st.y >= rectLength + outlineSize)
        return 1.0;
    
    if(abs(2. - st.y - rectLength) <= outlineSize && 2. - st.x >= rectLength - outlineSize && st.x >= rectLength + outlineSize)
        return 1.0;
    
    return 0.0;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    float length = 1.0; // create a square centered in (1,1) of size length
    // Each result will return 1.0 (white) or 0.0 (black).

    // RECTANGLE
    //bottom-left
    vec2 marginsBL = vec2(1.0 - length/2.0);

    //vec2 bordersBL = step(marginsBL,st);
    vec2 bordersBL = smoothstep(marginsBL-abs(sin(u_time)), marginsBL+abs(sin(u_time)),st);
    //vec2 bordersBL = floor(st* 2.);

    float pct = bordersBL.x * bordersBL.y;

    //top-right
    vec2 marginsTR = vec2(1.0 + length/2.0);

    //vec2 bordersTR = step(st, marginsTR); // step(vec2(0.1),1.0-st);
    vec2 bordersTR = smoothstep(marginsTR + abs(sin(u_time)) , marginsTR - abs(sin(u_time)),st ); // step(vec2(0.1),1.0-st);
    //vec2 bordersTR = floor(st* 2.);
    //vec2 bordersTR = step(marginsTR,st - .1) - step(marginsTR,st + .1);

    pct *= bordersTR.x * bordersTR.y;
    //pct =drawRectOutlineBL(st) + drawRectOutlineTR(st);

    color = vec3(pct);

    gl_FragColor = vec4(color,1.0);
}