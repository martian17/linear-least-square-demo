let LLS = function(points){
    //Σ2(-xnyn+mxn^2+bxn)
    //Σ2(-yn+mxn+b)
    let c1=c2=c3=c4=c5=c6=0;
    for(let i = 0; i < points.length; i++){
        let {x,y} = points[i];
        c1 -= x*y;
        c2 += x*x;
        c3 += x;
        
        c4 -= y;
        c5 += x;
        c6 += 1;
    }
    [c1,c2,c3,c4,c5,c6] = [c1,c2,c3,c4,c5,c6].map(n=>n*2);
    //c1+c2m+c3b = 0
    //c4+c5m+c6b = 0
    
    //first eliminate m2
    //ignore edge cases first, see where it leads us
    let [m,b] = gaussianElimination([[c2,c3,-c1],[c5,c6,-c4]]);
    console.log(m,b);
    return {m,b};
};

let generatePoints = function(fn,min,max,r,n){
    let arr = [];
    for(let i = 0; i < n; i++){
        let x = Math.random()*(max-min)+min;
        let y = fn(x)+(Math.random()*2-1)*r;
        arr.push({x,y});
    }
    return arr;
};


let main = async function(){
    let body = new ELEM(document.body);
    let canvas = body.add("canvas").e;
    let [w,h] = [canvas.width,canvas.height] = [500,500];
    let ctx = canvas.getContext("2d");
    //generate random points that follows a function
    
    let fn3 = x=>0.000008*x**3-0.0028*x**2+0.02*x+100;
    let fn1 = x=>0.5*x+200;
    
    let points = generatePoints(fn1,0,500,30,200);
    points.map(({x,y})=>{
        ctx.beginPath();
        ctx.arc(x,h-y,3,0,6.28);
        ctx.fill();
        ctx.closePath();
    });
    let {m,b} = LLS(points);
    ctx.beginPath();
    let fnapprox = x=>m*x+b;
    for(let i = 0; i < w; i++){
        ctx.lineTo(i,h-fnapprox(i));
    }
    ctx.stroke();
};

main();

