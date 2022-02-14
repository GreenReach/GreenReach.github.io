#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;

float map(float value, float min1, float max1, float min2, float max2) {
  return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}

int ComputePixelValue(vec2 st)
{
    int maxIter = 100;
    float R = 2.0;
    float cx = -0.4, cy = 0.6;
    float x = map(st.x, 0.0 ,2.0, -R, R);
    float y = map(st.y, 0.0 ,2.0, -R, R);
  
    //int iteration = 0;
    for(int iteration = 0; iteration < 100; iteration++)
    {
        float xtemp = x*x - y*y;
        y = 2.0*x*y + cy;
        x = xtemp + cx;
        if(x*x + y*y >= R*R )
            return iteration;
    }
    return maxIter;
    /*
    let hue = int(255 * iteration / maxIter);
    let sat = 255;
    let bright =255;
    if(iteration == maxIter)
        bright = 0;
    
    stroke(hue,sat,bright);
    point(xInit,yInit);
    */
}


void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    //st = (st)/ u_time;
    float c = float(ComputePixelValue(st))/ 100.0;
	gl_FragColor = vec4(vec3(c), 1.0);
}

