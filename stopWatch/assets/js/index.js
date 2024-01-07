const stopArea = document.querySelector('.isStop'); // 정지 영역 요소 선택
const startArea = document.querySelector('.isStart'); // 시작 영역 요소 선택
const puaseArea = document.querySelector('.isPuase'); // 일시정지 영역 요소 선택
let startTime = 0; // 시작 시간 초기화
let timerId = null; // 타이머 ID 변수를 초기에 null로 설정
let mSec = 0; // 밀리초 변수 초기화
const labArray = new Array(); // 랩 기록을 위한 배열 초기화
let labTime = 0; // 랩 타임 초기화
let beforeLab = 0; // 이전 랩 기록 시간 초기화
const ul = document.querySelector('.lapList'); // 랩 리스트 요소 선택

// 시간을 초:밀리초 형식으로 변환하는 함수
function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const millisecondsPart = (milliseconds % 1000).toString().padStart(3, '0');
  const formattedTime = `${String(seconds).padStart(2, '0')}:${millisecondsPart}`;
  return formattedTime;
}

// 타이머 갱신 함수
timerItem = () => {
  const currentTime = performance.now();
  const elapsedTime = currentTime - startTime;
  mSec = Math.floor(elapsedTime);
  const formattedTime = formatTime(mSec); // 시간 형식화
  document.querySelector('.time').innerHTML = formattedTime; // HTML에 시간 표시
}

// 버튼 클릭 이벤트 처리 함수
const clickBtn = (event) => {
  const target = event.target;

  // 시작 버튼
  if (target && target.classList.contains('startBtn')) {
    startArea.classList.remove('off');
    stopArea.classList.add('off');
    startTime = performance.now(); // 시작 시간 설정
    if (!timerId) {
      timerId = setInterval(timerItem, 1); // 1밀리초마다 타이머 갱신
    };
  }

  // 정지 버튼
  if (target && (target.classList.contains('isStartStopBtn') || target.classList.contains('isPuaseStopBtn'))) {
    clearInterval(timerId); // 타이머 정지
    timerId = null;
    labTime = 0; // 랩 타임 초기화
    beforeLab = 0; // 이전 랩 기록 시간 초기화
    labArray.length = 0; // labArray를 비워줌
    document.querySelector('.time').innerHTML = '00:00';
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild); // 랩 리스트 초기화
    }
    stopArea.classList.remove('off');
    puaseArea.classList.add('off');
    startArea.classList.add('off');
  }

  // 일시정지 버튼
  if (target && target.classList.contains('pauseBtn')) {
    clearInterval(timerId); // 타이머 정지
    timerId = null;
    puaseArea.classList.remove('off');
    startArea.classList.add('off');
  }

  // 다시 시작 버튼
  if (target && target.classList.contains('restartBtn')) {
    startArea.classList.remove('off');
    puaseArea.classList.add('off');
    startTime = performance.now() - mSec; // 일시정지된 시간만큼 뺀 시간부터 시작
    timerId = setInterval(timerItem, 1); // 1밀리초마다 타이머 갱신
  }

  // 랩 버튼
  if (target && target.classList.contains('labBtn')) {
    // 랩 기록 동작
    labArray[labTime] = mSec - beforeLab; // 현재 시간과 이전 랩 기록 시간 차이를 랩 기록 배열에 저장
    beforeLab = mSec; // 현재 시간을 이전 랩 기록 시간으로 저장
    const li = document.createElement('li');
    li.append(labArray[labTime]); // 랩 기록을 리스트에 추가
    ul.append(li);
    if (labArray.length > 1) {
        console.log('1이상')
      const max = Math.max(...labArray); // 랩 배열에서 가장 큰 값 찾기
      const min = Math.min(...labArray); // 랩 배열에서 가장 작은 값 찾기
      const indexOfMax = labArray.indexOf(max); // 가장 큰 값의 인덱스 찾기
      const indexOfMin = labArray.indexOf(min); // 가장 작은 값의 인덱스 찾기

      // 이전에 추가된 클래스 제거
      for (item of ul.children) {
        item.classList.remove('is-faster');
        item.classList.remove('is-slower');
      }

      // 랩 기록 중 가장 빠른 것과 가장 느린 것에 클래스 추가
      ul.querySelector(`li:nth-child(${indexOfMax + 1})`).classList.add('is-faster');
      ul.querySelector(`li:nth-child(${indexOfMin + 1})`).classList.add('is-slower');
    }
    labTime++; // 랩 타임 증가
  }
}

// 버튼 영역에 클릭 이벤트 추가
document.getElementById('btnWrap').addEventListener('click', clickBtn);