export type MoviesSearchParams = {
  page?: string;
  bible?: string;
};

export type MoviesPageProps = {
  searchParams: Promise<MoviesSearchParams>;
};
