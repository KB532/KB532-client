// 숫자 3자리마다 콤마(,)를 붙여줌
export function numberWithCommas(x) {
  if (typeof x !== "number" && typeof x !== "string") return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 밀리초 제거
export function formatDateTimeLocal(date) {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';

  const pad = (n) => String(n).padStart(2, '0');

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

