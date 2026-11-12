import { createClient } from 'next-sanity';
import type { ProjectModel } from 'models/project';

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

// Only the fields the listing renders (no `images` array, no asset blobs).
const PROJECTS_BY_CATEGORY_QUERY = `*[_type == "projects" && project_category == $category] | order(orderRank){
  project_title,
  client_or_type,
  project_year,
  description,
  "project_slug": project_slug.current,
  "cover_image": cover_image.asset->{
    url,
    "lqip": metadata.lqip
  }
}`;

export function getProjectsByCategory(category: 'personal' | 'commissioned'): Promise<ProjectModel[]> {
    return client.fetch<ProjectModel[]>(PROJECTS_BY_CATEGORY_QUERY, { category });
}
