import dayjs, { Dayjs } from 'dayjs';

// 함수의 매개변수 타입 정의
type ScheduleItemParams = {
    scheduleTime: string | Dayjs;
    scheduleFn: () => void;
    startDate?: string | Dayjs;
    startFn?: () => void;
};

const scheduleItem = ({
    scheduleTime,
    scheduleFn,
    startDate = null,
    startFn = null,
}: ScheduleItemParams) => {
    // 현재 시간
    const now = dayjs();
    // 시간 값을 dayjs 객체로 변환
    const scheduleDateTime = dayjs(scheduleTime);
    const startDateTime = startDate ? dayjs(startDate) : null;

    // startDate와 startFn이 제공되었는지 확인
    if (startDateTime && startFn && now.isAfter(startDateTime)) {
        startFn();
    }

    if (now.isBefore(scheduleDateTime)) {
        // 현재 시간이 스케줄 시간보다 이전인 경우, 일정 시간 후에 이벤트를 발생
        setTimeout(
            () => {
                scheduleFn();
            },
            scheduleDateTime.diff(now, "second") * 1000 // 스케줄 시간까지의 초 단위 시간 계산
        );
    } else {
        scheduleFn();
    }
};