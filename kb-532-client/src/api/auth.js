// src/api/auth.js
import axios from 'axios'

// 하이픈/포맷 유틸 (숫자만 입력했어도 서버 예시처럼 하이픈 넣어줌)
const onlyDigits = (s = '') => String(s).replace(/\D/g, '')

export const toResidentNum = (rrn) => {
  const d = onlyDigits(rrn)
  // 6-1 형태(예시: 970422-2) 또는 6-7(표준 13자리) 모두 지원
  if (d.length <= 7) return d.replace(/^(\d{6})(\d)/, '$1-$2')
  return d.replace(/^(\d{6})(\d{7}).*$/, '$1-$2') // 970422-2345678
}

export const toPhone = (phone) => {
  const d = onlyDigits(phone)
  // 010-xxxx-xxxx 기본
  if (d.startsWith('02')) {
    return d.replace(/^(\d{2})(\d{3,4})(\d{4}).*$/, '$1-$2-$3')
  }
  return d.replace(/^(\d{3})(\d{3,4})(\d{4}).*$/, '$1-$2-$3')
}

export async function signup({ name, rrn, phone, password }) {
  const payload = {
    name: String(name || '').trim(),
    residentNum: toResidentNum(rrn),
    phone: toPhone(phone),
    password: String(password || ''),
  }
  const { data } = await axios.post('/api/auth/signup', payload, {
    headers: { 'Content-Type': 'application/json' },
  })
  return data
}
