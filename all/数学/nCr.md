# nCrを計算する

## rを固定してnをr+xにしたときのそれぞれのxに対するnCrを計算しておく

xrCr(xの最大値,rの値)　でACLのmodntで答えが返ってくる

計算量はO(N)

```
vector<modint998244353> xrCr(int x_max,int r){
    vector<modint998244353> res(x_max+1);
    res[0] = 1;
    for(int i = 1;i <= x_max;i++){
        res[i] = res[i-1] * (r+i) / (i);
    }
    return res;
}
```
