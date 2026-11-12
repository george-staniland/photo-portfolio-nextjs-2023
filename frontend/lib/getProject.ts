import { createClient } from 'next-sanity';
import type { ProjectData } from 'models/models';

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

const PROJECT_QUERY = `*[_type == "projects" && project_slug.current == $slug][0]{
  project_title,
  images[]{
    "url": asset->url,
    "lqip": asset->metadata.lqip,
    "width": asset->metadata.dimensions.width,
    "height": asset->metadata.dimensions.height
  }
}`;

/** Fetches only what the project pages render (no full asset/metadata blobs). Slug is a GROQ param, not interpolated. */
export function getProject(slug: string): Promise<ProjectData | null> {
    return client.fetch<ProjectData | null>(PROJECT_QUERY, { slug });
}
