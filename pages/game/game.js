Page({
    data: {
        userInfo: {},
        showDiceTemplateArray: [], // 用于存储显示哪些骰子模版
        showDiceArray: [0, 1, 2], // 用于存储随机数
        gaming: false //判断是否在游戏中
    },
    getUserInfo: function() {
        return wx.getStorageSync('userInfo');
    },
    setUserScore: function(score) {
        this.setData({
            userInfo: {
                name: this.data.userInfo.name,
                score: this.data.userInfo.score + score
            }
        });
        wx.setStorageSync('userInfo', this.data.userInfo)
    },
    // 判断显示隐藏
    isHidden: function() {
        var templateNameArray = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
        var showDiceArrayTemp = [];
        this.data.showDiceArray.forEach(function(item) {
            showDiceArrayTemp.push(templateNameArray[item]);
        });
        this.setData({
            showDiceTemplateArray: showDiceArrayTemp
        });
    },
    // 返回随机数
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 游戏开始,骰子变化
    changeDice: function(event) {
        var that = this;
        if (that.data.gaming) {
            return;
        }
        // 设置正在游戏中
        that.setData({
            gaming: true
        });
        var t1 = setInterval(function() {
            that.data.showDiceArray = [that.getRandomInt(0, 5), that.getRandomInt(0, 5), that.getRandomInt(0, 5)];
            that.isHidden();
        }, 100);
        var t2 = setTimeout(function() {
            clearInterval(t1);
            that.calculateResult(event.currentTarget.dataset.type);
            // 设置没在游戏
            that.setData({
                gaming: false
            });
        }, 2000);
    },
    // 计算猜测结果
    calculateResult: function(userGuess) {
        var rule = {
            'big': function(sum) {
                return sum > 11 && sum < 17;
            },
            'small': function(sum) {
                return sum > 4 && sum < 10;
            }
        }
        var that = this;
        var sum = 3;
        // 豹子
        if (that.data.showDiceArray[0] == that.data.showDiceArray[1] && that.data.showDiceArray[1] == that.data.showDiceArray[2]) {
            if (userGuess == 'leopard') {
                that.setUserScore(24 * 100);
                return;
            }
        }
        // 选了豹子没中
        if (userGuess == 'leopard') {
            that.setUserScore(-100);
            return;
        }
        for (let i = 0; i < that.data.showDiceArray.length; i++) {
            sum += that.data.showDiceArray[i];
        }
        if (rule[userGuess](sum)) {
            console.log(userGuess);
            that.setUserScore(100);
        } else {
            that.setUserScore(-100);
        }
    },
    onLoad: function() {
        var that = this;
        that.setData({
            userInfo: this.getUserInfo()
        });
        that.isHidden();
    }
})
