/**
 * days 뺄 일 수
 * 기준날자
 */
const holidayArray = [
  {
    dateName: "1월1일",
    locdate: "20240101"
  },
  {
    dateName: "설날",
    locdate: "20240209"
  },
  {
    dateName: "설날",
    locdate: "20240210"
  },
  {
    dateName: "설날",
    locdate: "20240211"
  },
  {
    dateName: "대체공휴일(설날)",
    locdate: "20240212"
  },
  {
    dateName: "삼일절",
    locdate: "20240301"
  },
  {
    dateName: "국회의원선거",
    locdate: "20240410"
  },
  {
    dateName: "어린이날",
    locdate: "20240505"
  },
  {
    dateName: "대체공휴일(어린이날)",
    locdate: "20240506"
  },
  {
    dateName: "부처님오신날",
    locdate: "20240515"
  },
  {
    dateName: "현충일",
    locdate: "20240606"
  },
  {
    dateName: "광복절",
    locdate: "20240815"
  },
  {
    dateName: "추석",
    locdate: "20240916"
  },
  {
    dateName: "추석",
    locdate: "20240917"
  },
  {
    dateName: "추석",
    locdate: "20240918"
  },
  {
    dateName: "개천절",
    locdate: "20241003"
  },
  {
    dateName: "한글날",
    locdate: "20241009"
  },
  {
    dateName: "기독탄신일",
    locdate: "20241225"
  }
]
const calcRefundDate = (days: number, date: Date) => {
  let currentDate = dayjs(date)
  let weekendCount = 0

  while (days !== 0) {
    currentDate = currentDate.subtract(1, "day")

    // 공휴일일 경우 true
    const isHoliday = holidayArray.some((holiday) => {
      const holidayDate = dayjs(holiday.locdate, "YYYYMMDD")
      return holidayDate.isSame(currentDate, "day")
    })

    if (currentDate.day() === 6 || currentDate.day() === 0 || isHoliday) {
      weekendCount++ // 주말 발견
    } else {
      days-- // 주말이 아니면 일수 감소
    }
  }
  // 주말 수만큼 일수 감소
  days -= weekendCount

  return currentDate
}