# 이슈사항
setInterval의 경우 setInterval(function, 1)로 실행시킬 경우 1밀리초마다 실행 될 것 같지만 실제 사용에 20~40ms정도의 딜레이가 있다.
그리고 setInterval안의 function의 실행시간도 있기 때문에 정확한 시간값을 가져올 수 없었다.
그래서 스톱워치의 경우 밀리초단위를 입력시키려면 현재의 시간을 가져와 다음 실행시간의 차를 구하는 방법이 좋다.
\\\
  // 초기 코드
  let mSec=0
  setInterval(()=>{
    mSec++
  }, 1)
  // 정확한 시간을 가져올 수 있는 코드
  let startTime=0,mSec=0
  setInterval(()=>{
    const currentTime = performance.new()
    const elapsedTime = currentTime - startTime;
    mSec = Math.floor(elapsedTime);
  },1)
\\\

그것말고도 clearInterval()이 동작하지 않았는데
if문을 통하여 setInterval을 담은 변수가 비어있을 때 setInterval을 담아 실행시켜주고 
clearInterval로 중지시킨 후 setInterval이 담긴 변수를 비워줬더니 정상 작동 하였다.

\\\
  // 실행 시
  if (!timerId) {
    timerId = setInterval(timerItem, 1); // 1밀리초마다 타이머 갱신
  };

  // 중지 시
  clearInterval(timerId); // 타이머 정지
  timerId = null;
\\\

스톱워치 같은 경우에는 초기화의 중요성을 많이 느꼈다.
