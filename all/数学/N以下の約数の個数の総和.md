# N以下の約数の個数の総和を求める

cnt(N,mod)  N以下の約数の個数の総和

答えがデカくなることがあるのでmodであまりをとった結果が返ってくる

計算量O(√N)


```cpp
long long cnt(long long n,long long mod){
    long long ans = 0;
    long long y = n;
    long long hidari = 0;
    while(y!=0){
        long long migi = n/y;
        ans += ((migi - hidari)%mod)*(y%mod);
        ans %= mod;
        y = n/(migi+1);
        hidari = migi;
    }
    return ans;
}
```

