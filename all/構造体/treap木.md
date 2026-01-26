# treap木

insert

find

erase


ができる


```cpp

class trp{
    struct node{
        int key;
        int priority;
        node* left;
        node* right;
        node(int k,int p){
            key = k;
            priority = p;
            left = nullptr;
            right = nullptr;
        }
    };

    node* root;


    bool find(node* t,int x){
        if(t == nullptr)return false;
        if(t -> key == x)return true;
        if(x < t->key)return find(t->left,x);
        else return find(t->right,x);
    }
    node* merge(node* l,node* r){
        if(l == nullptr)return r;
        if(r == nullptr)return l;
        if(l->priority > r->priority){
            l-> right = merge(l->right,r);
            return l;
        }
        else{
            r->left = merge(l,r->left);
            return r;
        }
    }
    pair<node*,node*> split(node* t,int x){
        if(t==nullptr)return {nullptr,nullptr};
        if(x <= t->key){
            pair<node*,node*> p = split(t->left,x);
            t -> left = p.second;
            return {p.first,t};
        }
        else{
            pair<node*,node*> p = split(t->right,x);
            t -> right = p.first;
            return {t,p.second};            
        }
    }

    public : 
    trp(){
        root = nullptr;
    }
    bool find(int x){
        return find(root,x);
    }
    void insert(int x){
        if(find(x))return;
        pair<node*,node*> p = split(root,x);
        node* r = p.second;
        node* l = p.first;
        node* n = new node(x,rand());
        root = merge(merge(l,n),r);
    }
    void erase(int x){
        if(!find(x))return ;
        pair<node*,node*> a = split(root,x);
        pair<node*,node*> b = split(a.second,x+1);
        root = merge(a.first,b.second);
    }
};

```
