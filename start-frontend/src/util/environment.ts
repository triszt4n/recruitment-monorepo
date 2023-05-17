const fetchEnvVar = (key: string, alternativeValue?: string) => {
  const value = process.env[key] || alternativeValue
  if (!value) throw new Error(`Environment variable ${key} not defined!`)
  return value
}

export const environment = {
  urls: [{ name: 'Felvételi adminisztrációs oldal', url: fetchEnvVar('REACT_APP_URL_TO_CANDIDATE_FRONTEND') }]
}
