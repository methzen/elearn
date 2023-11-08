export type Base = {
    id?: string | number;
    name: string | null,
    created?: Date | null,
    description?: string | null,
}

export interface Attachment {
    name: string;
    url: string;
    type: string;
}

export interface Video {
    name: string;
    url: string;
    type: string;
}
export interface Chapter extends Base {
    videoContent: Video | null;
    textContent: string | null;
    attachments: Attachment[];
}

export interface Section extends Base {
    chapters: Chapter[];
    isValidated?: boolean;
}

export interface Course extends Base {
    authorId?: string;
    groupId?: string;
    sections: Section[];
}

