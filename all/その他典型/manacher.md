# manacher   直径と半径


## 最大直径

"abcba"をこれに入れると"a%b%c%b%a"というダミー文字を間に挟んだ状態のものとして考えられる

それぞれの地点を中心とした回文の最大直径の大きさをO(N)で計算する

文字と文字の間も含めてそれぞれの場所を中心とした回文の最大の直径が計算できる 

```
a | b | c | b | a 
1 0 1 0 5 0 1 0 1
```

aaaaの場合 
```
a | a | a | a 
1 2 3 4 3 2 1 
```




    
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
    rep(i,n)res[i]--;
    vector<int> ans;
    for(int i = 1;i < res.size()-1;i++)ans.push_back(res[i]);
    return ans;
}
```

## 最大半径

使い方は同じ

```
a | b | c | b | a 
1 0 1 0 3 0 1 0 1
```

aaaaの場合 
```
a | a | a | a 
1 1 2 2 2 1 1
```


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
    rep(i,n)res[i]--;
    vector<int> ans;
    for(int i = 1;i < res.size()-1;i++)ans.push_back((res[i]+1)/2);
    return ans;
}
```


## 特定の位置を起点とする回文の最大の長さを求める

manacherを使ってそれぞれの最大の長さの回文の始点と中心を求める

始点と中心をpairでを小さい順にソートする

答えを記録する配列を左から見てく

現在見てる位置よりも始点が左にある回文を全て確認してその中で中心が一番右にあるものがそこを始点とした最大の回文の中心となる

適切に計算すればO(NlogN)で計算ができる
