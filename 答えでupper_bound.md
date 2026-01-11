# 答えでupper_bound


intを返すtest()を作っておく必要がある

```cpp

int bs(int x){
    // xについてupper_bound
    int l = -1;
    int r = INF;
    while(l+1 < r){
        int mid = (l+r)/2;
        if(test(mid) > x)r = mid;
        else l = mid;
    }
    return r;
}

```
