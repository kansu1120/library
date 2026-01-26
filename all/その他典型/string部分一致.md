# string部分一致確認


```cpp

bool same(string& s,string& t,int x){
    // sのx文字目からがtと一致するならtrue
    int j = 0;
    for(int i = x;i < x+t.size();i++){
        if(i >= s.size())return false;
        if(j >= t.size())return false;
        if(s[i]!=t[j]){
            return false;
        }
        j++;
    }
    return true;
}

```
