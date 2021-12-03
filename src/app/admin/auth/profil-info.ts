export class ProfilInfo {
  id: number;
  name: string;
  username: string;
  newUsername: string;
  email: string;
  password: string;
  newPassword: string;
  photo: string;
}

export class UpdateProfilInfo {
  id: number;
  oldUsername: string;
  name: string;
  username: string;
  email: string;
  mobile: string;

}

export class UpdateUsernameInfo {
  username: string;
  newUsername: string;
}

export class UpdateUsernameUser {
  id: string;
  newUsername: string;
}

export class UpdatePasswordInfo {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export class UpdatePasswordUser {
  id: string;
  oldPassword: string;
  newPassword: string;
}


