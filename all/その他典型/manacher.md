# manacher

**使い方**

"abcba"をこれに入れると"a%b%c%b%a"というダミー文字を間に挟んだ状態のものとして考えられる

それぞれの地点を中心とした回文の最大半径の大きさをO(N)で計算する

a | b | c | b | a

文字と文字の間も含めてそれぞれの場所を中心とした回文の最大の半径が計算できる

    
```cpp
vector<int> mana(string s){
    int n = s.size();
    string t = "%";
    rep(i,n){
        t += s[i];
        t += "%";
    }
    n = t.size();
    swap(s,t);
    vector<int> res(n,0);
    int y = -1;
    int x = -1;
    for(int i = 0;i < n;i++){
        int l = i,r = i;
        if(y >= i){
            int t = x*2 - i;
            r = min(y,i+res[t]-1);
            l -=  r-i;
        }
        while(l >= 0 && r < n && s[l]==s[r]){
            if(y < r){
                y = r;
                x = i;
            }
            l--;
            r++;
        }
        res[i] = r  - i;
    }
    return res;
}
```
