class Dot{
    constructor(x, y, d, l, lr, lc){
      this.centerX = x;
      this.centerY = y;
      this.diameter = d;
      this.layer = l;
      this.layerRow = lr;
      this.layerColumn = lc;
      print(l,lc,lr);
      fill(layersColors[l][lc][lr]);
      circle(x,y,d);
    }
    
    expand() {
      let distance = this.diameter/4;
      let newDiameter = this.diameter/2;
      let layerDotsLenght = Math.pow(2, this.layer);
      
      
      let cx1 = this.centerX - distance; 
      let cy1 = this.centerY - distance; 
      let lr1 = 2 * this.layerRow;
      let lc1 = 2 * this.layerColumn;
        
      let cx2 = this.centerX + distance; 
      let cy2 = this.centerY - distance; 
      let lr2 = 2 * this.layerRow + 1;
      let lc2 = 2 * this.layerColumn;
      
      let cx3 = this.centerX + distance; 
      let cy3 = this.centerY + distance; 
      let lr3 = 2 * this.layerRow + 1;
      let lc3 = 2 * this.layerColumn + 1;
      
      let cx4 = this.centerX - distance; 
      let cy4 = this.centerY + distance; 
      let lr4 = 2 * this.layerRow;
      let lc4 = 2 * this.layerColumn + 1;
      
      fill(color(255,255,255));
      square(this.centerX-this.diameter/2,this.centerY-this.diameter/2, this.diameter);
      let d1 = new Dot(cx1, cy1, newDiameter, this.layer + 1, lr1, lc1);
      let d2 = new Dot(cx2, cy2, newDiameter, this.layer + 1, lr2, lc2);
      let d3 = new Dot(cx3, cy3, newDiameter, this.layer + 1, lr3, lc3);
      let d4 = new Dot(cx4, cy4, newDiameter, this.layer + 1, lr4, lc4);
      
      return [d1,d2,d3,d4];
    }
    
    checkHover(x,y){
      if(dist(this.centerX,this.centerY,x,y) <= this.diameter/2)
        return true;
      return false;
    }
  }