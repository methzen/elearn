export type basic ={
    name: string | null,
    created?: Date | null,
    description: string | null,   
}

export interface Chapter extends basic {
    videoUrl: string | null,
    contentText: string | null,
}

export interface Module extends basic {
    chaperList: Chapter[] | null,
}

export interface Course extends basic {
    avatar?: string,
    creatorId?: string,
    groupId?: string,
    content: Module[] | Chapter[] | null,
    contentStructure : "STRUCTURED" | "UNSTRUCTURED" | null
    isLoading?: boolean
    error ? : string | null
}