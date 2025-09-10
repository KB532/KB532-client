// src/api/codef.js
import axios from 'axios'

/** 등록: POST /api/codef?userId=1  (body: { accountList: [...] }) */
export async function registerConnectedId({
  organization, id, password,
  userId = 1,
  countryCode = 'KR', businessType = 'BK', clientType = 'P', loginType = '1',
}) {
  if (!organization) throw new Error('organization(기관 코드)이 없습니다.')
  if (!id) throw new Error('은행 ID가 없습니다.')
  if (!password) throw new Error('은행 비밀번호가 없습니다.')

  const params = { userId }
  const payload = {
    accountList: [{ countryCode, businessType, organization, clientType, loginType, id, password }],
  }

  const { data } = await axios.post('/api/codef', payload, {
    params,
    headers: { 'Content-Type': 'application/json' },
  })

  // 서버 응답 형태에 따라 유연 추출
  const connectedId =
    data?.data?.connectedId ??
    data?.connectedId ??
    (typeof data?.data === 'string' ? data.data : null) ?? null

  return { data, connectedId }
}

/** 동기화: POST /api/codef/accounts?userId=1&provider=CODEF&organization=0020[&connectedId=...] */
export async function syncCodefAccounts({
  userId = 1, provider = 'CODEF', organization, connectedId,
}) {
  if (!organization) throw new Error('organization(기관 코드)이 없습니다.')
  const params = { userId, provider, organization, ...(connectedId ? { connectedId } : {}) }
  const { data } = await axios.post('/api/codef/accounts', null, { params })
  return data
}
