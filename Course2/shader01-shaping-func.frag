#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform int u_choice;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
	float x = st.x - 1.0; // fo grom [0,2] to [-1,1]
    float constant = 1.0; // change this to see evolutions
	
	if(u_choice == 1){
			x = 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), abs(sin(u_time)));
			x = 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), 0.5);
	} else if (u_choice == 2){
			x = 1.0 - pow(max(0.0, abs(x) * 2.0 - 1.0), abs(sin(u_time)));
	} else if (u_choice == 3){
			x =  1.0 - pow(abs(x), abs(sin(u_time)));
	} else if (u_choice == 4){
				x =  pow(cos(PI * x / 2.0),abs(sin(u_time)));
	} else if (u_choice == 5){
				x = pow(min(cos(PI * x / 2.0), 1.0 - abs(x)),abs(sin(u_time)));
	} 

    float y = x;

    vec3 color = vec3(y);

    float pct = plot(st, y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
}
