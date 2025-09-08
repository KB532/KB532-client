// 아주 간단한 전역 스토어 (Pinia 없이)
import { reactive } from 'vue'

export const goals = reactive([
  { label: '필수', value: 50, color: '#4C80F1' },
  { label: '선택', value: 30, color: '#F16E5B' },
  { label: '저축', value: 20, color: '#FF9F43' },
])

export function setGoals([essential, optional, saving]) {
  const next = [
    { label: '필수', value: Number(essential) || 0, color: '#4C80F1' },
    { label: '선택', value: Number(optional)  || 0, color: '#F16E5B' },
    { label: '저축', value: Number(saving)    || 0, color: '#FF9F43' },
  ]
  goals.splice(0, goals.length, ...next) // 같은 참조 유지
}
