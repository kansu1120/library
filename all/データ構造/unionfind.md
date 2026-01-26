# union find


find：根を求める
connect：繋げる(もともと繋がってたらfalseをreturn)
same：結合か判定
size：そのノードの連結要素数

```cpp

class UnionFind {
public:
	//@brief Union-Findのコンストラクタ
	//@param n ノード数
	UnionFind(int n) : PoS(n, -1) {}

	//@brief 根を求める
	//@param x ノード番号
	//@return xの根のノード番号
	int find(int x) {
		if (PoS[x] < 0) {
			return x;
		}
		return (PoS[x] = find(PoS[x]));
	}

	//@brief 接続かを判定する
	//@param x ノード1
	//@param y ノード2
	bool same(int x, int y) {
		return (find(x) == find(y));
	}

	//@brief 連結要素数を数える
	//@param x ノード番号
	//@return xの連結要素数
	int size(int x) {
		return -PoS[find(x)];
	}

	//@brief 集合を繋げる
	//@param x ノード1
	//@param y ノード2
	//@return 結合が行えたか(既に結合していた:false)
	bool connect(int x, int y) {
		x = find(x);
		y = find(y);
		if (x == y) return false;

		if (-PoS[x] < -PoS[y]) {
			std::swap(x, y);
		}
		PoS[x] += PoS[y];
		PoS[y] = x;
		return true;
	}
private:
	//@brief 親もしくは要素数(Parent or Size)
	std::vector<int> PoS;
};

```
