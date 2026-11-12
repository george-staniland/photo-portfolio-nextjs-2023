export interface ProjectModel {
    description: string;
    project_title: string;
    client_or_type: string;
    project_year: number;
    project_slug: string;
    cover_image?: {
        url: string;
        lqip?: string;
    } | null;
}
