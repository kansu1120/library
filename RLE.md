#ラングレス圧縮
string を入力
int char の　pair の vector でリターン
aaab ->  4 a , 1 b

```cpp
vector<pair<int,char>> r(string s){
    vector<pair<int,char>> ans;
    vector<bool> visited(s.size(),false);
    for(int i = 0;i < s.size();i++){
        if(visited[i])continue;
        int cnt = 0;
        for(int j = i;j < s.size();j++){
            if(s[j]==s[i]){
                i = j;
                cnt++;
            }
            else break;
        }
        ans.push_back({cnt,s[i]});
    } 
    return ans;
}
```
