let vecsub = function(v1,v2){
    let v3 = [];
    for(let i = 0; i < v1.length; i++){
        v3.push(v1[i]-v2[i]);
    }
    return v3;
};

let vecmul = function(v1,k){
    let v2 = [];
    for(let i = 0; i < v1.length; i++){
        v2.push(v1[i]*k);
    }
    return v2;
};
let makearr = function(n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(0);
    }
    return arr;
};

let gaussianElimination = function(arr2d){
    let order = arr2d.length;
    //diagonalize the matrix
    for(let i = 0; i < order-1; i++){
        let r1 = arr2d[i];
        for(let j = i+1; j < order; j++){
            //eliminating ith coefficient
            let r2 = arr2d[j];
            arr2d[j] = vecsub(r2,vecmul(r1,r2[i]/r1[i]));
        }
    }
    let result = makearr(order);
    for(let i = order-1; i >= 0; i--){
        let rn = arr2d[i];
        let r = rn[order];
        for(let j = order-1; j > i; j--){
            r -= rn[j]*result[j];
        }
        
        result[i] = (r/rn[i]);
    }
    return result;
};