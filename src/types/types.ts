export type PostType = {
    id:number,
    name:string,
    likes:number
}
  
export type ContactsType={
    github: string|null
    vk: string|null
    facebook: string|null
    instagram: string|null
    twitter: string|null
    website: string|null
    youtube: string|null
    mainLink: string|null
  }
export type PhotosType = {
    small:string|null
    large:string|null
  }
export type ProfileType={
    userId:number | null,
    lookingForAJob:boolean | null,
    lookingForAJobDescription:string | null,
    fullName:string | null,
    contacts: ContactsType | null
    photos:PhotosType | null
}

export type UserType={
    id:number,
    name:string,
    status:string,
    photos:PhotosType
}
