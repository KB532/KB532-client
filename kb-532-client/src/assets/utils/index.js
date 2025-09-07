// 숫자 3자리마다 콤마(,)를 붙여줌
export function numberWithCommas(x) {
  if (typeof x !== "number" && typeof x !== "string") return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
