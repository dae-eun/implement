// DOM 요소들을 변수에 할당
const elements = {
  stopArea: document.querySelector('.isStop'), // 정지 영역 요소 선택
  startArea: document.querySelector('.isStart'), // 시작 영역 요소 선택
  pauseArea: document.querySelector('.isPuase'), // 일시정지 영역 요소 선택
  timeDisplay: document.querySelector('.time'), // 시간 표시 요소 선택
  lapList: document.querySelector('.lapList'), // 랩 리스트 요소 선택
  buttonWrap: document.getElementById('btnWrap') // 버튼 영역 요소 선택
};

// 타이머와 랩 기록을 관리하는 객체
const timer = {
  startTime: 0, // 시작 시간 초기화
  timerId: null, // 타이머 ID 변수를 초기에 null로 설정
  mSec: 0, // 밀리초 변수 초기화
  labArray: [], // 랩 기록을 위한 배열 초기화
  labTime: 0, // 랩 타임 초기화
  beforeLab: 0 // 이전 랩 기록 시간 초기화
};

// 시간을 초:밀리초 형식으로 변환하는 함수
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');
  const formattedTime = `${String(seconds).padStart(2, '0')}:${millisecondsPart}`;
  return formattedTime;
}

// 타이머 갱신 함수
function updateTimer() {
  const currentTime = performance.now();
  const elapsedTime = currentTime - timer.startTime;
  timer.mSec = Math.floor(elapsedTime);
  const formattedTime = formatTime(timer.mSec);
  elements.timeDisplay.innerHTML = formattedTime;
}

// 버튼 클릭 이벤트 처리 함수
function handleClick(event) {
  const target = event.target;

  // 시작 버튼
  if (target && target.classList.contains('startBtn')) {
    while (elements.lapList.firstChild) {
      elements.lapList.removeChild(elements.lapList.firstChild);
    }
    elements.timeDisplay.innerHTML = '00:00';
    elements.startArea.classList.remove('off');
    elements.stopArea.classList.add('off');
    timer.startTime = performance.now();
    if (!timer.timerId) {
      timer.timerId = setInterval(updateTimer, 1);
    }
  }

  // 정지 버튼
  if (target && (target.classList.contains('isStartStopBtn') || target.classList.contains('isPuaseStopBtn'))) {
    clearInterval(timer.timerId);
    timer.timerId = null;
    timer.labTime = 0;
    timer.beforeLab = 0;
    timer.labArray.length = 0;
    elements.stopArea.classList.remove('off');
    elements.pauseArea.classList.add('off');
    elements.startArea.classList.add('off');
  }

  // 일시정지 버튼
  if (target && target.classList.contains('pauseBtn')) {
    clearInterval(timer.timerId);
    timer.timerId = null;
    elements.pauseArea.classList.remove('off');
    elements.startArea.classList.add('off');
  }

  // 다시 시작 버튼
  if (target && target.classList.contains('restartBtn')) {
    elements.startArea.classList.remove('off');
    elements.pauseArea.classList.add('off');
    timer.startTime = performance.now() - timer.mSec;
    timer.timerId = setInterval(updateTimer, 1);
  }

  // 랩 버튼
  if (target && target.classList.contains('labBtn')) {
    timer.labArray[timer.labTime] = timer.mSec - timer.beforeLab;
    timer.beforeLab = timer.mSec;
    const li = document.createElement('li');
    li.append(timer.labArray[timer.labTime]);
    elements.lapList.append(li);
    if (timer.labArray.length > 1) {
      const max = Math.max(...timer.labArray);
      const min = Math.min(...timer.labArray);
      const indexOfMax = timer.labArray.indexOf(max);
      const indexOfMin = timer.labArray.indexOf(min);

      for (let item of elements.lapList.children) {
        item.classList.remove('is-faster');
        item.classList.remove('is-slower');
      }

      elements.lapList.querySelector(`li:nth-child(${indexOfMax + 1})`).classList.add('is-faster');
      elements.lapList.querySelector(`li:nth-child(${indexOfMin + 1})`).classList.add('is-slower');
    }
    timer.labTime++;
  }
}

elements.buttonWrap.addEventListener('click', handleClick);