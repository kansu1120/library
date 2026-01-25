#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>
#include <cmath>
#include <emscripten.h>

// シンプルなスコアリング関数の例
// この例では、複数のテストケースファイルを読み込んで、
// 各テストケースの正解率を計算し、総合スコアを返す

struct TestCase {
    std::string input;
    std::string expected_output;
    std::string user_output;
};

// ユーザーが提出したファイルを解析
// 注: この実装はテキストファイル形式を想定しています
// ZIP形式のサポートは将来の拡張として検討可能
std::vector<TestCase> parseTestCases(const std::string& testContent) {
    std::vector<TestCase> testcases;
    std::istringstream iss(testContent);
    std::string line;
    
    TestCase tc;
    int state = 0; // 0: input, 1: expected, 2: user_output
    
    while (std::getline(iss, line)) {
        if (line.find("INPUT:") == 0) {
            if (state > 0) {
                testcases.push_back(tc);
                tc = TestCase();
            }
            state = 0;
        } else if (line.find("EXPECTED:") == 0) {
            state = 1;
        } else if (line.find("OUTPUT:") == 0) {
            state = 2;
        } else {
            if (state == 0) tc.input += line + "\n";
            else if (state == 1) tc.expected_output += line + "\n";
            else if (state == 2) tc.user_output += line + "\n";
        }
    }
    
    if (!tc.input.empty()) {
        testcases.push_back(tc);
    }
    
    return testcases;
}

// スコア計算関数
double calculateScore(const std::vector<TestCase>& testcases) {
    if (testcases.empty()) return 0.0;
    
    int correct = 0;
    for (const auto& tc : testcases) {
        // 出力を比較（空白やトリミングを考慮）
        std::string expected = tc.expected_output;
        std::string output = tc.user_output;
        
        // 末尾の改行を削除
        while (!expected.empty() && (expected.back() == '\n' || expected.back() == '\r')) {
            expected.pop_back();
        }
        while (!output.empty() && (output.back() == '\n' || output.back() == '\r')) {
            output.pop_back();
        }
        
        if (expected == output) {
            correct++;
        }
    }
    
    return (double)correct / testcases.size() * 100.0;
}

extern "C" {
    // JavaScriptから呼び出されるメイン関数
    EMSCRIPTEN_KEEPALIVE
    double computeScore(const char* testData, int dataLength) {
        std::string content(testData, dataLength);
        auto testcases = parseTestCases(content);
        return calculateScore(testcases);
    }
    
    EMSCRIPTEN_KEEPALIVE
    const char* getContestInfo() {
        return "Example Contest - Simple Test Case Scorer";
    }
}
