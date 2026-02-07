# zアルゴリズム

文字列Sのそれぞれの位置についてそこから後ろの文字列とSとの最長共通接頭辞の長さをO(N)で計算できる

Z(S)でvector<int> のリターン


## 単体比較
```cpp
vector<int> z(string s){
    int n = s.size();
    vector<int> ans(n);
    int l=0,r=0;
    ans[0] = n;
    for(int i = 1;i < n;i++){
        if(i > r){
            int J = 0;
            int j = i;
            while(j < n && J < n && s[J] == s[j]){
                J++;
                j++;
            }
            ans[i] = J;
            r = j-1;
            l = i;
        }
        else{
            int j = min(i+ans[i-l],r);
            int J = j-i;
            while(j < n && J < n && s[J] == s[j]){
                J++;
                j++;
            }
            ans[i] = J;
            if(r < j-1){
                r = j-1;
                l = i;
            }            
        }
    }
    return ans;
}

```
## 複数比較

```cpp
vector<int> z(string s,string t){
    // tのそれぞれについて計算される
    int S = s.size();
    s = s +"#"+t;
    int n = s.size();
    vector<int> ans(n);
    int l=0,r=0;
    ans[0] = n;
    for(int i = 1;i < n;i++){
        if(i > r){
            int J = 0;
            int j = i;
            while(j < n && J < n && s[J] == s[j]){
                J++;
                j++;
            }
            ans[i] = J;
            r = j-1;
            l = i;
        }
        else{
            int j = min(i+ans[i-l],r);
            int J = j-i;
            while(j < n && J < n && s[J] == s[j]){
                J++;
                j++;
            }
            ans[i] = J;
            if(r < j-1){
                r = j-1;
                l = i;
            }            
        }
    }
    vector<int> res;
    for(int i = S+1;i < ans.size();i++){
        res.push_back(ans[i]);
    }
    return res;
}
```
