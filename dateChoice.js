var app = getApp()
Page({
  data: {
    date: [],
    weeks: [],
    dayCount: 1,
    dayCount2: "共1晚",
    festival: {
      "101": "元旦",
      "214": "情人节",
      "308": "妇女节",
      "312": "植树节",
      "315": "消费者权益日",
      "401": "愚人节",
      "405": "清明节",
      "501": "劳动节",
      "504": "青年节",
      "512": "护士节",
      "601": "儿童节",
      "701": "建党节",
      "801": "建军节",
      "910": "教师节",
      "928": "孔子诞辰",
      "1001": "国庆节",
      "1006": "老人节",
      "1024": "联合国日",
      "1224": "平安夜",
      "1225": "圣诞节"
    },
    haveOrder: [],
    dateFlag: {
    },
    choice: true,
    today: 0,
    choiceDate: [],
    dateShow: false,
    choiceDateArr: [],
    tomorrow: 0
  },
  onLoad: function (options) {
     this.dateData()
  },
  changeType: function () {
    var show = this.data.dateShow
    if (show) {
      this.setData({
        dateShow: false
      })
    } else {
      this.setData({
        dateShow: true
      })
    }
  },
  dateData: function () {
    let dataAll = []//总日历数据
    let dataAll2 = []//总日历数据
    let dataMonth = []//月日历数据
    let date = new Date//当前日期
    let getDateTime = date.getTime()
    let year = date.getFullYear()//当前年
    let week = date.getDay();//当天星期几
    let weeks = []
    let month = date.getMonth() + 1//当前月份
    let day = date.getDate()//当天
    let daysCount = 150//一共显示多少天
    let dayscNow = 0 //计数器
    let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]//月份列表
    let nowMonthList = []//本年剩余年份
    this.setData({
      today: year + month + day,
      tomorrow: year + month + day + 1
    })

    for (let i = month; i < 13; i++) {
      nowMonthList.push(i)
    }
    let yearList = [year]//年份最大可能
    for (let i = 0; i < daysCount / 365 + 2; i++) {
      yearList.push(year + i + 1)
    }
    let leapYear = function (Year) {//判断是否闰年 
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
        return (true);
      } else { return (false); }
    }
    for (let i = 0; i < yearList.length; i++) {//遍历年
      let mList
      if (yearList[i] == year) {//判断当前年份
        mList = nowMonthList
      } else {
        mList = monthList
      }
      for (let j = 0; j < mList.length; j++) {//循环月份
        dataMonth = []
        let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        let t_days_thisYear = []
        if (yearList[i] == year) {
          for (let m = 0; m < nowMonthList.length; m++) {
            t_days_thisYear.push(t_days[mList[m] - 1])
          }
          t_days = t_days_thisYear
        } else {
          t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }


        for (let k = 0; k < t_days[j]; k++) {//循环每天
          dayscNow++
          let nowData
          if (dayscNow < daysCount) {//如果计数器没满
            let days = k + 1
            if (days < 10) {
              days = "0" + days
            }

            var monthAndDay = mList[j] + "" + days
            var dateString = yearList[i] + "-" + mList[j] + "-" + days

            var subject = this.data.festival[monthAndDay]
            var none = false
            let newDateFormate = new Date(yearList[i] + "/" + mList[j] + "/" + (k + 1))
            let thisDateTime = newDateFormate.getTime()
            var selected = 0
            if (yearList[i] == year && mList[j] == month) {//判断当年当月
              if (k + 1 >= day) {
                nowData = {
                  year: yearList[i],
                  month: mList[j],
                  act: {
                    subject,
                    none,
                    tip: '',
                    defaultStr: 0
                  },
                  day: k + 1,
                  date: yearList[i] + "" + mList[j] + days,
                  selected,
                  re: yearList[i] + "-" + mList[j] + "-" + days,
                  dateTime: thisDateTime
                }
                dataMonth.push(nowData)
                if (k + 1 == day) {
                  let date = new Date(yearList[i] + "/" + mList[j] + "/" + (k + 1))
                  let weekss = date.getDay()//获取每个月第一天是周几
                  weeks.push(weekss)
                }
              }
            } else {//其他情况
              nowData = {//组装自己需要的数据
                year: yearList[i],
                month: mList[j],
                act: {
                  subject,
                  none,
                  tip: '',
                  defaultStr: 0
                },
                day: k + 1,
                date: yearList[i] + "" + mList[j] + days,
                selected,
                re: yearList[i] + "-" + mList[j] + "-" + days,
                dateTime: thisDateTime
              }
              dataMonth.push(nowData)
              if (k == 0) {
                let date = new Date(yearList[i] + "/" + mList[j] + "/" + (k + 1))
                let weekss = date.getDay()//获取每个月第一天是周几
                weeks.push(weekss)
              }
            }
          } else {
            break
          }
        }
        dataAll.push(dataMonth)
      }
    }
    for (let i = 0; i < dataAll.length; i++) {
      if (dataAll[i].length != 0) {
        dataAll2.push(dataAll[i]);
      }
    }
    dataAll2[0][0].selected = 1
    dataAll2[0][0].act.tip = "入住"
    dataAll2[0][0].act.defaultStr = 1
    this.data.choiceDate.push(dataAll2[0][0])
    if (dataAll2[0][1]) {
      dataAll2[0][1].selected = 1
      dataAll2[0][1].act.tip = "离店"
      dataAll2[0][1].act.defaultStr = 1
      this.data.choiceDate.push(dataAll2[0][1])
    } else {
      dataAll2[1][0].selected = 1
      dataAll2[1][0].act.tip = "离店"
      dataAll2[1][0].act.defaultStr = 1
      this.data.choiceDate.push(dataAll2[1][0])
    }

    this.setData({
      date: dataAll2,
      weeks: weeks,
      choiceDate: this.data.choiceDate,
      choiceDateArr: this.data.choiceDate
    })
  },
  selectday: function (e) {
    var indexs = e.currentTarget.dataset.indexs
    var index = e.currentTarget.dataset.index
    if (indexs == -1) {
      return
    }
    this.data.date[index][indexs].selected = 1
    this.data.date[index][indexs].act.tip = "入住"
    if (this.data.dateFlag.date && this.data.date[index][indexs].dateTime < this.data.dateFlag.date.dateTime) {
      var flagIndex = this.data.dateFlag.index
      var flagIndexs = this.data.dateFlag.indexs
      this.data.date[flagIndex][flagIndexs].selected = 0
      this.data.date[flagIndex][flagIndexs].act.tip = ""
      this.setData({
        dateFlag: {
          date: this.data.date[index][indexs],
          index: index,
          indexs: indexs
        },
        choice: false,
        dayCount: 1
      })

    } else if (this.data.dateFlag && this.data.dateFlag.date) {
      if (this.data.dateFlag.index == index && this.data.dateFlag.indexs == indexs) {
        return
      }
      this.data.date[index][indexs].act.tip = "离店"

      var that = this
      var dateFlagDateTime = that.data.dateFlag.date.dateTime
      var choiceDateTime = that.data.date[index][indexs].dateTime
      that.data.choiceDateArr = []
      that.data.choiceDateArr.push(that.data.dateFlag.date)
      var nonFlag = false
      var nonArr = []
      var count = 0
      this.data.date.forEach(function (dataItems) {
        dataItems.forEach(function (dataItem) {
          if (dataItem.dateTime > dateFlagDateTime && dataItem.dateTime < choiceDateTime) {
            if (dataItem.act.none) {
              nonFlag = true
              nonArr.push(dataItem.day)
            }
            that.data.choiceDateArr.push(dataItem)
            dataItem.selected = 1
            count++
          }
        })
      })
      that.data.choiceDateArr.push(that.data.date[index][indexs])
      if (nonFlag) {
        var that = this
        this.data.date.forEach(function (dataItems) {
          dataItems.forEach(function (dataItem) {
            if (dataItem.dateTime != choiceDateTime) {
              dataItem.act.tip = ""
              dataItem.selected = 0
            } else {
              dataItem.act.tip = "入住"
            }
          })
        })
        this.setData({
          dateFlag: {
            date: that.data.date[index][indexs],
            index: index,
            indexs: indexs
          },
          dayCount: 1
        })
        var nonstr = ""
        nonArr.forEach(function (nonitem, index) {

          if (index != nonArr.length - 1) {
            nonstr = nonstr + nonitem + "号,"
          } else {
            nonstr = nonstr + nonitem + "号"
          }
        })
        wx.showModal({
          title: '提示',
          content: `${nonstr}无房`,
        })
      } else {
        this.setData({
          dateFlag: {},
          choice: true,
          dayCount: "共" + (count + 1) + "晚"
        })
      }
    } else {
      var that = this
      this.data.date.forEach(function (dataItems) {
        dataItems.forEach(function (dataItem) {
          dataItem.act.defaultStr = 0
          if (dataItem.dateTime != that.data.date[index][indexs].dateTime) {
            dataItem.selected = 0
            dataItem.act.tip = ""
          } else {
            dataItem.act.tip = "入住"
          }

        })
      })

      this.setData({
        dateFlag: {
          date: this.data.date[index][indexs],
          index: index,
          indexs: indexs
        },
        choice: false,
        dayCount: 1
      })
    }

    this.setData({
      date: this.data.date,
      choiceDate: this.data.choiceDate
    })
  },
  submitbtn: function () {
    var dayCount = this.data.dayCount
    if (dayCount == 1) {
      dayCount = "共1晚"
    }
    this.setData({
      dateShow: false,
      choiceDate: this.data.choiceDateArr,
      dayCount2: dayCount
    })
  }
})