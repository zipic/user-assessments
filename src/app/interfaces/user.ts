export interface User {
  name: string,
  lastName: string,
  dateOfBirth: string,
  education: string,
  role: string,
  position: string
}

export interface Users {
  users: User[]
}
