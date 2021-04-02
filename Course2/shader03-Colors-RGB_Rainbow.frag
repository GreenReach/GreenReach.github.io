#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec3 color1 = vec3(1, 0, 0);
vec3 color2 = vec3(1, 0.75, 0.2);
vec3 color3 = vec3(0.98, 1, 0);
vec3 color4 = vec3(0.12, 1, 0);
vec3 color5 = vec3(0, 0.07, 1);
vec3 color6 = vec3(0.83, 0, 1);
vec3 color7 = vec3(0.4, 0.07, 0.46);



void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);
    /*
    float time = sin(u_time) + 1.;

    vec3 colorM = colorMorning * (time / 2.0);
    vec3 colorMD = colorMidDay * (1.0 - abs(time - 1.0));
    vec3 colorE = colorEvening * (2.0 - time);
    
    //color = (colorM + colorMD +colorE) / 2.0;
    /*
    if(st.x <= 1.0/6.0 * 2.0)
        color = mix(color1, color2, st.x * 3.0 );
    else if(st.x <= 2.0/6.0 * 2.0)
        color = mix(color2, color3,(st.x - 1.0/3.0) * 3.0 );
    else if(st.x <= 3.0/6.0 * 2.0)
        color = mix(color3, color4,(st.x - 2.0/3.0) * 3.0 );
    else if(st.x <= 4.0/6.0 * 2.0)
        color = mix(color4, color5,(st.x - 3.0/3.0) * 3.0 );
    else if(st.x <= 5.0/6.0 * 2.0)
        color = mix(color5, color6,(st.x - 4.0/3.0) * 3.0 );
    else 
        color = mix(color6, color7,(st.x - 5.0/3.0) * 3.0 );
*/
    gl_FragColor = vec4(color,1.0);
}
