
export const matchString = function (s: string, p: string) {
    // 构造 dp 函数
    let dp = []
    for (let i = 0; i <= s.length; i++) {
        let child = []
        for (let j = 0; j <= p.length; j++) {
            child.push(false)
        }
        dp.push(child)
    }
    dp[s.length][p.length] = true
    // 执行
    for (let i = p.length - 1; i >= 0; i--) {
        if (p[i] != "*") break
        else dp[s.length][i] = true
    }

    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = p.length - 1; j >= 0; j--) {
            if (s[i] == p[j] || p[j] == "?") {
                dp[i][j] = dp[i + 1][j + 1]
            } else if (p[j] == "*") {
                dp[i][j] = dp[i + 1][j] || dp[i][j + 1]
            } else {
                dp[i][j] = false
            }
        }
    }
    return dp[0][0]
}
