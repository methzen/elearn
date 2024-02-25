export type Base = {
    id?: string ;
    name: string | null,
    createdAt?: Date | null,
    description?: string | null,
}

export interface Attachment {
    id?: string;
    title:string;
    fileUrl:string;
    type:string;
    originalName?:string;
    sectionId?:string;
    chapter: string;
}

export interface Videodata {
    name?: string;
    url?: string;
    type?: string;
    format?: string;
    bytes?: number;
    asset_id?: string;
    thumbnail_url?: string;
    secure_url?: string;
    path?: string;
    original_filename?: string;
    public_id: string;
}

export interface Video {
    data: Videodata;
    type: string;
    sectionId?: string;
    chapterId?:string
}
export interface Chapter extends Base {
    video: Video | null;
    content: string | null;
    attachments: Attachment[];
    section?: string
    isSelected?: boolean
}

export interface Section extends Base {
    chapters: Chapter[];
    isValidated?: boolean;
    course?: string;
}

type ownershipLevel = "admin" | "member" | "moderator"

export enum CourseOwnerShip {
    admin = "admin",
    member = "member",
    moderator = "moderator"
}

export interface Course extends Base {
    creatorId?: string;
    groupId?: string;
    sections: Section[];
    isSaved: boolean | undefined;
    viewCurrentChapter: {sectionId: string, chapterId: string}
}

export interface Plan{
    price: number,
    interval: "month" |"year"|"onetime"| undefined,
    group: string
}
export interface Circle extends Base {
    imageUrl: string;
    by?: string;
    isPaying: boolean | undefined;
    category: string;
    plans: Plan[]
}

