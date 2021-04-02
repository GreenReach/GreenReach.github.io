
#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aPosition;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);

  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  
  // Send the vertex information on to the fragment shader
  // this is done automatically, as long as you put it into the built in shader function “gl_Position”
  gl_Position = positionVec4;
}
