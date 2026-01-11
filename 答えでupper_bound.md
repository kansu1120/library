# 答えでupper_bound

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
