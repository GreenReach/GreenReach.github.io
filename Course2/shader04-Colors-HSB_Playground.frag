#ifdef GL_ES
precision mediump float;
#endif

#define TWO_PI 6.28318530718
#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_choice;


vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    // Use polar coordinates instead of cartesian
    vec2 toCenter = vec2(1.0)-st;
    float angle = atan(toCenter.y,toCenter.x);
    float radius = length(toCenter)*2.0;
    
    //make the image spin
    angle = angle + u_time;

    //nice animation
    float x = st.x - 1.0;   
    
	if(u_choice == 1){
			x = 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), abs(sin(u_time)));
			x = 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), 0.5);
	} else if (u_choice == 2){
			x = 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), abs(sin(u_time)));
	} else if (u_choice == 3){
			x =  1.0 - pow(abs(x), (sin(u_time)));
	} else if (u_choice == 4){
				x =  pow(cos(PI * x / 2.0),(sin(u_time)));
	} else if (u_choice == 5){
				x = pow(min(cos(PI * x / 2.0), 1.0 - x),(sin(u_time)));
	} 

    if( radius < 2.)
        color = hsb2rgb(vec3((angle/(TWO_PI))+0.5 + x,radius,1.0));
    else
        color = vec3(.5);

    gl_FragColor = vec4(color,1.0);
}
