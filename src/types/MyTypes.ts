export type UserType = {
    username: string,
    image: {
        png: string,
        webp: string
    }
}

export type CommentType = {
    id: number,
    content: string,
    createdAt: string,
    score: number,
    user: UserType,
    replies?: CommentType[]
}