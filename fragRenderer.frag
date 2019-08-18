struct line
{
  vec2 p1;
  vec2 p2;
};

float drawLine( line l ) {
  vec2 uv = gl_FragCoord.xy / r.xy;

  float a = abs(distance(l.p1, uv));
  float b = abs(distance(l.p2, uv));
  float c = abs(distance(l.p1, l.p2));

  if ( a >= c || b >=  c ) return 0.0;

  float p = (a + b + c) * 0.5;

  // median to (p1, p2) vector
  float h = 2. / c * sqrt( p * ( p - a) * ( p - b) * ( p - c));

  return mix(1.0, 0.0, smoothstep(0.0 * Thickness, 1.5 * Thickness, h));
}

void rotate2d( inout vec2 p, float theta ) {
  vec2 column0 = vec2(cos(theta), -sin(theta));
  vec2 column1 = vec2(sin(theta), cos(theta));
  mat2 rotationMatrix = mat2(column0, column1);
  p = p * rotationMatrix;
}

void translate2d( inout vec2 p, float x, float y ) {
 	p[0] += x;
    p[1] += y;
}

void translateLine2d( inout line l, float x, float y ) {
	translate2d( l.p1, x, y);
    translate2d( l.p2, x, y);
}
    

void rotateLine2d( inout line l, float theta ) {
  rotate2d(l.p1, theta);
  rotate2d(l.p2, theta);
  return;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ){
	vec3 c;
	line l1 = line(vec2(0.1, 0.1), vec2(0.9, 0.9));
  line l2 = line(vec2(0.9, 0.1), vec2(0.1, 0.9));
  
  translateLine2d(l1, -0.5, -0.5);
  translateLine2d(l2, -0.5, -0.5);

  rotateLine2d(l2, sin(t));
  rotateLine2d(l1, cos(t));

  c[1] = drawLine(l1);
  c[1] += drawLine(l2);

	fragColor=vec4(c, 1.0);
}